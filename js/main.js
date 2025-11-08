document.addEventListener("DOMContentLoaded", function () {
    // =============================== FADE-IN OBSERVER
    const observerOptions = { root: null, threshold: 0.1, rootMargin: "0px" };
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
    sections.forEach((section) => observer.observe(section));

    // =============================== MISSION CARDS ANIMATION
    const missionCards = document.querySelectorAll(".mission-card");
    missionCards.forEach((card, index) => {
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
    });

    // =============================== IMAGE CLICK EFFECT
    const clickableImages = document.querySelectorAll(".clickable-image");
    clickableImages.forEach((image) => {
        image.addEventListener("click", function (e) {
            e.preventDefault();
            this.style.transition = "transform 0.3s ease";
            this.style.transform = "scale(0.95)";
            setTimeout(() => (this.style.transform = "scale(1)"), 150);
        });
    });

    // =============================== BUTTON RIPPLE
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
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement("style");
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // =============================== HEADER SCROLL SHADOW
    window.addEventListener("scroll", function () {
        document.querySelector("header").style.boxShadow = "none";
    });

    // =============================== ICONS
    const icons = [
        { selector: ".icon", size: "25px", color: "#ff0000" },
        { selector: ".icon2", size: "35px", color: "black" },
    ];
    icons.forEach((ic) => {
        document.querySelectorAll(ic.selector).forEach((icon) => {
            icon.style.width = ic.size;
            icon.style.height = ic.size;
            icon.style.fill = ic.color;
        });
    });

    // =============================== NAV BUTTONS
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons[0]?.classList.add("active");
    navButtons.forEach((button) => {
        button.addEventListener("click", () => {
            navButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            button.classList.remove("click-animate");
            void button.offsetWidth;
            button.classList.add("click-animate");

            const targetId = button.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });

        button.addEventListener(
            "mouseenter",
            () => (button.style.transform = "translateY(-2px)")
        );
        button.addEventListener(
            "mouseleave",
            () => (button.style.transform = "translateY(0)")
        );
    });

    const squareButtons = document.querySelectorAll(
        ".square-button, .square-button-secondary, .square-button-alternate"
    );
    squareButtons.forEach((button) => {
        button.addEventListener(
            "mouseenter",
            () => (button.style.transform = "translateY(-2px)")
        );
        button.addEventListener(
            "mouseleave",
            () => (button.style.transform = "translateY(0)")
        );
    });

    // =============================== COUNTDOWN
    function updateCountdown() {
        const now = new Date();
        const sunday = new Date(now);
        sunday.setDate(now.getDate() - now.getDay());
        sunday.setHours(9, 0, 0, 0);
        const sundayEnd = new Date(sunday);
        sundayEnd.setHours(11, 0, 0, 0);
        if (now > sundayEnd) sunday.setDate(sunday.getDate() + 7);
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

    // =============================== VOLUNTEER SWIPER
    const volunteerSwiper = new Swiper(".eventSwiper", {
        slidesPerView: "auto", // <-- change this
        spaceBetween: 20,
        loop: true,
        slidesPerGroup: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1024: { spaceBetween: 20 },
            768: { spaceBetween: 15 },
            640: { spaceBetween: 10 },
            0: { spaceBetween: 5 },
        },
    });
});
