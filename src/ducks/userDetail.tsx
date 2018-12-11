import { Reducer } from 'redux'
import { Dispatch } from 'redux';

//Interfaces
//Actions
//Reducer
//Actions Creaters
//Side-Effect, thunks etc


//Interfaces
export interface RequestUser {
    type: REQUEST_USER;
}

export interface ReceiveUser {
    type: RECEIVE_USER;
    user: UserDetail;
}

export interface UserDetail {
    isFetching: boolean,
    user: UserAttributes;
}

export interface UserAttributes {
    login: string,
    avatar_url: string,
    created_at: string,
    location: string,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number,
    bio: string
}

//Actions
const REQUEST_USER = 'github-user-list/userDetail/REQUEST_USER';
type REQUEST_USER = typeof REQUEST_USER;

const RECEIVE_USER = 'github-user-list/userDetail/RECEIVE_USER';
type RECEIVE_USER = typeof RECEIVE_USER;


const FETCH_USER = 'github-user-list/userDetail/FETCH_USER';
type FETCH_USER = typeof FETCH_USER;

//Reducer
const initialState:UserDetail = {
    user: {
        login: "",
        avatar_url: "",
        created_at: "",
        location: "",
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        bio: ""
    },
    isFetching: false
}

const reducer:Reducer<UserDetail> = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.user
            })
        default:
            return state
    }
}

export default reducer;

//Action creators
export function requestUser():RequestUser {
    return {
        type: REQUEST_USER
    }
}

export function receiveUser(userDetail:UserDetail):ReceiveUser {
    return {
        type: RECEIVE_USER,
        user: userDetail
    }
}

//Side-Effect, thunks etc
export function fetchUser(login:string) {

    return (dispatch:Dispatch) => {

        dispatch(requestUser());
        return fetch(`https://api.github.com/users/${login}`)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveUser(json));
            });
    };
}
