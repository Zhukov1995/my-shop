import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resultAddNewID, UIaddNewID, incTotalShopCounter, setTargetItemID } from '../../actions/actions';
import checkingCopies from '../../functions/checkingCopies';
import calculateSale from '../../functions/calculateSale';

import './card-product.scss';

const CardProduct = (props) => {
    const { image, title, price, salePrice, color, memory, item } = props;
    const [countImg, setCountImg] = useState(1);
    const [percentSale, setPercentSale] = useState(undefined);
    const UIarrIDitem = useSelector(state => state.UIarrIDitem)
    const dispatch = useDispatch();

    const imgRef = useRef(null);

    // функцция меняющая картинки товара при каждом наведении на карточку товара
    const getNextlImg = (e) => {
        if (image.length > 1 && e.target === imgRef.current) {
            e.target.setAttribute('src', image[countImg])
            setCountImg(prev => prev + 1)
            if (countImg === image.length - 1) {
                setCountImg(0)
            }
        }
    }

    // если checking - true значит такого элемента нет в корзине и мы его добавляем в рендер.
    const addNewIDBasket = (e, id) => {
        e.stopPropagation();
        const checking = checkingCopies(UIarrIDitem, id);
        if (checking) {
            dispatch(UIaddNewID(id))
        }
        dispatch(resultAddNewID(id))
        dispatch(incTotalShopCounter())
    }

    useEffect(() => {
        if (price && salePrice) {
            const percent = calculateSale(price,salePrice);
            setPercentSale(percent);
        }
    }, [])


    return (

        <div className="card" onClick={() => dispatch(setTargetItemID(item[1].id))}>
            <NavLink to='/item' className='wrapper-card-link'>
                <div className='card-img-block'>
                    <img ref={imgRef} src={image[0]} alt={title} onMouseOver={getNextlImg} />
                </div>
                <h3 className='card-title'>{`${title} ${memory !== undefined ? memory + ' ГБ' : ''}, ${color}`}</h3>
            </NavLink>
            {salePrice ?
                <div className='card-price'>
                    <span className='old-price'>{`${price}`} </span>
                    {`${salePrice} руб`}
                    <div className='percent'>{`-${percentSale}%`}</div>
                </div>
                :
                <div className='card-price'>{`${price} руб`}</div>
            }
            <button
                type='button'
                className='card-btn'
                onClick={(e) => addNewIDBasket(e, item[1].id)}>
                В корзину
            </button>
        </div>
    )
}

export default CardProduct;