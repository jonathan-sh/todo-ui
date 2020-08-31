import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './../theme';
import Login from '../pages/login';
import Dash from '../pages/dash';
import PrivateRoute from './PrivateRoute';

export default () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Login />
                    </Route>
                    <PrivateRoute path='/dash'>
                        <Dash />
                    </PrivateRoute>
                </Switch>
            </Router>
        </ThemeProvider>);
}
