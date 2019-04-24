import React from 'react';
import styles from './FormInput.module.css';

const formInput = props => {
	
	// making a more generic form for flexibility and suiting whatever kind of input we might have
	let inputElement = null;
	
	switch(props.inputtype) {
		case('input'):
			inputElement = <input className={styles.InputElement} {...props} />;
			break;
		case('textarea'):
			inputElement = <textarea className={styles.InputElement} {...props} />;
			break;
		default:
			inputElement = <input className={styles.InputElement} {...props} />;
	} 


	return(
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default formInput;