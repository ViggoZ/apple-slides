// app/components/Filter.tsx
"use client";

import React from 'react';

interface FilterProps {
  times: string[];
  selectedTime: string;
  onTimeChange: (time: string) => void;
  getTimeIcon: (time: string) => string; // 获取时间图标的函数
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
        <div className="flex flex-1 flex-col gap-y-7 px-4 pb-4 bg-neutral-900">
          {/* <h2 className="text-lg font-semibold mb-4">Filter by Time</h2> */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => onTimeChange('All')}
              className={`flex flex-col items-center justify-center py-4 px-4 rounded-2xl ${
                selectedTime === 'All' ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white'
              }`}
            >
              <img
                src={getTimeIcon('All')}
                alt="All"
                className="w-[224px] h-[114px] object-cover mb-4 rounded-xl" // 设置图片宽高
              />
              <span>All</span>
            </button>
            {times.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time)}
                className={`flex flex-col items-center justify-center py-4 px-4 rounded-2xl ${
                  selectedTime === time ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white/50'
                }`}
              >
                <img
                  src={getTimeIcon(time)}
                  alt={time}
                  className="w-[224px] h-[114px] object-cover mb-4 rounded-xl" // 设置图片宽高
                />
                <span className="text-center">{time}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;