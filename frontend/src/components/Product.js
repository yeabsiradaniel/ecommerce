import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating';

const Product = ({ product }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
      variants={cardVariants}
    >
      <Link to={`/product/${product._id}`}>
        <img className="w-full h-56 object-cover" src={product.image} alt={product.name} />
      </Link>
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-xl font-semibold text-coffee-brown hover:text-gold-accent transition duration-300 truncate">{product.name}</h2>
        </Link>
        <div className="my-3">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <h3 className="text-2xl font-bold text-coffee-brown">{product.price} ETB</h3>
      </div>
    </motion.div>
  );
};

export default Product;

