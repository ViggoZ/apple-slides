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
  getTimeIcon: (time: string) => string; // 获取时间图标的函数
  getCategoryIcon: (category: string) => string; // 获取类别图标的函数
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
        <div className="py-3 flex flex-1 flex-col gap-y-7 px-4 pb-4 bg-neutral-900 hide-scrollbar">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => onTimeChange('All')}
              className={`flex flex-col items-center justify-center py-4 px-4 rounded-2xl ${
                selectedTime === 'All' ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white'
              } hover:bg-neutral-600 transition-colors duration-300`}
            >
              <img
                src={getTimeIcon('All')}
                alt="All"
                className="w-[180px] sm:w-[224px] h-[114px] object-cover mb-4 rounded-xl" // 设置图片宽高
              />
              <span className="text-center text-sm">All</span>
            </button>
            {times.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time)}
                className={`flex flex-col items-center justify-center py-4 px-4 rounded-2xl ${
                  selectedTime === time ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white/50'
                } hover:bg-neutral-600 transition-colors duration-300`}
              >
                <img
                  src={getTimeIcon(time)}
                  alt={time}
                  className="w-[180px] sm:w-[224px] h-[114px] object-cover mb-4 rounded-xl" // 设置图片宽高
                />
                <span className="text-center text-sm">{time}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;