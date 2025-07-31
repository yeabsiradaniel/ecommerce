import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-coffee-brown shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <h1 className="text-2xl font-bold text-cream tracking-wider">
              Fanuel of Coffee
            </h1>
          </Link>
          <div className="hidden md:block">
            <SearchBox />
          </div>
          <div className="flex items-center space-x-6 text-cream">
            <Link to="/cart" className="hover:text-gold-accent transition duration-300">
              <i className="fas fa-shopping-cart mr-1"></i> Cart
            </Link>
            {userInfo ? (
              <div className="relative group">
                <button className="hover:text-gold-accent transition duration-300">
                  <i className="fas fa-user mr-1"></i> {userInfo.name.split(' ')[0]} <i className="fas fa-caret-down"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-coffee-brown hover:bg-cream"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-coffee-brown hover:bg-cream"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-gold-accent transition duration-300">
                <i className="fas fa-user mr-1"></i> Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
                <div className="relative group">
                    <button className="hover:text-gold-accent transition duration-300">
                        <i className="fas fa-user-shield mr-1"></i> Admin <i className="fas fa-caret-down"></i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                        <Link
                            to="/admin/userlist"
                            className="block px-4 py-2 text-sm text-coffee-brown hover:bg-cream"
                        >
                            Users
                        </Link>
                        <Link
                            to="/admin/productlist"
                            className="block px-4 py-2 text-sm text-coffee-brown hover:bg-cream"
                        >
                            Products
                        </Link>
                        <Link
                            to="/admin/orderlist"
                            className="block px-4 py-2 text-sm text-coffee-brown hover:bg-cream"
                        >
                            Orders
                        </Link>
                    </div>
                </div>
            )}
          </div>
        </div>
        <div className="md:hidden pt-2 pb-4">
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
