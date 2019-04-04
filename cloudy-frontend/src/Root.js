import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "components/App";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import configure from "store/configure";

const store = configure();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
