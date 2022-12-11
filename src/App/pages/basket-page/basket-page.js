import './basket-page.scss';
import Service from '../../Service/service';
import { useSelector, useDispatch } from 'react-redux';
import { calculateAllSumBasket, setLabelTotalCounter } from '../../actions/actions';

import { useEffect } from 'react';

import CardBasket from '../../UI/card-basket/card-basket';

const BasketPage = () => {
    const state = useSelector(state => ({
        UIarrIDitem: state.UIarrIDitem,
        resultArrIDitem: state.resultArrIDitem,
        totalShopCounter: state.totalShopCounter,
        labelTotalShopCounter: state.labelTotalShopCounter,
        allSumBasket: state.allSumBasket
    }))
    const {
        UIarrIDitem,
        resultArrIDitem,
        totalShopCounter,
        labelTotalShopCounter,
        allSumBasket
    } = state;

    const dispatch = useDispatch();

    const service = new Service();

    let listBasket = state.UIarrIDitem.map((id, index) => {
        const item = service.getTargetModel(id)
        return <CardBasket
            image={item[0][1].image[0]}
            title={item[0][1].name}
            price={item[0][1].price}
            salePrice={item[0][1].salePrice}
            color={item[0][1].color}
            memory={item[0][1].memory}
            key={index}
            item={item[0]}
        />
    });
    // функция склонения слова 'товар' для totalCounter
    const validateLabelTotalCounter = (item, arr) => {
        if (item % 10 >= 5 || item % 10 === 0 || item === 11) {
            dispatch(setLabelTotalCounter(arr[0]))
        } else if (item === 1 || item % 10 === 1) {
            dispatch(setLabelTotalCounter(arr[1]))
        } else if ((item > 1 && item < 10) || (item % 10 < 5 && item > 20)) {
            dispatch(setLabelTotalCounter(arr[2]))
        }
    }

    // функция вычисления общей суммы товаров в корзине
    const calculateAllSum = (array) => {
        let localSum = 0;
        array.forEach(id => {
            const item = service.getTargetModel(id);
            const priceItem = +item[0][1].price.split(' ').join('');
            const salePriceItem = item[0][1].salePrice;
            const saleOrPrice = salePriceItem ? +salePriceItem.split(' ').join('') : priceItem;
            localSum += saleOrPrice;
        })
        localSum = formatMoney(localSum)
        dispatch(calculateAllSumBasket(localSum))
    }

    // функция пребразования числв в денежный формат
    function formatMoney(number) {
        return String(number.toLocaleString('ru-RU'))
    }


    useEffect(() => {
        validateLabelTotalCounter(totalShopCounter, ['товаров', 'товар', 'товара'])
        calculateAllSum(resultArrIDitem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalShopCounter])


    const showBasketList = UIarrIDitem.length > 0 ?
        <View
            listBasket={listBasket}
            totalShopCounter={totalShopCounter}
            labelTotalShopCounter={labelTotalShopCounter}
            allSumBasket={allSumBasket}
            UIarrIDitem={UIarrIDitem}
        />
        : <h1>В вашей корзине пока пусто...</h1>

    return (
        <div className="basket-page">
            {showBasketList}
        </div>
    )
}
// вспомогательный компонент
const View = (props) => {
    const {
        listBasket,
        totalShopCounter,
        labelTotalShopCounter,
        allSumBasket,
        UIarrIDitem } = props;

    const styleMargin = {
        marginTop: UIarrIDitem.length === 1 ? '250px' : '50px',
    }

    return (
        <>
            <h2>Товары в корзине</h2>
            <div className="description-options">
                <span className='option_counter'>У вас в корзине: {totalShopCounter} {labelTotalShopCounter}</span>
                <span className='option_label_count'>Количество</span>
                <span className='option_label_price'>Стоимость</span>
                <span className='option_label_delete'>Удалить</span>
            </div>
            {listBasket}
            <div className="wrapper" style={styleMargin}>
                <hr />
                <h2>Оформление заказа</h2>
                <div className="result-and-order">
                    <div className="result">
                        <p>У вас в корзине {totalShopCounter} {labelTotalShopCounter} на сумму: <b>{allSumBasket}.00</b> руб.</p>
                        <p className="result-info">*Сумма расчитывается без учета доставки.</p>
                    </div>
                    <button>Оформить заказ</button>
                </div>
            </div>
        </>
    )
}

export default BasketPage;