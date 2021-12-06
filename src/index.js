import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './Store';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './component/Layout/theme';
import { ThemeProvider } from '@material-ui/styles';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);