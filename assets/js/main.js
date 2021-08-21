window.addEventListener("load", function(e) {
    /*============FIXED HEADER==============*/

    const headerFixed = document.querySelector(".header");
    window.addEventListener("scroll", function(e) {
        if (this.scrollY >= 200) {
            headerFixed.classList.add("is-fixed");
        } else {
            headerFixed.classList.remove("is-fixed");
        }
    });

    /* =======MENU TAB==============*/
    const menuBtn = document.querySelectorAll(".btn-menu");
    const menuItem = document.querySelectorAll(".product");
    const menuLink = document.querySelectorAll(".menu-link");

    /*Show All Food*/
    [...menuItem].forEach((item) => {
        item.classList.add("active-food");
    });

    /* show active-food*/
    [...menuBtn].forEach((item) =>
        item.addEventListener("click", function(e) {
            [...menuBtn].forEach((item) => item.classList.remove("active"));
            e.target.classList.add("active");

            // lấy data food

            const tabNumber = e.currentTarget.dataset.food;
            [...menuItem].forEach((item) => {
                item.classList.remove("active-food");

                if (tabNumber === "0") {
                    item.classList.add("active-food");
                }

                if (item.getAttribute("data-food") === tabNumber) {
                    item.classList.add("active-food");
                }
            });
        })
    );

    /*====NOTI=======*/
    const randomTitle = [
            "Nguyễn Thanh Huy ",
            "Trần Ngọc Tuấn",
            "Nguyễn Thị Thu",
            "Bùi Thanh Hải",
            "Phạm Thanh Thành",
            "Lê Thanh Thành",
            "Trần Thanh Thành",
            "Phạm Anh Thành",
    ];


    function noti(title, img) {
        const templateNoti = `<div class="noti d-flex">
        <img src="https://source.unsplash.com/random" alt="" class="noti-image">
        <div class="noti-content">
            <h3 class="noti-data">${title}</h3>
            <p class="noti-desc">
                Đã mua 1 sản phẩm lorem <br> <span>vừa xong</span>
            </p>
        </div>
    </div>`;

        document.body.insertAdjacentHTML("beforeend", templateNoti);
    }

     /*===== TẠO HÀM ALERT=========*/
     function sweetAlert(title) {
        const template = `
                <div class="sweet-alert">
                    <i class="fa fa-check sweet-icon"></i>
                    <p class="sweet-text">${title}</p>
                </div>`;

        document.body.insertAdjacentHTML("beforeend", template);
    }

    let lastTitle;
    const timer = setInterval(function() {
        const itemNoti = document.querySelector(".noti");
        if (itemNoti) {
            itemNoti.parentNode.removeChild(itemNoti);
        }
        const title = randomTitle[Math.floor(Math.random() * randomTitle.length)];
        if (lastTitle !== title) {
            noti(title);
        }
        lastTitle = title;
    }, 9000);


    /*=========TOGGLE MENU=============*/
    const toggleMenu = document.querySelector(".menu-toggle");
    const headerMenu = document.querySelector(".header-container_menu");
    const itemLink = document.querySelectorAll(".item-link");

    toggleMenu.addEventListener("click", function(e) {
        headerMenu.classList.toggle("is-show");
        toggleMenu.classList.toggle("fa-bars");
        toggleMenu.classList.toggle("fa-times");
    });

    [...itemLink].forEach((item) =>
        item.addEventListener("click", function(e) {
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.toggle("fa-bars");
            toggleMenu.classList.toggle("fa-times");
        })
    );

    document.addEventListener("click", function(e) {
        if (!headerMenu.contains(e.target) && !e.target.matches(".menu-toggle")) {
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.add("fa-bars");
            toggleMenu.classList.remove("fa-times");
        }
    });


    /*=====SCROLL TOP======*/
    const scrollTop = document.querySelector(".scroll-top");

    window.addEventListener("scroll", function(e) {
        if (this.scrollY >= 500) {
            scrollTop.classList.add("scrolltop-active");
        } else {
            scrollTop.classList.remove("scrolltop-active");
        }
    });


    


});  

    

$(window).on('scroll load',function(){

    $('section[id]').each(function(){

        let height = $(this).height();
        let offset = $(this).offset().top - 100;
        let top = $(window).scrollTop();
        let id = $(this).attr('id');

        if(top >= offset && top < offset + height){
            $('.header-navbar ul li a').removeClass('active');
            $('.header-navbar').find(`[href="#${id}"]`).addClass('active');
        }

    });

});