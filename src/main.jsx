import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {BrowserRouter} from 'react-router-dom';
import UserProvider from './context/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
);
