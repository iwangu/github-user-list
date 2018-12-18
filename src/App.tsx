import * as React from 'react';
import { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import { applyMiddleware, Store, createStore, AnyAction } from 'redux';
import { rootReducer } from './ducks/index';
import UserList from './containers/UserList';
import UserDetail from './containers/UserProfile';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
const w:any = window as any;
const devtools:any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f:any)=>f;
const middleware = applyMiddleware(thunk);
const store:any = middleware(devtools(createStore))(rootReducer);
import './index.css';

export const App:React.StatelessComponent<{}> = () => {

    /* basename in BrowserRouter is needed for github pages, see issue #1765 for create-react-app */

    return (
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Route render={({ location }) => (
                     <div>
                      <Switch location={location}>
                         <Route exact path='/' component={UserList}/>
                         <Route exact path='/user/:login' component={UserDetail}/>
                      </Switch>
                     </div>

                    )}
                />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
