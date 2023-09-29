class Slider {

    constructor(sliderID){
        this.sliderID = sliderID;
        this.slides = document.getElementsByClassName('slider-container__slide');
        this.positions = document.getElementsByClassName('fa-circle');
        this.actualSlide = this.slides[0];
        this.position = 0;
    }

    hideActualSlide(){
        this.actualSlide.classList.remove('slider-container__slide--active');
        this.positions[this.position].classList.remove('fas');
        this.positions[this.position].classList.add('far');
    }

    displayNextSlide(){

        this.actualSlide = this.slides[this.position];
        this.actualSlide.classList.add('slider-container__slide--active');
        this.positions[this.position].classList.remove('far');
        this.positions[this.position].classList.add('fas');
    }

    nextSlide(){
        
        this.hideActualSlide();
        
        if(this.position == this.slides.length - 1){
            this.position = 0;
        }
        else {
            this.position++;
        }

        this.displayNextSlide();
        
    }

    prevSlide(){
        
        this.hideActualSlide();

        if(this.position == 0){
            this.position = this.slides.length - 1;
        }
        else {
            this.position--;
            
        }

        this.displayNextSlide();

    }

    automaticSlider(){

       let intervalId = setInterval(() => {
            this.nextSlide();
       }, 3000); 

       return intervalId;
                
    }




}