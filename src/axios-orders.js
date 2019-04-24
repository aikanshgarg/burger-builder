import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-cc019.firebaseio.com/'
});

export default instance;