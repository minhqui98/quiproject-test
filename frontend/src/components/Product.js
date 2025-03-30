import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        <Card.Text style={{ color: '#dd2f2c', fontWeight: 'bold' }}>Liên hệ sđt/zalo: 0963102599</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Link to={`/product/${product.slug}`}>
            {/* <Card.Title>{product.name}</Card.Title> */}
            <Button style={{ color: '#2a83e9', backgroundColor: 'rgba(241, 248, 254, 1)', fontWeight: 'bold' }}>
              Xem chi tiết
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
