import Slider from "./Slider.mjs";

// instancio un objeto Slider para cada slider-container
const sliders = document.querySelectorAll(".slider-container");
sliders.forEach((sliderElement, index) => {
    let options = {};

    if (index === 0) {
        options = { interval: 3000 };
    } else if (index === 1) {
        options = { interval: 5000, directionInverse: true };
    } else if (index === 2) {
        options = { interval: 3000 }
    } else if (index === 3) {
        options = { interval: 4000, directionInverse: true };
    }
    const sliderInstance = new Slider(sliderElement, options);
})