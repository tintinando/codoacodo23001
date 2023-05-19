class Slider {
    constructor(sliderElement) {
        // DOM
        this.sliderElement = sliderElement;
        this.slider = sliderElement.querySelector(".slider");
        this.sliderSection = this.slider.querySelectorAll(".slider-section");
        this.sliderSectionLast = this.sliderSection[this.sliderSection.length - 1];
        this.btnLeft = sliderElement.querySelector(".slider-btn-left");
        this.btnRight = sliderElement.querySelector(".slider-btn-right");
        this.timeTransition = 350;
        this.touchStartX = 0;
        this.touchEndX = 0;


        // mueve la última foto al comienzo para poder ir a la izquierda desde el principio
        this.slider.insertAdjacentElement('afterbegin', this.sliderSectionLast);
        // ancho del slider 100% * cantidad de fotos
        this.slider.style.width = this.sliderSection.length * 100 + "%";

        // eventos para las flechas
        this.btnRight.addEventListener('click', () => this.togglePhoto('next'));
        this.btnLeft.addEventListener('click', () => this.togglePhoto('prev'));
        // eventos para el arrastre del dedo
        sliderElement.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        sliderElement.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        sliderElement.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // desplazamiento automático
        this.autoNextInterval = setInterval(() => {
            this.nextPhoto();
        }, 4000)
    }

    nextPhoto() {
        const sliderSectionFirst = this.sliderElement.querySelectorAll(".slider-section")[0];
        // genera el movimiento al hacer clic
        this.slider.style.marginLeft = "-200%";
        this.slider.style.transition = `all ${this.timeTransition / 1000}s ease-in-out`;
        // reordena las fotos al terminar transición
        setTimeout(() => {
            this.slider.style.transition = "none";
            this.slider.insertAdjacentElement('beforeend', sliderSectionFirst);
            this.slider.style.marginLeft = "-100%";
        }, this.timeTransition)
    }

    prevPhoto() {
        let sliderSection = this.sliderElement.querySelectorAll(".slider-section");
        let sliderSectionLast = sliderSection[sliderSection.length - 1];
        this.slider.style.marginLeft = "0";
        this.slider.style.transition = `all ${this.timeTransition / 1000}s ease-in-out`;
        setTimeout(() => {
            this.slider.style.transition = "none";
            this.slider.insertAdjacentElement('afterbegin', sliderSectionLast);
            this.slider.style.marginLeft = "-100%";
        }, this.timeTransition)
    }

    togglePhoto(direction) {
        // anula desplazamiento automático
        clearInterval(this.autoNextInterval);
        if (direction === "next") {
            this.nextPhoto();
        } else if (direction === "prev") {
            this.prevPhoto();
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        const threshold = 100;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0) {
                this.togglePhoto('prev');
            } else {
                this.togglePhoto('next');
            }
        }
        this.touchStartX = 0;
        this.touchEndX = 0;
    }
}

export default Slider;