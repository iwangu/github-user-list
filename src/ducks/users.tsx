import { Reducer } from 'redux'
import { Dispatch } from 'redux';
var parse = require('parse-link-header');

//Interfaces
//Action
//Reducer
//Actions Creaters
//Side-Effect, thunks etc

//Interfaces
export interface RequestUsers {
    type: REQUEST_USERS;
}

export interface ReceiveUsers {
    type: RECEIVE_USERS;
    users: any[]
}

export interface UpdateFetchUrlToNext {
    type: UPDATE_FETCH_URL_TO_NEXT;
}

export interface UpdateFetchUrlToPrevious {
    type: UPDATE_FETCH_URL_TO_PREVIOUS;
}

export interface ReceiveLinkHeader {
    type: RECEIVE_LINK_HEADER;
    header: Object;
}

export interface UserList {
    isFetching: boolean;
    items: User[];
    currentPage: string;
    nextPage: string;
    previousPages: string[];
}

export interface User {
    id: number;
    login: string;
    avatar_url: string;
}

// Actions
const REQUEST_USERS = 'github-user-list/users/REQUEST_USERS';
type REQUEST_USERS = typeof REQUEST_USERS;

const RECEIVE_USERS = 'github-user-list/users/RECEIVE_USERS';
type RECEIVE_USERS = typeof RECEIVE_USERS;

const FETCH_USERS = 'github-user-list/users/FETCH_USERS';
type FETCH_USERS = typeof FETCH_USERS;

const RECEIVE_LINK_HEADER = 'github-user-list/users/RECEIVE_LINK_HEADER';
type RECEIVE_LINK_HEADER = typeof RECEIVE_LINK_HEADER;

const UPDATE_FETCH_URL_TO_NEXT = 'github-user-list/users/UPDATE_FETCH_URL_TO_NEXT';
type UPDATE_FETCH_URL_TO_NEXT = typeof UPDATE_FETCH_URL_TO_NEXT;

const UPDATE_FETCH_URL_TO_PREVIOUS = 'github-user-list/users/UPDATE_FETCH_URL_TO_PREVIOUS';
type UPDATE_FETCH_URL_TO_PREVIOUS = typeof UPDATE_FETCH_URL_TO_PREVIOUS;

//Reducer
const initialState:UserList = {
    items: [],
    isFetching: false,
    currentPage: 'https://api.github.com/users',
    nextPage: "",
    previousPages: []
}

const reducer:Reducer<UserList> = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.users
            })
        case RECEIVE_LINK_HEADER:
            return Object.assign({}, state, {
                isFetching: false,
                nextPage: action.header.next.url
            })
        case UPDATE_FETCH_URL_TO_NEXT:
            return Object.assign({}, state, {
                isFetching: false,
                currentPage: state.nextPage,
                previousPages: state.previousPages.concat(state.currentPage)
            })
        case UPDATE_FETCH_URL_TO_PREVIOUS:
            return Object.assign({}, state, {
                isFetching: false,
                currentPage: state.previousPages.slice(-1)[0],
                previousPage: state.previousPages.slice(0, -1)
            })
        default:
            return state
    }
}

export default reducer;

//ActionCreators
export function requestUsers():RequestUsers {
    return {
        type: REQUEST_USERS
    }
}

export function receiveUsers(users:User[]):ReceiveUsers {
    return {
        type: RECEIVE_USERS,
        users: users
    }
}

export function receiveLinkHeader(header:any):ReceiveLinkHeader {
    return {
        type: RECEIVE_LINK_HEADER,
        header: header
    }
}

export function Update_Fetch_Url_To_Next():UpdateFetchUrlToNext {
    return {
        type: UPDATE_FETCH_URL_TO_NEXT
    }
}

export function Update_Fetch_Url_To_Previous():UpdateFetchUrlToPrevious {
    return {
        type: UPDATE_FETCH_URL_TO_PREVIOUS
    }
}

export function next() {
    return (dispatch:Dispatch, getState:any) => {
        dispatch(Update_Fetch_Url_To_Next())
    }
}

export function back() {
    return (dispatch:Dispatch, getState:any) => {
        dispatch(Update_Fetch_Url_To_Previous())
    }
}

//Side-effects, thunks etc
export function fetchUsers() {

    return (dispatch:Dispatch, getState:any) => {

        let url;
        getState().userList.currentPage ? url = getState().userList.currentPage : url = 'https://api.github.com/users'

        dispatch(requestUsers());
        fetch(url)
            .then(response => response.json().then((json) => {
                var parsed = parse(response.headers.get("Link"));
                dispatch(receiveLinkHeader(parsed));
                let users = json.map((obj:any) => ({id: obj.id, login: obj.login, avatar_url: obj.avatar_url}));
                dispatch(receiveUsers(users));
            }));
    }
}
