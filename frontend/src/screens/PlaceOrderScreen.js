import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="space-y-2">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1/6">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      </div>
                      <div className="w-3/6">
                        <Link to={`/product/${item.product}`} className="hover:underline">{item.name}</Link>
                      </div>
                      <div className="w-2/6 text-right">
                        {item.qty} x {item.price} ETB = {item.qty * item.price} ETB
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="border rounded-lg p-4 shadow">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b">Order Summary</h2>
            <div className="flex justify-between py-2">
              <span>Items</span>
              <span>{cart.itemsPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping</span>
              <span>{cart.shippingPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span>{cart.taxPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>{cart.totalPrice} ETB</span>
            </div>
            {error && <Message variant="danger">{error}</Message>}
            <button
              type="button"
              className="w-full mt-4 py-3 bg-coffee-brown text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
