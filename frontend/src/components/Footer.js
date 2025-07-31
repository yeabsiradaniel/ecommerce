import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-coffee-brown bg-tilf-pattern">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-cream opacity-75">
          <p>Copyright &copy; Fanuel of Coffee {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
