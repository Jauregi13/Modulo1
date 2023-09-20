class Slider {

    constructor(sliderID){
        this.sliderID = sliderID;
        this.slides = document.getElementsByClassName('slider-container__slide');
        this.actualSlide = this.slides[0];
    }


}