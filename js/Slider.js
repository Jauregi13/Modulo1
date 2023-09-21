class Slider {

    constructor(sliderID){
        this.sliderID = sliderID;
        this.slides = document.getElementsByClassName('slider-container__slide');
        this.positions = document.getElementsByClassName('fa-circle');
        this.actualSlide = this.slides[0];
        this.position = 0;
        this.setTimeoutId = 0;
    }

    nextSlide(){
        this.actualSlide.classList.remove('slider-container__slide--active');
        this.positions[this.position].classList.remove('fas');
        this.positions[this.position].classList.add('far');

        if(this.position == this.slides.length - 1){
            this.position = 0;
        }
        else {
            this.position++;
        }

        this.actualSlide = this.slides[this.position];
        this.actualSlide.classList.add('slider-container__slide--active');
        this.positions[this.position].classList.remove('far');
        this.positions[this.position].classList.add('fas');
        
    }

    prevSlide(){
        this.actualSlide.classList.remove('slider-container__slide--active');

        if(this.position == 0){
            this.position = this.slides.length - 1;
        }
        else {
            this.position--;
            
        }

        this.actualSlide = this.slides[this.position];
        this.actualSlide.classList.add('slider-container__slide--active');

    }

    automaticSlider(){

       this.setTimeoutId = setTimeout(() =>{
            this.nextSlide();
            this.automaticSlider();
        },3000);

                
    }


}