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