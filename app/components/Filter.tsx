// app/components/Filter.tsx
"use client";

import React from 'react';

interface FilterProps {
  times: string[];
  categories: string[];
  selectedTime: string;
  selectedCategory: string;
  onTimeChange: (time: string) => void;
  onCategoryChange: (category: string) => void;
  getTimeIcon: (time: string) => string; // 新增获取时间图标的函数
  getCategoryIcon: (category: string) => string; // 新增获取类别图标的函数
}

const Filter: React.FC<FilterProps> = ({
  times,
  selectedTime,
  onTimeChange,
  getTimeIcon,
}) => {
  return (
    <div>
      {/* 时间过滤器 */}
      {times.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Filter by Time</h2>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onTimeChange('All')}
              className={`flex items-center py-2 px-4 rounded ${
                selectedTime === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              <img src={getTimeIcon('All')} alt="All" className="w-6 h-6 mr-2" />
              All
            </button>
            {times.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time)}
                className={`flex items-center py-2 px-4 rounded ${
                  selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                <img src={getTimeIcon(time)} alt={time} className="w-6 h-6 mr-2" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;