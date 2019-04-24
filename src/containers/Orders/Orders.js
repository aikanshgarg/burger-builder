import React, {Component} from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

	state = {
		orders: [],
		loading: true
	}

	// using 'did'Mount because we want to fetch orders from firebase only after rendering the Orders component
	componentDidMount() {
		axios.get('/orders.json')
			.then(res => {
				// storing orders in array of objects
				const fetchedOrders = [];
				for(let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				this.setState({loading: false, orders: fetchedOrders});
			})
			.catch(err => {
				this.setState({loading: false});
			})
	}

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order key={order.id} ingredients={order.ingredients} price={+order.price} />
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);