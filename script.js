document.addEventListener("DOMContentLoaded", function () {
    const imageGallery = document.getElementById("imageGallery");
    const timeFilterContainer = document.getElementById("timeFilter");
    const categoryFilterContainer = document.getElementById("categoryFilter");

    let selectedTime = 'All'; 
    let selectedCategory = 'All'; 
    let allCategories;
    let timeCategoryMap;

    const categoryIcons = {
        'Mac': 'mac.svg',
        'iPhone': 'iPhone.svg',
        'iPad': 'iPad.svg',
        'Apple Watch': 'Apple Watch.svg',
        'TV & Home': 'TV & Home.svg',
        'AirPods': 'AirPods.svg',
        'Vision': 'Vision.svg',
        'AI': 'AI.svg',
        'Apple Store': 'Apple Store.svg'
    };

    // Define the desired order for time filters
    const timeOrder = [
        "WWDC June 2024",
        "Apple Event September 2023",
        "WWDC June 2023",
        "Apple Event May 2024",
        "Apple Event October 2023",
        "Apple Event September 2022",
        "WWDC June 2022",
        "Apple Event March 2022",
        "Apple Event October 2021",
        "Apple Event September 2021",
        "WWDC June 2021",
        "Apple Event April 2021",
        "Apple Event October 2020",
        "Apple Event November 2020",
        "Apple Event September 2020",
        "WWDC June 2020",
        "Apple Event September 2019"
    ];

    fetch('./assets/slides/')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const images = Array.from(doc.querySelectorAll('a'))
                .map(link => decodeURIComponent(link.getAttribute('href')))
                .filter(href => href.endsWith('.webp'));

            const times = new Set();
            allCategories = new Set();
            timeCategoryMap = {};

            images.forEach(image => {
                const fileName = image.split('/').pop(); 
                const [eventTime, category] = fileName.split('-').map(part => part.trim().replace('[', '').replace(']', ''));

                times.add(eventTime);
                allCategories.add(category);

                if (!timeCategoryMap[eventTime]) {
                    timeCategoryMap[eventTime] = new Set();
                }
                timeCategoryMap[eventTime].add(category);
            });

            // Insert "All" filter button
            timeFilterContainer.innerHTML = `
                <div class="time-filter-button w-full mb-2" data-value="All">
                    <div class="relative w-full overflow-hidden bg-gray-200 rounded-t filter-image">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span>All Image Here</span>
                        </div>
                    </div>
                    <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded-b w-full">All</button>
                </div>
            `;

            // Sort times based on the predefined order and select the first available time as default
            let firstTimeSet = false;
            timeOrder.forEach(time => {
                if (times.has(time)) {
                    const button = document.createElement('div');
                    button.className = 'time-filter-button w-full mb-2';
                    button.dataset.value = time;
                    button.innerHTML = `
                        <div class="relative w-full overflow-hidden bg-cover bg-center rounded-t filter-image">
                            <img src="/assets/${time}.webp" alt="${time}" class="absolute inset-0 w-full h-full object-contain bg-gray-300 py-4">
                        </div>
                        <button class="py-2 px-4 rounded-b w-full ${!firstTimeSet ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}">${time}</button>
                    `;
                    if (!firstTimeSet) {
                        selectedTime = time; // 默认选择第一个实际的时间
                        firstTimeSet = true;
                    }
                    timeFilterContainer.appendChild(button);
                }
            });

            updateCategoryFilter(allCategories);
            addEventListeners(images);

            filterImages(images); // 根据初始选择的时间和类别过滤图像
        })
        .catch(error => console.error('Error loading images:', error));

    function addEventListeners(images) {
        timeFilterContainer.addEventListener("click", function(e) {
            const button = e.target.closest('.time-filter-button');
            if (button) {
                const timeValue = button.dataset.value;
                selectedTime = timeValue;

                timeFilterContainer.querySelectorAll(".time-filter-button button").forEach(btn => {
                    btn.classList.remove("bg-blue-500", "text-white");
                    btn.classList.add("bg-gray-300", "text-gray-700");
                });
                button.querySelector('button').classList.remove("bg-gray-300", "text-gray-700");
                button.querySelector('button').classList.add("bg-blue-500", "text-white");

                const availableCategories = selectedTime === 'All' ? allCategories : new Set(timeCategoryMap[selectedTime]);
                
                if (!availableCategories.has(selectedCategory)) {
                    selectedCategory = 'All';
                }

                updateCategoryFilter(availableCategories);
                filterImages(images);
            }
        });

        categoryFilterContainer.addEventListener("click", function(e) {
            const button = e.target.closest('.category-filter-button');
            if (button) {
                selectedCategory = button.dataset.value;
                updateCategoryFilter(selectedTime === 'All' ? allCategories : new Set(timeCategoryMap[selectedTime]));
                filterImages(images);
            }
        });
    }

    function updateCategoryFilter(categories) {
        categoryFilterContainer.innerHTML = `
            <button class="category-filter-button py-2 px-4 rounded flex items-center ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}" data-value="All">
                <span class="mr-2">All</span>
            </button>
        `;

        Array.from(categories).forEach(category => {
            const button = document.createElement('button');
            button.className = `category-filter-button py-2 px-4 rounded flex items-center ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`;
            button.dataset.value = category;
            button.innerHTML = `
                <img src="/assets/${categoryIcons[category] || 'default.svg'}" alt="${category}" class="w-6 h-6 mr-2">
                <span>${category}</span>
            `;
            categoryFilterContainer.appendChild(button);
        });
    }

    function loadImages(imageList) {
        imageGallery.innerHTML = "";
        imageList.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = `./assets/slides/${image.split('/').pop()}`;
            imgElement.alt = image;
            imgElement.className = "w-full h-auto rounded shadow";
            imageGallery.appendChild(imgElement);
        });
    }

    function filterImages(images) {
        const filteredImages = images.filter(image => {
            const fileName = image.split('/').pop(); 
            const [eventTime, category] = fileName.split('-').map(part => part.trim().replace('[', '').replace(']', ''));

            const matchesTime = (selectedTime === 'All' || eventTime === selectedTime);
            const matchesCategory = (selectedCategory === 'All' || category.includes(selectedCategory));

            return matchesTime && matchesCategory;
        });

        loadImages(filteredImages);
    }
});