import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/" className="underline">Go Back</Link>
          </Message>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center p-4 bg-white rounded-lg shadow">
                <div className="w-1/5">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                </div>
                <div className="w-2/5">
                  <Link to={`/product/${item.product}`} className="hover:underline">{item.name}</Link>
                </div>
                <div className="w-1/5">{item.price} ETB</div>
                <div className="w-1/5">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                    className="p-2 rounded border"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/5 text-right">
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="md:col-span-1">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <p className="text-xl font-bold mb-4">
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)} ETB
          </p>
          <button
            type="button"
            className="w-full py-3 bg-coffee-brown text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
