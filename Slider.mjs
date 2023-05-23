class Slider {
    constructor(sliderElement) {
      this.sliderElement = sliderElement;
      this.slider = sliderElement.querySelector(".slider");
      this.sliderSection = this.slider.querySelectorAll(".slider-section");
      this.sliderSectionLast = this.sliderSection[this.sliderSection.length - 1];
      this.btnLeft = sliderElement.querySelector(".slider-btn-left");
      this.btnRight = sliderElement.querySelector(".slider-btn-right");
      this.timeTransition = 350;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.currentSlideIndex = 0;
  
      this.slider.style.width = this.sliderSection.length * 100 + "%";
      this.slider.style.transform = "translateX(0%)";
  
      this.btnRight.addEventListener("click", () => this.togglePhoto("next"));
      this.btnLeft.addEventListener("click", () => this.togglePhoto("prev"));
      sliderElement.addEventListener("touchstart", (e) =>
        this.handleTouchStart(e)
      );
      sliderElement.addEventListener("touchmove", (e) =>
        this.handleTouchMove(e)
      );
      sliderElement.addEventListener("touchend", (e) => this.handleTouchEnd(e));
  
      this.autoNextInterval = setInterval(() => {
        this.nextPhoto();
      }, 4000);
    }
  
    nextPhoto() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.sliderSection.length;
      this.slider.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }
  
    prevPhoto() {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.sliderSection.length) %
        this.sliderSection.length;
      this.slider.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }
  
    togglePhoto(direction) {
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
      const touchDistance = this.touchEndX - this.touchStartX;
      const dragDistancePercentage =
        (touchDistance / this.sliderElement.offsetWidth) * 100;
      this.slider.style.transform = `translateX(calc(-${
        this.currentSlideIndex * 100
      }% + ${dragDistancePercentage}%))`;
    }
  
    handleTouchEnd(e) {
      const threshold = 100;
      const swipeDistance = this.touchEndX - this.touchStartX;
  
      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
          this.prevPhoto();
        } else {
          this.nextPhoto();
        }
      } else {
        this.slider.style.transform = `translateX(-${
          this.currentSlideIndex * 100
        }%)`;
      }
  
      this.touchStartX = 0;
      this.touchEndX = 0;
    }
  }
  
  export default Slider;
 