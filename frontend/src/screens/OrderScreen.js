import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading && order) {
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }


  useEffect(() => {
    if (!order || order._id !== orderId) {
        dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="text-3xl font-bold">Order {order._id}</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
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
              <span>{order.itemsPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping</span>
              <span>{order.shippingPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span>{order.taxPrice} ETB</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>{order.totalPrice} ETB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
