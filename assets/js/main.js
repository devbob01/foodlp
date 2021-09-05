window.addEventListener("load", function (e) {

    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    const numberOfSlides = slides.length;
    var slideNumber = 0;

    //image slider next button
    nextBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    });

    //image slider previous button
    prevBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber--;

        if(slideNumber < 0){
            slideNumber = numberOfSlides - 1;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    });

    //image slider autoplay
    setInterval(function(){
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    }, 4000);
    
      

  /*FIXED HEADER*/

    const headerFixed = document.querySelector(".header");
    window.addEventListener("scroll", function (e) {
        if (this.scrollY >= 200) {
            headerFixed.classList.add("is-fixed");
        } 
        else {
            headerFixed.classList.remove("is-fixed");
        }
    });

    /* MENU TAB*/
    const menuBtn = document.querySelectorAll(".btn-menu");
    const menuItem = document.querySelectorAll(".product");

    /*Show All Food*/
    [...menuItem].forEach((item) => {
        item.classList.add("active-food");
    });

    /* show active-food*/
    [...menuBtn].forEach((item) =>
        item.addEventListener("click", function (e) {
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




    /*Toggle Menu*/
    const toggleMenu = document.querySelector(".menu-toggle");
    const headerMenu = document.querySelector(".header-container_menu");
    const itemLink = document.querySelectorAll(".item-link");

    toggleMenu.addEventListener("click", function (e) {
        headerMenu.classList.toggle("is-show");
        toggleMenu.classList.toggle("fa-bars");
        toggleMenu.classList.toggle("fa-times");
    });

    [...itemLink].forEach((item) =>
        item.addEventListener("click", function (e) {
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.toggle("fa-bars");
            toggleMenu.classList.toggle("fa-times");
        })
    );

    document.addEventListener("click", function (e) {
        if (!headerMenu.contains(e.target) && !e.target.matches(".menu-toggle")) {
            headerMenu.classList.remove("is-show");
            toggleMenu.classList.add("fa-bars");
            toggleMenu.classList.remove("fa-times");
        }
    });

    /*SCROLL TOP*/
    const scrollTop = document.querySelector(".scroll-top");

    window.addEventListener("scroll", function (e) {
        if (this.scrollY >= 500) {
            scrollTop.classList.add("scrolltop-active");
        } else {
            scrollTop.classList.remove("scrolltop-active");
        }
    });
});


$(window).on("scroll load", function () {
    $("section[id]").each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 100;
        let top = $(window).scrollTop();
        let id = $(this).attr("id");

        if (top >= offset && top < offset + height) {
            $(".header-navbar ul li a").removeClass("active");
            $(".header-navbar").find(`[href="#${id}"]`).addClass("active");
        }
    });
});
