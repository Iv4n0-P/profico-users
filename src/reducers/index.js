import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './usersReducer'

export default combineReducers({
    users: usersReducer,
    form: formReducer
  }) 