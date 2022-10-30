import { combineReducers } from 'redux';// combien tous les reducers et les envoies vers le store
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer'

export default combineReducers({// regroupe tous les states (état)
    userReducer,
    usersReducer,
    postReducer,
},
{ 
    devTools: false
})