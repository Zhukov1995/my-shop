// высчитываем процент скидки на товар

const calculateSale = (price,salePrice) => {
    // percent = (price - salePrice) * 100 / price 
    const localPrice = price.split(' ').join('');
    const localSalePrice = salePrice.split(' ').join('');
    let percent = (+localPrice - +localSalePrice) * 100 / +localPrice;
    percent = Math.floor(percent)
    return percent;
}

export default calculateSale;