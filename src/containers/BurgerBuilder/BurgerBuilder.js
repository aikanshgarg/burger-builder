import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false 
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
		alert('You can continue!!!');
	}

	// logic to disable/enable ORDER NOW button: this fn is executed each time an ing is added/removed
	updatePurchaseState (ingredients) {
		this.setState({purchasable: Object.values(ingredients).some(amount => amount > 0) });
	}

	// methods to control ingredients
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		// updating in an immutable way: by copying the old array
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

		// disabledInfo ===> {salad: true, meat:false, ...}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
					<OrderSummary 
						ingredients={this.state.ingredients} 
						purchaseCancel={this.cancelPurchaseHandler} 
						purchaseContinue={this.continuePurchaseHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
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
	}
}

export default BurgerBuilder;