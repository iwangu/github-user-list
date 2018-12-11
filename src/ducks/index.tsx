import { combineReducers } from 'redux';
import userList from './users'
import userDetail from './userDetail'
import { UserDetail } from '../ducks/userDetail';
import { UserList} from '../ducks/users';
import { User} from '../ducks/users';
import { Reducer } from 'redux'

export interface StoreState {
    userList:UserList;
    userDetail:UserDetail;
}

export const rootReducer = combineReducers({
    userList,
    userDetail
});

export {UserDetail, UserList, User};
export default rootReducer;
