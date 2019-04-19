import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	// to check when we are we rendering this component: only when we render modal(wrapper)!
	componentWillUpdate() {
		console.log('[OrderSummary.js] componentWillUpdate');
	}


	render () {
		const ingredientSummary = Object.keys(this.props.ingredients)
							  .map(ing => {
							  	return(<li key={ing}><span style={{textTransform: 'capitalize'}}>{ing}: {this.props.ingredients[ing]}</span></li>);
							  	// Each li item will look like => Salad: 1
							  });

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with following ingredients</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
			</Aux>
		);
	}

}


export default OrderSummary;