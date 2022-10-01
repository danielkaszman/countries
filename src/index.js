import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../src/features/CountrySlice";
import themeReducer from "../src/features/ThemeSlice";
import inputReducer from "../src/features/InputSlice";
import selectReducer from "../src/features/SelectSlice";

const store = configureStore({
  reducer: {
    country: countryReducer,
    theme: themeReducer,
    input: inputReducer,
    select: selectReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
