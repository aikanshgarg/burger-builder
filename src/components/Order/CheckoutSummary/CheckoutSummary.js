import React from 'react';

import styles from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => {
	return(
		<div className={styles.CheckoutSummary}>
			<h2>We hope it tastes well!</h2>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger"
				clicked={props.checkoutCancel}>CANCEL</Button>
			<Button btnType="Success"
				clicked={props.checkoutContinue}>CONTINUE</Button>
		</div>
	);
}

export default checkoutSummary;