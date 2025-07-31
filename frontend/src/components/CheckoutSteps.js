import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center items-center space-x-4 my-6">
      <div>
        {step1 ? (
          <Link to='/login' className="text-gold-accent font-semibold">Sign In</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Sign In</span>
        )}
      </div>
      <div className="text-gray-300">&gt;</div>
      <div>
        {step2 ? (
          <Link to='/shipping' className="text-gold-accent font-semibold">Shipping</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>
      <div className="text-gray-300">&gt;</div>
      <div>
        {step3 ? (
          <Link to='/payment' className="text-gold-accent font-semibold">Payment</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>
      <div className="text-gray-300">&gt;</div>
      <div>
        {step4 ? (
          <Link to='/placeorder' className="text-gold-accent font-semibold">Place Order</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
