import './advantages.scss';
import rocketImg from './advantage-img/rocket.svg';
import likeImg from './advantage-img/like.svg';
import informationImg from './advantage-img/information.svg';

const Advantages = () => {
    return (
        <div className="flex-container-1">
            <div className="advantages-block">
                <div className="wrapper-img">
                    <img src={rocketImg} alt="#" className='img-advantages' />
                </div>
                <div className='info-advantages'>
                    <h3>БЫСТРАЯ ДОСТАВКА</h3>
                    <p>Возможна доставка в точное время в день заказа</p>
                </div>
            </div>
            <div className="advantages-block">
                <div className="wrapper-img">
                    <img src={likeImg} alt="#" className='img-advantages' />
                </div>
                <div className='info-advantages'>
                    <h3>ЛУЧШИЕ ЦЕНЫ</h3>
                    <p>Самые привлекательные цены, огромные скидки!</p>
                </div>
            </div>
            <div className="advantages-block">
                <div className="wrapper-img">
                    <img src={informationImg} alt="#" className='img-advantages' />
                </div>
                <div className='info-advantages'>
                    <h3>ОРИГИНАЛЬНАЯ ПРОДУКЦИЯ APPLE</h3>
                    <p>В нашем фирменном магазине можно приобрести оригинальную технику Apple с гарантией и доставкой</p>
                </div>
            </div>
        </div>
    )
}

export default Advantages;