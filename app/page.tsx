// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ImageGallery from "./components/ImageGallery";
import { TimeCategory } from "@/types";

// 将 timeOrder 移到 useEffect 外部，使其在函数作用域内可访问
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
  "Apple Event September 2019",
];

export default function Home() {
  const [times, setTimes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("WWDC June 2024");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [images, setImages] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [timeCategoryMap, setTimeCategoryMap] = useState<
    Record<string, Set<string>>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  // 添加一个新的状态来控制过滤栏的显示和隐藏
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 默认关闭过滤栏

  // 切换过滤栏显示状态的函数
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // 关闭过滤栏的函数
  const closeFilter = () => setIsFilterOpen(false);

  // 添加一个新的状态来控制遮罩的显示和隐藏
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) closeAboutModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setIsOverlayVisible(isFilterOpen);
  }, [isFilterOpen]);

  useEffect(() => {
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
      "Apple Store",
    ]);

    // 使用 API 路由获取图像列表
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/get-images");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const imageSet = new Set<string>();
        const tempTimeCategoryMap: Record<string, Set<string>> = {};

        data.forEach((image: string) => {
          const fileName = image.split("/").pop();
          if (!fileName) return;

          const [eventTime, category] = fileName
            .split("-")
            .map((part) => part.trim().replace("[", "").replace("]", ""));
          imageSet.add(image);

          if (!tempTimeCategoryMap[eventTime]) {
            tempTimeCategoryMap[eventTime] = new Set();
          }
          tempTimeCategoryMap[eventTime].add(category);
        });

        setImages(Array.from(imageSet));
        setTimeCategoryMap(tempTimeCategoryMap);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // 每次选择时间改变时，更新可用的类别选项
    if (selectedTime === "All") {
      setFilteredCategories(categories);
    } else {
      const availableCategories = Array.from(
        timeCategoryMap[selectedTime] || [],
      );
      setFilteredCategories(availableCategories);

      // 如果当前选中的类别在新的类别列表不存在，则重置为 'All'
      if (!availableCategories.includes(selectedCategory)) {
        setSelectedCategory("All");
      }
    }
  }, [selectedTime, timeCategoryMap]);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredImages = images.filter((image) => {
    const fileName = image.split("/").pop();
    const [eventTime, category] =
      fileName
        ?.split("-")
        .map((part) => part.trim().replace("[", "").replace("]", "")) || [];

    const matchesTime = selectedTime === "All" || eventTime === selectedTime;
    const matchesCategory =
      selectedCategory === "All" || category.includes(selectedCategory);

    return matchesTime && matchesCategory;
  }).sort((a, b) => {
    if (selectedTime === "All") {
      const timeA = a.split("/").pop()?.split("-")[0].trim().replace("[", "").replace("]", "") || "";
      const timeB = b.split("/").pop()?.split("-")[0].trim().replace("[", "").replace("]", "") || "";
      return timeOrder.indexOf(timeA) - timeOrder.indexOf(timeB);
    }
    return 0;
  });

  // 动态生成时间过滤器的预图标路径
  const getTimeIcon = (time: string) => {
    const fileName = time.replace(/\s+/g, " ") + ".webp";
    return `/assets/${fileName}`;
  };

  // 动态生成类别过滤器的图标路径
  const getCategoryIcon = (category: string) => {
    const fileName = category.replace(/\s+/g, " ").toLowerCase() + ".svg";
    return `/assets/${fileName}`;
  };

  return (
    <div className="flex bg-neutral-950 min-h-screen">
      {/* 移动端顶部导航栏 */}
      <header className="lg:hidden fixed top-0 w-full bg-neutral-900 z-50 flex items-center justify-between px-4 py-4">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <h1 className="font-semibold text-lg text-white">Apple Slides</h1>
        <button onClick={toggleFilter} className="text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </header>

      {/* 移动端左侧过滤栏 */}
      <aside className={`sm:m-6 lg:hidden fixed top-16 bottom-0 z-40 overflow-y-auto transition-transform duration-500 hide-scrollbar ${isFilterOpen ? 'translate-x-0' : 'translate-x-n110'}`}>
        <Filter
          times={times}
          categories={filteredCategories}
          selectedTime={selectedTime}
          selectedCategory={selectedCategory}
          onTimeChange={(time) => { handleTimeChange(time); closeFilter(); }}
          onCategoryChange={(category) => { handleCategoryChange(category); closeFilter(); }}
          getTimeIcon={getTimeIcon}
          getCategoryIcon={getCategoryIcon}
        />
      </aside>

      {/* 遮罩层 */}
      {isOverlayVisible && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black opacity-90 transition-opacity duration-500"
          onClick={closeFilter}
        />
      )}

      {/* 大屏幕左侧过滤栏 */}
      <aside className="hidden lg:block rounded-2xl m-3 sm:m-6 fixed top-0 bottom-0 left-0 w-64 z-40 overflow-y-auto bg-neutral-900 hide-scrollbar">
        <div className="flex top-0 sticky shrink-0 items-center shadow-sm p-4 justify-center  bg-neutral-900 gap-x-4">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <h1 className="font-semibold text-lg text-white">Apple Slides</h1>
        </div>
        <Filter
          times={times}
          categories={filteredCategories}
          selectedTime={selectedTime}
          selectedCategory={selectedCategory}
          onTimeChange={handleTimeChange}
          onCategoryChange={handleCategoryChange}
          getTimeIcon={getTimeIcon}
          getCategoryIcon={getCategoryIcon}
        />
      </aside>

      {/* 主内容区域 */}
      <main className="flex-1 lg:pl-72 w-full pt-16 lg:pt-0 px-0">
        <h1 className="sr-only">Apple Bento Slides - Explore Apple Event Keynote</h1>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-neutral-800 p-6 rounded-3xl flex flex-col items-center justify-center w-48 h-48">
              <svg className="animate-pulse h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"/>
              </svg>
              <span className="text-white/80 text-md ">Loading Slides...</span>
            </div>
          </div>
        ) : (
          <>
            {/* 右侧顶部类别过滤器 */}
            <div className="sticky top-16 sm:top-0 w-full px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4 z-10 before:content bg-gradient-to-b from-neutral-950 to-neutral-950/0 before:absolute before:inset-0 before:bg-black before:bg-opacity-60 before:blur before:-z-10">
              <div className="relative w-full rounded-2xl min-h-[100px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-950/0"></div>
                <div className="absolute inset-0 bg-black bg-opacity-60 blur"></div>
                <div className="relative w-full h-full rounded-2xl flex items-center ring-1 ring-white/15 p-2 sm:p-4 shadow-sm bg-neutral-900">
                  <div className="w-full flex gap-3 overflow-x-auto hide-scrollbar">
                    <button
                      onClick={() => handleCategoryChange("All")}
                      className={`text-sm sm:text-md flex flex-col items-center py-2 px-4 rounded-2xl whitespace-nowrap min-w-[90px] ${
                        selectedCategory === "All"
                          ? "bg-neutral-800 text-white"
                          : "text-white"
                      } hover:bg-neutral-700 transition-colors duration-300`}
                    >
                      <img
                        src={getCategoryIcon("All")}
                        alt="All"
                        className="w-12 h-12 inline"
                      />
                      All
                    </button>
                    {filteredCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`text-sm sm:text-md flex flex-col items-center py-2 px-4 rounded-2xl whitespace-nowrap min-w-[90px] ${
                          selectedCategory === category
                            ? "bg-neutral-800 text-white"
                            : "text-white/50"
                        } hover:bg-neutral-700 transition-colors duration-300`}
                      >
                        <img
                          src={getCategoryIcon(category)}
                          alt={category}
                          className="w-12 h-12 inline"
                        />
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 图片展示区 */}
            <ImageGallery images={filteredImages} />
          </>
        )}
        {/* 固定悬浮的圆形背景的图标About和Twiter */}
        <div className="fixed bottom-4 right-4 flex-col space-y-4 flex">
          <a href="https://buymeacoffee.com/viggoz" target="_blank" className="relative rounded-full bg-neutral-800 p-3 hover:bg-neutral-700 transition-colors duration-300 group">
            <img src="/assets/coffee.svg" alt="Buy Me a Coffee" className="h-6 w-6" />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-neutral-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Buy Me a Coffee</span>
          </a>
          <a href="https://x.com/decohack" target="_blank" className="relative rounded-full bg-neutral-800 p-3 hover:bg-neutral-700 transition-colors duration-300 group">
            <img src="/assets/twitter.svg" alt="Twitter" className="h-6 w-6" />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-neutral-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">@viggo</span>
          </a>
          <a href="#" onClick={openAboutModal} className="relative rounded-full bg-neutral-800 p-3 hover:bg-neutral-700 transition-colors duration-300 group">
            <img src="/assets/about.svg" alt="About" className="h-6 w-6" />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-neutral-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">About</span>
          </a>
        </div>
      </main>

      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300" onClick={closeAboutModal} style={{ opacity: isAboutModalOpen ? 1 : 0 }}>
          <div className="bg-neutral-800 p-12 rounded-3xl shadow-lg w-11/12 max-w-xl transform transition-transform duration-300 scale-95 opacity-0 translate-y-4" style={{ opacity: isAboutModalOpen ? 1 : 0, transform: isAboutModalOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(16px)' }} onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-white">About This Project</h2>
            <p className="mb-4 font-light text-white/50 leading-relaxed">
              This project is a curated collection of Apple's most iconic slides, showcasing the evolution of their products and designs through the years. It's a tribute to the innovation and elegance that Apple has brought to the tech industry.
            </p>
            <p className="mb-4 text-white/50 leading-relaxed">
              Created by <a href="https://buymeacoffee.com/viggoz" target="_blank" className="text-orange-500">Viggo</a>, inspired by the need to preserve and appreciate the visual history of Apple's presentations. Special thanks to the open-source community for the inspiration from projects like <a href="https://github.com/rickyzhangca/apple-summary-slides" className="text-orange-500">apple-summary-slides</a>.
            </p>
            <div className="flex justify-between items-center mt-6">
              <a href="https://buymeacoffee.com/viggoz" target="_blank" className="flex items-center space-x-2 text-orange-500">
                <img src="/assets/coffee.svg" alt="Buy Me a Coffee" className="h-6 w-6" />
                <span>Buy Me a Coffee</span>
              </a>
              <a href="https://x.com/decohack" target="_blank" className="flex items-center space-x-2 text-orange-500">
                <img src="/assets/twitter.svg" alt="Twitter" className="h-6 w-6" />
                <span>@viggo</span>
              </a>
            </div>
          </div>
          <button onClick={closeAboutModal} className="absolute bottom-4 right-4 rounded-full bg-neutral-800 p-3 hover:bg-neutral-700 transition-colors duration-300">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
