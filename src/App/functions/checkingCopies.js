
// функция проверки UI копий, нужна для того чтобы не рендерить один и тот же элемент в корзине дважды
const checkingCopies = (array, newID) => {
    const itemCounter = array.filter(item => item === newID);
    if (itemCounter.length === 0) {
        return true
    } else {
        return false
    }
}

export default checkingCopies