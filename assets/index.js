//header click
const navLinks = document.querySelectorAll('header nav ul li .nav-item');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Loại bỏ màu đỏ và đặt trắng cho tất cả các mục
        navLinks.forEach(otherLink => {
            otherLink.classList.remove('text-my-red');
            otherLink.classList.add('text-white');
        });

        // Thêm màu đỏ cho mục được nhấn
        event.currentTarget.classList.add('text-my-red');
        event.currentTarget.classList.remove('text-white');
    });
});
const subNavLinks = document.querySelectorAll('#dropdownNavbar ul li a');
subNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Loại bỏ màu đỏ và đặt trắng cho tất cả các mục
        subNavLinks.forEach(otherLink => {
            otherLink.classList.remove('text-my-red');
            otherLink.classList.add('text-white');
        });

        // Thêm màu đỏ cho mục được nhấn
        event.currentTarget.classList.add('text-my-red');
        event.currentTarget.classList.remove('text-white');
    });
});
// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * (2 - t);

// The animation function, which takes an Element
const animateCountUp = el => {
  let frame = 0;
  const countTo = parseInt(el.getAttribute('data-count'), 10);
  // Reset the element to 0 for a fresh start
  el.innerHTML = '0';
  
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++;
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames);
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress);

    // If the current count has changed, update the element
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

// Run the animation on all elements with a class of ‘scope-number’
// Every time they enter the viewport
const observeAnimations = () => {
  const countupEls = document.querySelectorAll('.scope-number');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation
          animateCountUp(entry.target);
        }
      });
    },
    { threshold: 0.5 } // Adjust as needed (0.5 means 50% of the element is visible)
  );

  countupEls.forEach(el => {
    // Store the initial count value in a data attribute
    el.setAttribute('data-count', el.innerHTML);
    observer.observe(el);
  });
};

observeAnimations();


//infinite loop
const config = {
  scrollerSpeed: 3, // seconds
  scrollerTransitionSpeed: 2, // seconds, must be <= scrollerSpeed
};

function updateScrollerItemsViewable() {
  if(window.innerWidth>=1024){
    return 4
  }else if(window.innerWidth >= 768){
    return 3
  }else{
    return 2
  }
}

function initializeScroller(containerSelector, groupClass) {
  const container = document.querySelector(containerSelector);
  const articles = Array.from(container.children);

  // Clone elements to enable infinite scroll
  const scrollerItemsHTML = articles.map(article => article.outerHTML).join('');
  container.innerHTML = scrollerItemsHTML;

  // Wrap items in a specific group class to avoid conflicts
  const wrapper = document.createElement('div');
  wrapper.className = groupClass;
  wrapper.innerHTML = container.innerHTML;
  container.innerHTML = '';
  container.appendChild(wrapper);

  const scrollerGroup = container.querySelector(`.${groupClass}`);
  return { container, scrollerGroup };
}

function setupScroller(scroller, itemsViewable) {
  const { container, scrollerGroup } = scroller;

  const scrollerWidth = container.offsetWidth;
  const itemWidth = scrollerWidth / itemsViewable;
  const scrollerCount = scrollerGroup.children.length;

  Array.from(scrollerGroup.children).forEach(article => {
    article.style.width = `${itemWidth}px`;
    article.style.transition = `margin ${config.scrollerTransitionSpeed}s`;
  });
  scrollerGroup.style.width = `${scrollerCount * itemWidth}px`;

  scroller.itemWidth = itemWidth;
  scroller.leftMargin = -itemWidth;
}

function startScroller(scroller) {
  const { scrollerGroup } = scroller;

  function rotate() {
    const firstChild = scrollerGroup.firstElementChild;
    firstChild.style.marginLeft = `${scroller.leftMargin}px`;

    setTimeout(() => {
      firstChild.style.marginLeft = '0';
      scrollerGroup.appendChild(firstChild);
    }, config.scrollerTransitionSpeed * 1000);
  }

  scroller.interval = setInterval(rotate, config.scrollerSpeed * 1000);
}

function resetScroller(scroller, itemsViewable) {
  clearInterval(scroller.interval);
  setupScroller(scroller, itemsViewable);
  startScroller(scroller);
}

function initializeResponsiveScroller() {
  const itemsViewable = updateScrollerItemsViewable();

  resetScroller(scroller1, itemsViewable);
  resetScroller(scroller2, itemsViewable);
}

// Initialize scrollers with unique group classes
let scroller1 = initializeScroller('.scrollerContainer', 'scrollerGroup');
let scroller2 = initializeScroller('.scrollerContainer-02', 'scrollerGroup-02');

// On DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeResponsiveScroller();

  // Debounce resize to avoid frequent updates
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => initializeResponsiveScroller(), 200);
  });
});


//countdown
  // Set target date
  const targetDate = new Date("February 25, 2025 08:00:00").getTime();

  // Update countdown every second
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML =
        "<h2 class='text-2xl font-bold'>Sự kiện đã bắt đầu!</h2>";
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
  }, 1000);


  const scrollTopButton = document.getElementById('scrollTopButton');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollTopButton.classList.remove('hidden'); // Hiện nút khi cuộn xuống
    } else {
      scrollTopButton.classList.add('hidden'); // Ẩn nút khi ở đầu trang
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt
    });
  });

//form brochure
function handleFormBrochure() {
  const nameInput = document.getElementById("name-brochure");
  const emailInput = document.getElementById("email-brochure");
  const modal = document.getElementById("brochure-modal");
  const closeButton = modal.querySelector("[data-modal-hide]");

  // Reset trạng thái lỗi
  resetError(nameInput);
  resetError(emailInput);

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  let isValid = true;

  // Validate họ và tên
  if (!validateName(name)) {
    setError(nameInput, "Họ và tên không hợp lệ.");
    isValid = false;
  }

  // Validate email
  if (!validateEmail(email)) {
    setError(emailInput, "Email không hợp lệ.");
    isValid = false;
  }
  // Nếu tất cả đều hợp lệ, console.log thông tin
  if (isValid) {
    nameInput.value = ""
    emailInput.value = ""
    closeButton.click();
    showToast("Thông tin đăng ký thành công!", `${name} (${email})`);
  }
}

// Hàm kiểm tra họ và tên hợp lệ (ít nhất 2 từ, mỗi từ viết hoa chữ cái đầu)
function validateName(name) {
  const nameRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/;
  return nameRegex.test(name);
}

// Hàm kiểm tra email hợp lệ
function validateEmail(email) {
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  return emailRegex.test(email);
}

// Hàm thiết lập lỗi cho input
function setError(input, message) {
  input.classList.add("border-red-500");
  const errorText = document.createElement("p");
  errorText.className = "text-red-500 text-sm mt-1";
  errorText.textContent = message;
  input.parentElement.appendChild(errorText);
}

// Hàm reset lỗi cho input
function resetError(input) {
  input.classList.remove("border-red-500");
  const errorText = input.parentElement.querySelector(".text-red-500");
  if (errorText) {
    errorText.remove();
  }
}
// Hàm hiển thị thông báo thành công
function showToast(title, message) {
  const toastContainer = document.createElement("div");
  toastContainer.className = "fixed top-20  right-1 md:right-4 w-96 p-4 bg-white rounded-lg shadow-lg z-50";

  const toastContent = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-semibold text-gray-900">${title}</p>
        
      </div>
    </div>
  `;
{/* <p class="mt-1 text-sm text-gray-500">${message}</p> */}
  toastContainer.innerHTML = toastContent;
  document.body.appendChild(toastContainer);

  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    toastContainer.remove();
  }, 3000);
}
