import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/mainstore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      
        <App></App>
        
      </Provider>
  </BrowserRouter>
);
