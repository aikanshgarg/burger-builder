import React, {Component} from 'react';

import styles from './Modal.module.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

	// re-rendering the component only when show true/modal is shown OR
	// the content inside modal is changed (spinner or summary)
	shouldComponentUpdate(nextProps, nextState) {
		return ((nextProps.show !== this.props.show) || (nextProps.children !== this.children));
	}

	componentWillUpdate() {
		//console.log('[Modal.js] componentWillUpdate');
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div 
					className={styles.Modal} 
					style={{ 
							transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
							opacity: this.props.show ? '1': '0'
						  }}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;