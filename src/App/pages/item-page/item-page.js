import './item-page.scss';
import Service from '../../Service/service';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { UIaddNewID, resultAddNewID, incTotalShopCounter } from '../../actions/actions';
import checkingCopies from '../../functions/checkingCopies';




const ItemPage = () => {
    const targetItemID = useSelector(state => state.targetItemID);

    const service = new Service();

    const UIarrIDitem = useSelector(state => state.UIarrIDitem);
    const dispatch = useDispatch();

    const imgRef = useRef();

    // получаем по id модель 
    const target = service.getTargetModel(targetItemID)[0];

    // формируем лист картинок
    const images = target[1].image.map((image, index) => {
        return <li key={index} onClick={() => selectImg(image)}>
            <img src={image} alt="itemImage"/>
        </li>
    });



    // функция выбора картинки
    const selectImg = (link) => {
        imgRef.current.setAttribute('src', link)
    }

    // получаем обьект описания серии моделей
    const item = service.getDescription(target[1].name);

    // получаем характеристики товара,если они имеются
    const itemSpecifications = item.specifications !== undefined ? item.specifications.map((item, index) => {
        return <li key={index}>{item}</li>
    }) : <li>Данных пока нет...</li>;

    // получаем описание товара,если имеются 
    const description = item.description !== undefined ? item.description.map((item, index) => {
        return <li key={index}>{item}</li>
    }) : <li>К сожалению у этого товара отсутствует описания...</li>;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const itemAddNewIDBasket = (id) => {
        const checking = checkingCopies(UIarrIDitem, id);
        if (checking) {
            dispatch(UIaddNewID(id))
        }
        dispatch(resultAddNewID(id))
        dispatch(incTotalShopCounter())
    }

    return (
        <div className="item-page">
            <div className="btn-nav-group">
                <a href='#'>Категории</a>
                <span> / </span>
                <a href='#'>На главную</a>
            </div>
            <h2>{target[0]} {target[0][1].module}</h2>
            <div className="wrapper">
                <div className="item-image-block">
                    <ul className="item-image-list">
                        {images}
                    </ul>
                    <img
                        ref={imgRef}
                        src={target[1].image[0]}
                        alt='item-target-img'
                        className="item-target-image" />
                </div>
                <div className="item-info-block">
                    <h3>Краткое описание:</h3>
                    <ul className='info-block-list'>
                        {itemSpecifications}
                    </ul>
                    <div className="target-price">
                        {target[1].salePrice ?
                            <>
                                <p className='old-price'>{target[1].price}</p>
                                <p>{target[1].salePrice} ₽</p>
                            </>
                            :
                            <p>{target[1].price} ₽</p>
                        }
                    </div>
                    <button onClick={() => itemAddNewIDBasket(targetItemID)}>Добавить в Корзину</button>
                </div>
            </div>
            <div className="description">
                <h3>Описание товара:</h3>
                <ul>
                    {description}
                </ul>
            </div>
        </div>
    )
}

export default ItemPage;