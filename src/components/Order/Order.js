import React from 'react';
import styles from './Order.module.css';

const order = props => {
	const ingredients = [];
	for(let ing in props.ingredients) {
		ingredients.push({
			name: ing,
			amount: props.ingredients[ing]
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		return <span
			style={{textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					borderRadius: '2px',
					border: '1px solid #ccc',
					padding: '5px'
				}} 
			key={ig.name}>{ig.name} ({ig.amount})</span>;	
	});

	return(
		<div className={styles.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>{props.price.toFixed(2)}</strong></p>
		</div>
	)
}
	
export default order;