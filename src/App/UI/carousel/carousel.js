import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carousel.scss';

const Carousel = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: props.slidesToShow,
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