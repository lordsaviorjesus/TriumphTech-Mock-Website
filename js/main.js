document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".eventSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll(
        ".welcome-section, .mission-section, .summary-section, .story-section"
    );
    sections.forEach((section) => {
        observer.observe(section);
    });

    const missionCards = document.querySelectorAll(".mission-card");
    missionCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";

            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = "all 0.6s ease";
                            entry.target.style.opacity = "1";
                            entry.target.style.transform = "translateY(0)";
                        }, index * 150);
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            cardObserver.observe(card);
        }, 0);
    });

    const clickableImages = document.querySelectorAll(".clickable-image");
    clickableImages.forEach((image) => {
        image.addEventListener("click", function (e) {
            e.preventDefault();

            this.style.transition = "transform 0.3s ease";
            this.style.transform = "scale(0.95)";

            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    });

    const buttons = document.querySelectorAll(
        ".hero-btn, .story-btn, .cta-btn"
    );
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const ripple = document.createElement("span");
            ripple.style.position = "absolute";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255, 255, 255, 0.6)";
            ripple.style.width = "100px";
            ripple.style.height = "100px";
            ripple.style.transform = "scale(0)";
            ripple.style.animation = "ripple 0.6s ease-out";
            ripple.style.pointerEvents = "none";

            const rect = this.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left - 50 + "px";
            ripple.style.top = e.clientY - rect.top - 50 + "px";

            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const style = document.createElement("style");
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        header.style.boxShadow = "none"; // always

        // const scrollTop =
        //     window.pageYOffset || document.documentElement.scrollTop;
        // if (scrollTop > lastScrollTop && scrollTop > 100) {
        //     header.style.transform = "translateY(-100%)";
        // } else {
        //     header.style.transform = "translateY(0)";
        // }
        // if (scrollTop > 50) {
        //     header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        // } else {
        //     header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
        // }
        // lastScrollTop = scrollTop;
    });

    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach((button) => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // ===============================
    // Countdown Timer for Sunday 9-11 AM
    // ===============================
    function updateCountdown() {
        const now = new Date();

        const sunday = new Date(now);
        sunday.setDate(now.getDate() - now.getDay());
        sunday.setHours(9, 0, 0, 0);

        const sundayEnd = new Date(sunday);
        sundayEnd.setHours(11, 0, 0, 0);

        if (now > sundayEnd) {
            sunday.setDate(sunday.getDate() + 7);
        }

        if (now >= sunday && now <= sundayEnd) {
            document.getElementById("countdown").textContent = "In session!";
            return;
        }

        let diff = sunday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        document.getElementById(
            "countdown"
        ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
