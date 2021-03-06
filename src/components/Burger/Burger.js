import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => { 

	// making a JSX elements array of all the ingredients
	let transformedIngredients = [];
	for(let ing in props.ingredients) {
		for(let i = 0; i < props.ingredients[ing]; i++) {
			transformedIngredients.push(<BurgerIngredient key={ing+i} type={ing}/>);
		}
	}

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Let's make it tasty by adding some ingredients?</p>
	}

	//console.log(transformedIngredients);

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;