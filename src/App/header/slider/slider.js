import { useState ,useEffect} from 'react';
import slide1 from './slider-img/iphoneX.png';
import slide2 from './slider-img/iphone11.jpg';
import slide3 from './slider-img/iphone12.jpg';
import slide4 from './slider-img/ipad2.jpg';
import slide5 from './slider-img/mac.jpg';
import './slider.scss';

const img = [
    <img key={slide1} src={slide1} alt ='slide'/>,
    <img key={slide2} src={slide2} alt ='slide'/>,
    <img key={slide3} src={slide3} alt ='slide'/>,
    <img key={slide4} src={slide4} alt ='slide'/>,
    <img key={slide5} src={slide5} alt ='slide'/>,
]

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Хук Effect
useEffect(() => {
    // Запускаем интервал
    const interval = setInterval(() => {
        // Меняем состояние
        setActiveIndex((current) => {
            // Вычисляем индекс следующего слайда, который должен вывестись
            const res = current === img.length - 1 ? 0 : current + 1
            // Возвращаем индекс
            return res
        })
    }, 5000)
    // Выключаем интервал
    return () => clearInterval(interval)
}, [])
 
// Вычисляем индекс предыдущего слайда
const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
// Вычисляем индекс следующего слайда
const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1


    return (
        <div className="slider">
        <div className="slider-img slider-img-prev"
                key={prevImgIndex}>
            {img[prevImgIndex]}
        </div>
        <div className="slider-img"
                key={activeIndex}>
            {img[activeIndex]}
        </div>
        <div className="slider-img slider-img-next"
                key={nextImgIndex}>
            {img[nextImgIndex]}
        </div>
    </div>
    )
}

export default Slider;