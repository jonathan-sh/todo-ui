import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default (props) => {
    return (
    <Snackbar  {...props} autoHideDuration={props.duration * 1000}>
        <MuiAlert {...props}>
            {props.text}
        </MuiAlert>
    </Snackbar>)
}