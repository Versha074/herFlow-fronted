import React from 'react';
const ProgressItem = ({ title, progress, description }) => (
    <div className="bg-pink-50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-pink-600 font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-pink-500 rounded-full h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

export default ProgressItem;
  