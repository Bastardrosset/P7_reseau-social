import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';


//Outil developpement
import { composeWithDevTools } from 'redux-devtools-extension';

// import logger from 'redux-logger';
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers())
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>


);


