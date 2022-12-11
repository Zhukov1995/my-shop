import Header from './header/header';
import NavBar from './nav-bar/nav-bar';
import CategoryPage from './pages/category-page/category-page';
import Footer from './footer/footer';
import BasketPage from './pages/basket-page/basket-page';
import MainPage from './pages/main-page/main-page';

import { Routes, Route } from 'react-router-dom';

import './app.scss';
import ItemPage from './pages/item-page/item-page';



const App = () => {
    return (
        <div className="app">
            <NavBar />
            <div className='main'>
                <Header />
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={<MainPage />}
                    />
                    <Route
                        exact
                        path='/category/iphone'
                        element={
                            <CategoryPage
                                typeTechnic={"iphone"}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/category/ipad'
                        element={
                            <CategoryPage
                                typeTechnic={"ipad"}
                            />
                        } 
                    />
                     <Route
                        exact
                        path='/category/watch'
                        element={
                            <CategoryPage
                                typeTechnic={"watch"}
                            />
                        } 
                    />
                     <Route
                        exact
                        path='/category/mac'
                        element={
                            <CategoryPage
                                typeTechnic={"mac"}
                            />
                        } 
                    />
                    <Route
                        exact
                        path='/basket'
                        element={<BasketPage />}
                    />
                    <Route 
                        exact 
                        path='/item'
                        element = {<ItemPage />}    
                    />
                </Routes>
                <Footer />
            </div>
        </div>
    )
}

export default App;

