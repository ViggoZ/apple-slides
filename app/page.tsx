// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import ImageGallery from './components/ImageGallery';

export default function Home() {
  const [times, setTimes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [images, setImages] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [timeCategoryMap, setTimeCategoryMap] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    // 定义预设时间顺序
    const timeOrder = [
      "WWDC June 2024",
      "Apple Event May 2024",
      "Apple Event October 2023",
      "Apple Event September 2023",
      "WWDC June 2023",
      "Apple Event September 2022",
      "WWDC June 2022",
      "Apple Event March 2022",
      "Apple Event October 2021",
      "Apple Event September 2021",
      "WWDC June 2021",
      "Apple Event April 2021",
      "Apple Event November 2020",
      "Apple Event October 2020",
      "Apple Event September 2020",
      "WWDC June 2020",
      "Apple Event September 2019"
    ];

    // 设置时间和类别的初始状态
    setTimes(timeOrder);

    setCategories([
      "Mac",
      "iPhone",
      "iPad",
      "Apple Watch",
      "TV & Home",
      "AirPods",
      "Vision",
      "AI",
      "Apple Store"
    ]);

    // 使用 API 路由获取图像列表
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-images');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const imageSet = new Set<string>();
        const tempTimeCategoryMap: Record<string, Set<string>> = {};

        data.forEach((image: string) => {
          const fileName = image.split('/').pop();
          if (!fileName) return;

          const [eventTime, category] = fileName.split('-').map(part => part.trim().replace('[', '').replace(']', ''));
          imageSet.add(image);

          if (!tempTimeCategoryMap[eventTime]) {
            tempTimeCategoryMap[eventTime] = new Set();
          }
          tempTimeCategoryMap[eventTime].add(category);
        });

        setImages(Array.from(imageSet));
        setTimeCategoryMap(tempTimeCategoryMap);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // 每次选择时间改变时，更新可用的类别选项
    if (selectedTime === 'All') {
      setFilteredCategories(categories);
    } else {
      const availableCategories = Array.from(timeCategoryMap[selectedTime] || []);
      setFilteredCategories(availableCategories);
      
      // 如果当前选中的类别在新的类别列表中不存在，则重置为 'All'
      if (!availableCategories.includes(selectedCategory)) {
        setSelectedCategory('All');
      }
    }
  }, [selectedTime, timeCategoryMap]);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredImages = images.filter(image => {
    const fileName = image.split('/').pop(); 
    const [eventTime, category] = fileName?.split('-').map(part => part.trim().replace('[', '').replace(']', '')) || [];

    const matchesTime = selectedTime === 'All' || eventTime === selectedTime;
    const matchesCategory = selectedCategory === 'All' || category.includes(selectedCategory);

    return matchesTime && matchesCategory;
  });

  // 动态生成时间过滤器的预览图标路径
  const getTimeIcon = (time: string) => {
    const fileName = time.replace(/\s+/g, ' ') + '.webp';
    return `/assets/${fileName}`;
  };

  // 动态生成类别过滤器的图标路径
  const getCategoryIcon = (category: string) => {
    const fileName = category.replace(/\s+/g, ' ').toLowerCase() + '.svg';
    return `/assets/${fileName}`;
  };

  return (
    <div className="flex">
      {/* 左侧过滤栏 */}
      <aside className="w-64 h-screen p-4 bg-white shadow-md fixed top-0 left-0 overflow-y-auto">
        <div className="text-center mb-6">
          <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto" />
          <h1 className="text-2xl font-bold">Apple Bento Slides</h1>
        </div>
        <Filter
          times={times}
          categories={filteredCategories}
          selectedTime={selectedTime}
          selectedCategory={selectedCategory}
          onTimeChange={handleTimeChange}
          onCategoryChange={handleCategoryChange}
          getTimeIcon={getTimeIcon} // 传递获取时间图标的函数
          getCategoryIcon={getCategoryIcon} // 传递获取类别图标的函数
        />
      </aside>

      {/* 主内容区域 */}
      <main className="flex-1 ml-64 p-6">
        {/* 右侧顶部类别过滤器 */}
        <div className="sticky top-0 z-10 bg-white p-4 shadow mb-4">
          <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`py-2 px-4 rounded ${
                selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              <img src={getCategoryIcon('All')} alt="All" className="w-6 h-6 inline mr-2" />
              All
            </button>
            {filteredCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`py-2 px-4 rounded ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                <img src={getCategoryIcon(category)} alt={category} className="w-6 h-6 inline mr-2" />
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* 图片展示区 */}
        <ImageGallery images={filteredImages} />
      </main>
    </div>
  );
}