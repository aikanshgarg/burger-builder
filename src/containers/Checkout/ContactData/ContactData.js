import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		// prevent the form from submitting
		event.preventDefault();
		// ingredients + price are passed from the checkout component as props
		//console.log(this.props.ingredients);
		//console.log(this.props.price);

		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Aikansh',
				address: {
					street: 'White House',
					zipCode: '41351',
					country: 'Germany'
				},
				email: 'obama@usa.com'
			},
			deliveryMethod: 'express'
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})
				// redirecting the user
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false})
			});

	}

	render() {
		let form = (<form>
						<input type="text" name="name" placeholder="Your Name"/>
						<input type="email" name="email" placeholder="Your Email"/>
						<input type="text" name="street" placeholder="Street"/>
						<input type="text" name="postalCode" placeholder="Postal Code"/>
						<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
					</form>);
		if (this.state.loading) {
			form = <Spinner />
		}
		return(
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData;