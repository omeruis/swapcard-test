import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// Our application routes
import Login from './containers/Login';
import Home from './containers/Home';
import ArtistAlbums from './containers/ArtistAlbums'
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const appRoutes = [
    {
        exact: true,
        path: "/",
        component: Login
    },
    {
        exact: false,
        path: "/react-spotify",
        component: Home
    },

    {
        exact: false,
        path: "/artist-albums/:artistId/:artistName",
        component: ArtistAlbums
    },

];

class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderRoutes = (routes) => {
        let allRoutes = [];
        routes.map((route,index) => {
            let exact = route.exact ? true : false;
            allRoutes.push(
                <Route
                    exact={exact}
                    path={route.path}
                    component={route.component}
                    key={index}
                    {...this.props}
                />
            );
        })
        return allRoutes;
    }

    render(){
        return <div>{this.renderRoutes(appRoutes)}</div>
    }
}

// Render App to DOM
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-spotify')
);
