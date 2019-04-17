import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => { 

	let transformedIngredients = [];
	for(let ing in props.ingredients) {
		for(let i = 0; i < props.ingredients[ing]; i++) {
			transformedIngredients.push(<BurgerIngredient key={ing+i} type={ing}/>);
		}
	}

	// console.log(props.ingredients);
	// console.log(props.ingredients['salad']);	
	console.log(transformedIngredients);

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;