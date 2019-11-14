import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//hooks
import { useLocalStorage } from './hooks/useLocalStorage'

//contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('Shopping Cart', []);

	const addItem = item => {
		// add the given item to the cart
		console.log(item)
		setCart([...cart, item])
	};

	const removeItem = (item) => {
		let removeId = item;
		let newCart = cart.filter((name) => {
			return name.id !== removeId
		})
		setCart(newCart);
	}
	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
				<Navigation />

				{/* Routes */}
				<Route exact path="/" component= {Products} />

				<Route path="/cart"	component={ShoppingCart} />
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
