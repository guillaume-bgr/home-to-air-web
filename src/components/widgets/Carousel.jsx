import { useState } from "react"

function Carousel(props) {
    const [elementsShown, setElementsShown] = useState(0);

    // const allowSlideRight = (slides) => {
    //     return getElementsBySlide(document.getElementById('customCarousel'+props.carouselName)) + elementsShown < slides.length;
    // }

    // const allowSlideLeft = (slides) => {
    //     return getElementsBySlide(document.getElementById('customCarousel'+props.carouselName)) + elementsShown > slides.length;
    // }

    // const getElementsBySlide = (carousel) => {
    //     let slides = carousel.getElementsByClassName('slide');
    //     let slideContainer = carousel.getElementsByClassName('carousel-slides')[0];
    //     let elementsBySlide = Math.round(slideContainer.clientWidth / slides[0].clientWidth);
    //     setElementsShown(elementsBySlide);
    //     return elementsBySlide
    // }

    const slideLeft = () => {
        let carousel = document.getElementById('customCarousel'+props.carouselName);
        // getElementsBySlide(carousel);
        // if (allowSlideRight(carousel.getElementsByClassName('slide'))) {
            let slides = carousel.getElementsByClassName('carousel-slides');
            slides[0].classList.add('moving');
            if (isNaN(parseInt(slides[0].style.left))) {
                slides[0].style.left = "-100%"; 
            } else {
                let number = parseInt(slides[0].style.left.split('%')) - 100;
                slides[0].style.left = number+'%';
            }
        // }
    }

    const slideRight = () => {
        let carousel = document.getElementById('customCarousel'+props.carouselName);
        // getElementsBySlide(carousel);
        let slides = carousel.getElementsByClassName('carousel-slides');
        slides[0].classList.add('moving');
        if (isNaN(parseInt(slides[0].style.left))) {
        } else {
            let number = parseInt(slides[0].style.left.split('%')) + 100;
            slides[0].style.left = number+'%';
        }
    }

    return (
        <div id={"customCarousel"+props.carouselName} className="custom-carousel container">
            <div className="row">
                <div className="carousel-slides d-flex flex-nowrap position-relative p-0">
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test1
                    </div>
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test2
                    </div>
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test3
                    </div>
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test4
                    </div>
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test5
                    </div>
                    <div className="slide col-6 col-md-4 col-lg-3 text-center">
                        test6
                    </div>
                </div>
                <div className="carousel-controls">
                    <div onClick={slideRight}  className="button-left d-flex align-items-center justify-content-center">
                        <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6 4L6.6 12L14.6 20H10.6L3.3 12.7C2.9 12.3 2.9 11.7 3.3 11.3L10.6 4H14.6Z" fill="currentColor"/>
                        <path opacity="0.3" d="M21.6 4L13.6 12L21.6 20H17.6L10.3 12.7C9.9 12.3 9.9 11.7 10.3 11.3L17.6 4H21.6Z" fill="currentColor"/>
                        </svg>
                        </span>
                    </div>
                    <div onClick={slideLeft} className="button-right d-flex align-items-center justify-content-center">
                        <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4L18 12L10 20H14L21.3 12.7C21.7 12.3 21.7 11.7 21.3 11.3L14 4H10Z" fill="currentColor"/>
                        <path opacity="0.3" d="M3 4L11 12L3 20H7L14.3 12.7C14.7 12.3 14.7 11.7 14.3 11.3L7 4H3Z" fill="currentColor"/>
                        </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel