import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      className="rounded-lg overflow-hidden shadow-2xl"
    >
      {products.map((product) => (
        <div key={product._id} className="relative">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="h-[32rem] object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold p-4 bg-coffee-brown bg-opacity-70 rounded">
                {product.name} ({product.price} ETB)
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;

