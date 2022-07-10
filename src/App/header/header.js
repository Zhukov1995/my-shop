import './header.scss';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from './header-img/logo.svg';
import Basket from './header-img/basket.svg';

const Header = () => {

    const totalShopCounter = useSelector(state => state.totalShopCounter);

    const styleForCounter = {
        color: totalShopCounter > 0 ? 'red' : 'black',
        fontSize: totalShopCounter > 0 ? '17px' : '15px'
    }


    return (
        <header>
            <div className="logo">
                <NavLink to='/' activeclassname='active'>
                    <img src={Logo} alt="logo" className='logo-img' />
                    <h1 className='logo-logo'>STORE</h1>
                </NavLink>

            </div>
            <div className='basket'>
                <NavLink to='/basket' activeclassname='active'>
                    <img src={Basket} alt="basket" />
                    <span style={styleForCounter}>{totalShopCounter}</span>
                </NavLink>
            </div>
        </header>
    )
}

export default Header;