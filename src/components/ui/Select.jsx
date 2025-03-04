import React from "react";

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};