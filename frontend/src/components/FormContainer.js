import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
