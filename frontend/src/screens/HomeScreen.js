import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      {!keyword && (
        <div className="mb-12">
            <div className="text-center py-16 bg-white rounded-lg shadow-xl mb-12 bg-tilf-pattern bg-repeat bg-opacity-5">
                <h1 className="text-5xl font-extrabold text-coffee-brown mb-4 font-serif">A Journey in Every Cup</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience the authentic, rich heritage of Ethiopian coffee, from our home to yours.</p>
            </div>
            <ProductCarousel />
        </div>
      )}
      <div className="section-divider"></div>
      <h1 className="text-3xl font-bold text-coffee-brown mb-8 border-b-4 border-gold-accent pb-2 font-serif">
        {keyword ? 'Search Results' : 'Latest Products'}
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default HomeScreen;

