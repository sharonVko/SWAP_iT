import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { AuthProvider } from './context/AuthProvider.jsx';
import { ChatContext } from './context/ChatContext.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<ContextProvider>
		<AuthProvider>
			<ChatContext>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChatContext>
		</AuthProvider>
	</ContextProvider>
)
