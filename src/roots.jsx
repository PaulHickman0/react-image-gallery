import React, { Component } from 'react';
import { 
    HashRouter as Router, 
    Switch, 
    Route
} from 'react-router-dom';

import Home from 'pages/home';
import Album from 'pages/album';

export default class Routes extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/album/:albumId" component={Album} />
                </Switch>
            </Router>
        );
    }
}