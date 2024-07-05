import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import { ChatContext } from './context/ChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<ChatContext>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChatContext>
	</AuthProvider>
)
