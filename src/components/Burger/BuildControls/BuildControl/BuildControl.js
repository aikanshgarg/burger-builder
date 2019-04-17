import React from 'react';

import styles from './BuildControl.module.css';

const buildControl = props => (
	<div className={styles.BuildControl}>
		<div  className={styles.Label}>{props.label}</div>
		{/*disabled is a HTML property of button which is set to true/false by props.disabled*/}
		<button className={styles.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
		<button className={styles.More} onClick={props.added}>More</button>	
	</div>
);

export default buildControl;