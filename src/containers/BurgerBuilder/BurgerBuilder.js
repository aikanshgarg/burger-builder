import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {

		console.log(this.props);

		axios.get('https://react-my-burger-cc019.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				this.setState({error: true})
			});
	}

	// logic to check if ORDER NOW btn is clicked 
	//------ it will give an error as 'this' keyword is not bind when we call this method on an event (btn click here)
	// purchaseHandler() {
	// 	this.setState({purchasing: true});
	// }
	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	cancelPurchaseHandler = () => {
		this.setState({purchasing: false});
	}

	continuePurchaseHandler = () => {
		// passing ingredients and price to checkout page(component) in search query params
		const queryParams = [];
		for(let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}
 
	// logic to disable/enable ORDER NOW button: this fn is executed each time an ing is added/removed
	updatePurchaseState (ingredients) {
		this.setState({purchasable: Object.values(ingredients).some(amount => amount > 0) });
	}

	// methods to control ingredients
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		// updating in an immutable way: by copying the old object
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		// updating total price
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		// updating in an immutable way: by copying the old array
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		// updating total price
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		
		this.updatePurchaseState(updatedIngredients);
	}


	render () {

		// logic to disable less button
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null; // we don't have ingredient by default, thus, no orderSummary is possible initially
		let burger = this.state.error ? <p>Sorry, ingredients can't be fetched from our kitchen...</p> : <Spinner />; 
		// show some error message if we are not able to process 'get' request, by default show spinner
		
		if (this.state.ingredients) { // render only when data(ingredients) from backend(firebase) have been fetched
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						purchasing={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
								ingredients={this.state.ingredients} 
								purchaseCancel={this.cancelPurchaseHandler} 
								purchaseContinue={this.continuePurchaseHandler}
								price={this.state.totalPrice}
							/>;
		}

		// render spinner when orderSummary is being sent to backend(firebase)
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		// disabledInfo ===> {salad: true, meat:false, ...}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);