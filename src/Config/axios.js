import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
	// your url
	 baseURL: 'http://192.168.100.14:3000',
	//baseURL: 'https://api-arenthis.herokuapp.com',
	// baseURL: "https://staging.api.arenthi.com",
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
	const user = cookies.get('userInfo') || null;
	const token = cookies.get('token') || null;
	// console.log(token);

	if (user) {
		config.headers.Authorization = token ? `Bearer ${token}` : '';
	}
	return config;
});

export default instance;
