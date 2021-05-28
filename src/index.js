import ReactDOM from "react-dom";
import App from "./components/App";
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector(".root")
);
