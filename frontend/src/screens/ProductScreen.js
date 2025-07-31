import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import JebenaViewer from '../components/JebenaViewer';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  const isJebena = product && product.name && product.name.toLowerCase().includes('jebena');
  const isCoffeeBean = product && product.category && product.category.toLowerCase().includes('coffee');

  return (
    <div>
      <Link className="inline-block mb-6 px-4 py-2 bg-gray-200 text-coffee-brown rounded hover:bg-gray-300 transition" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {isJebena ? <JebenaViewer /> : <img className="w-full rounded-lg shadow-lg" src={product.image} alt={product.name} />}
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="py-2 border-y border-gray-200">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
              <p className="py-4 text-2xl font-bold">Price: ${product.price}</p>
              <p className="leading-relaxed">{product.description}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <div className="border rounded-lg p-4 shadow">
                <div className="flex justify-between py-2 border-b">
                  <span>Price:</span>
                  <strong>${product.price}</strong>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Status:</span>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                </div>
                {product.countInStock > 0 && (
                  <div className="flex justify-between py-2 border-b items-center">
                    <span>Qty:</span>
                    <select value={qty} onChange={(e) => setQty(e.target.value)} className="p-2 rounded border">
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={addToCartHandler}
                  className="w-full mt-4 py-3 bg-coffee-brown text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {isCoffeeBean && (
            <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-coffee-brown mb-4">Origin Story</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-gray-700 leading-loose">
                            This exquisite {product.name} comes from the renowned coffee-growing region of {product.name.split(' ')[0]} in Ethiopia. Nestled in the highlands, the unique climate and rich volcanic soil impart a distinctive flavor profile to the beans. Local farmers, using traditional and sustainable methods passed down through generations, carefully hand-pick each cherry at peak ripeness. This dedication to quality results in a coffee that is not just a beverage, but a true taste of Ethiopian heritage.
                        </p>
                    </div>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Ethiopia_in_Africa_%28-mini_map_-rivers%29.svg/1200px-Ethiopia_in_Africa_%28-mini_map_-rivers%29.svg.png" alt="Map of Ethiopia" className="rounded-lg shadow-md"/>
                    </div>
                </div>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <div className="space-y-4 mb-8">
              {product.reviews.map((review) => (
                <div key={review._id} className="p-4 bg-white rounded-lg shadow">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p className="text-gray-500 text-sm">{review.createdAt.substring(0, 10)}</p>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Write a Customer Review</h2>
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label htmlFor="rating" className="block mb-1">Rating</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 border rounded">
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="comment" className="block mb-1">Comment</label>
                    <textarea id="comment" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border rounded"></textarea>
                  </div>
                  <button type="submit" className="py-3 px-6 bg-coffee-brown text-white rounded hover:bg-opacity-90">
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login" className="underline">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
