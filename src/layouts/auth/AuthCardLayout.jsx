import React from "react";

const AuthCardLayout = ({ title, description, children }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
      {title && (
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          {title}
        </h1>
      )}
      {description && (
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default AuthCardLayout;
