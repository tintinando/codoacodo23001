import Slider from "./Slider.mjs";

// instancio un objeto Slider para cada slider-container
const sliders = document.querySelectorAll(".slider-container");
sliders.forEach((sliderElement)=>{
    const sliderInstance = new Slider(sliderElement);
})