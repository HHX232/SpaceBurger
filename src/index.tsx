import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./services/reducers";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from "./services/middleware/socketMiddleware";


// Создание composeEnhancers для поддержки Redux DevTools
const composeEnhancers =
  typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Создание store с использованием composeEnhancers и middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, socketMiddleware()))
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(document.getElementById("root") ?? document.body);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
      <Router>
        <App />
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
