import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

export default ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('token') ? (children) :
                (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}