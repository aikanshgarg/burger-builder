import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => {
	const ingredientSummary = Object.keys(props.ingredients)
							  .map(ing => {
							  	return(<li key={ing}><span style={{textTransform: 'capitalize'}}>{ing}: {props.ingredients[ing]}</span></li>); // Each li item will look like => Salad: 1
							  });
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with following ingredients</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue to checkout?</p>
		</Aux>

	)
}

export default orderSummary;