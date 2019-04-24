import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = props => (
		<li className={styles.NavigationItem}>
			<NavLink to={props.link} activeClassName={styles.active} exact={props.exact}> 
		{/*using exact to make sure active class is applied to only the exact current path (only on the bueger builder route ==> '/')*/}
				{props.children}
			</NavLink>
		</li>
);

export default navigationItem;