import './main-page.scss';
import './section/sectionChildren.scss';
import Section from './section/section';
import imgAbout from './slideAbout.jpg';
import Service from '../../Service/service';
import CardProduct from '../../UI/card-product/card-product';
import Carousel from '../../UI/carousel/carousel';
import Advantages from '../../UI/advantages/advantages';
import Timer from '../../UI/timer/timer';


const MainPage = () => {

    const service = new Service();

    const showNewModels = service.getNewModels().map(item => {
        return  <CardProduct 
                    image={item[1].image} 
                    title={item[1].name} 
                    price={item[1].price}
                    salePrice = {item[1].salePrice}
                    color={item[1].color}
                    memory={item[1].memory} 
                    key={item[1].id}
                    item={item}
                />
    });

    const showSaleModels = service.getSaleModels().map(item => {
        return  <CardProduct 
                    image={item[1].image} 
                    title={item[1].name} 
                    price={item[1].price}
                    salePrice = {item[1].salePrice}
                    color={item[1].color}
                    memory={item[1].memory} 
                    key={item[1].id}
                    item={item}
                />
    });
 
    const showProductOfTheDay = service.getProductOfTheDay().map(item => {
        return <CardProduct 
                    image={item[1].image} 
                    title={item[1].name} 
                    price={item[1].price}
                    salePrice = {item[1].salePrice}
                    color={item[1].color}
                    memory={item[1].memory} 
                    key={item[1].id}
                    item={item}
                />
    });

    return (
        <div className='main-page'>
                <img src={imgAbout} alt="about-img" className='about-img'/>
                <Section title={'О МАГАЗИНЕ'}>
                    <p className='about-description'>
                        Store — это не просто интернет магазин, мы заботимся о вас, и каждый клиент для нас является особым.
                    </p>
                </Section>
                <Section title={'НОВИНКИ'}>
                    <Carousel slidesToShow={4}>
                        {showNewModels} 
                    </Carousel>
                </Section>
                <Section title={'НАШИ ПРЕИМУЩЕСТВА'} backgroundColor={'#f2f2f2'}>
                   <Advantages/>
                </Section>
                <Section title={'АКЦИОННЫЕ ТОВАРЫ'}>
                    <Carousel slidesToShow={4}>
                        {showSaleModels} 
                    </Carousel>
                </Section>
                <Section title={'ТОВАР ДНЯ'}>
                    <div className="wrapper-product-day">
                        {showProductOfTheDay}
                        <Timer/>
                    </div>
                    <div className="description-product-day">
                        Каждую неделю в нашем магазине проводится распродажа,
                        и в этом разделе появляется товар,который вы можете приобрести по самой привлекательной цене!!!
                    </div>
                </Section>
        </div>
    )
}

export default MainPage;