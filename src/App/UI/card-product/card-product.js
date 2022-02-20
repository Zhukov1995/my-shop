import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resultAddNewID, UIaddNewID, incTotalShopCounter } from '../../actions/actions';
import './card-product.scss';

const CardProduct = (props) => {
    const { image, title, price, color, memory, item } = props;
    const [countImg, setCountImg] = useState(1);
    const UIarrIDitem = useSelector(state => state.UIarrIDitem);
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
    // функция проверки UI копий, нужна для того чтобы не рендерить один и тот же элемент в корзине дважды
    const checkingCopies = (array, newID) => {
        const itemCounter = array.filter(item => item === newID);
        if (itemCounter.length === 0) {
            return true
        } else {
            return false
        }
    }
    // если checking - true значит такого элемента нет в корзине и мы его добавляем в рендер.
    const addNewIDBasket = (id) => {
        const checking = checkingCopies(UIarrIDitem, id);
        if (checking) {
            dispatch(UIaddNewID(id))
        }
        dispatch(resultAddNewID(id))
        dispatch(incTotalShopCounter())
    }


    return (
        <div className="card">
            <div className='card-img-block'>
                <img ref={imgRef} src={image[0]} alt={title} onMouseOver={getNextlImg} />
            </div>
            <h3 className='card-title'>{`${title} ${memory}ГБ, ${color}`}</h3>
            <p className='card-price'>{`${price} руб`}</p>
            <button
                type='button'
                className='card-btn'
                onClick={() => addNewIDBasket(item[1].id)}>
                В корзину
            </button>
        </div>
    )
}

export default CardProduct;