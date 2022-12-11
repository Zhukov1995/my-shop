import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carousel.scss';
import { useEffect, useState } from 'react';

const Carousel = (props) => {
    const [countSlides,setCountSlides] = useState(1);


    const checkSizeWindow = () => {
        const sizeWindow = window.outerWidth;
        
        if(sizeWindow > 900) setCountSlides(1);
        if(sizeWindow > 1000) setCountSlides(2);
        if(sizeWindow > 1500) setCountSlides(3);
        if(sizeWindow > 1900) setCountSlides(4);
    }

    useEffect(() => {
        checkSizeWindow();
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: countSlides,
        slidesToScroll: 1
      };
    return (
        <div className="container">
            <Slider {...settings}>
                {props.children}
            </Slider>
        </div>
    )
}

export default Carousel;