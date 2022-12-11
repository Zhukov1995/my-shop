
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resultAddNewID, 
        resultDeleteID, 
        UIdeleteID, 
        incTotalShopCounter, 
        decTotalShopCounter, 
        corectTotalShopCounter, 
        resultDeleteTargetAllID } from '../../actions/actions';

import './card-basket.scss';
import deleteImg from './delete.svg'

const CardBasket = (props) => {
    const { image, title, price, salePrice, color, memory, item } = props;

    const [itemCounter, setItemCounter] = useState(1);

    const UIarrIDitem = useSelector(state => state.UIarrIDitem)
    const resultArrIDitem = useSelector(state => state.resultArrIDitem)

    const dispatch = useDispatch();

    // функция проверки копий одинаковых товаров.Меняем локальный state только в случае если копий больше одной 
    const localCheckingCopies = (array, newID) => {
        const localItemCounter = array.filter(item => item === newID);
        if (localItemCounter.length > 1) {
            setItemCounter(localItemCounter.length);
        }
        console.log(localItemCounter)
    }
    // При создании страницы корзины мы один раз вызываем ее и дальше вызываем только при изменении общего числа товаров
    useEffect(() => {
        localCheckingCopies(resultArrIDitem, item[1].id);
        // eslint-disable-next-line
    }, [resultArrIDitem]);

    // функция удаления ID из результирующего массива
    const deleteIDBasket = (id) => {
        let index = resultArrIDitem.indexOf(id);
        if (index !== -1 && itemCounter > 1) {
            dispatch(resultDeleteID(index))
            setItemCounter(itemCounter - 1)
            dispatch(decTotalShopCounter())
        }
    }

    // функция добавления ID в результирующий массив
    const addnewIDBasket = (id) => {
        dispatch(resultAddNewID(id))
        setItemCounter(itemCounter + 1)
        dispatch(incTotalShopCounter())
    }

    // функция полного удаления карточки товара из корзины.Удаляем из UI и из результирующего массива
    const deleteTargetCardBasket = (id) => {
        const UIindex = UIarrIDitem.indexOf(id);
        const resultIndex = resultArrIDitem.indexOf(id);
        if(UIindex !== -1 && resultIndex !== -1) {
            dispatch(resultDeleteTargetAllID(id))
            dispatch(UIdeleteID(UIindex))
            dispatch(corectTotalShopCounter(itemCounter))
        }
    }

    const saleStyle = {
        textDecoration: 'line-through',
        color: 'silver',
    }

    const checkPrice = salePrice ? 
        <div>
            <p style={saleStyle}>{price}</p>
            <span>{salePrice}</span>
        </div>
         : price;


    return (
        <div className="card-basket">
            <div className="card-basket-img-block">
                <img src={image} alt={title} />
            </div>
            <div className="name">{`${title} ${memory}ГБ, ${color}`}</div>
            <div className="count">
                <button onClick={() => addnewIDBasket(item[1].id)}>+</button>
                {itemCounter}
                <button onClick={() => deleteIDBasket(item[1].id)}>-</button>
            </div>
            <div className="price">{checkPrice} руб</div>
            <div className="delete">
                
                <button onClick = {() => deleteTargetCardBasket(item[1].id)}>
                <img src={deleteImg} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default CardBasket;