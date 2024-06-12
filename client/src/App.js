import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Analysis, PageNotFound } from './pages'
import { Provider } from "react-redux"
import store from "./redux/store.js"

function App() {
	return (
		<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/analysis" element={ <Analysis /> } />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
		</Provider>
	);
}

export default App;
