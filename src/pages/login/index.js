import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import SempleCrud from '../../components/simple-create'
import Toast from '../../components/toast';
import useVerify from '../../hooks/useVerify';
import useStyles from './style';
import service from './service';

export default () => {
    const [email, setEmail] = useState('');
    const [emailRef, verifyEmail] = useVerify();

    const [password, setPassword] = useState('');
    const [passwordRef, verifyPassword] = useVerify();

    const [showToast, setShowTost] = useState(false);
    const [toastMsg, setToastMsg] = useState();
    const [toastSevirity, setToastSevirity] = useState('warning');

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.paper}>
            <Container className={classes.container} maxWidth='sm'>
                <Typography component='h1' variant='h5'>Simple TODO List</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        inputRef={emailRef}
                        label='Email'
                        autoComplete='email'
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        autoFocus
                    />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        inputRef={passwordRef}
                        label='Senha'
                        type='password'
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete='current-password'
                        fullWidth
                    />

                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            if (verifyEmail() && verifyPassword()) {
                                service.doLogin(email, password)
                                    .then(() => history.push('/dash'))
                                    .catch(() => {
                                        setToastMsg('Invalid credentials  😕')
                                        setToastSevirity('info');
                                        setShowTost(true);
                                    })
                            }
                        }}
                        className={classes.submit}>
                        Login
                    </Button>
                    <SempleCrud
                        path='user'
                        label='Register'
                        title='New user'
                        fields={
                            [
                                { name: 'name', label: 'Your name', type: 'text' },
                                { name: 'email', label: 'Your best email', type: 'text' },
                                { name: 'password', label: 'The password', type: 'password' }
                            ]
                        }
                        autoClose={false}
                        caseCreateFunction={(form) => {
                            service.doLogin(form.email, form.password)
                                .then(() => history.push('/dash'))
                                .catch(setShowTost(true))
                        }}
                    >
                    </SempleCrud>
                </form>
            </Container>
            <Toast
                open={showToast}
                duration={4}
                onClose={() => setShowTost(false)}
                variant='filled'
                severity={toastSevirity}
                text={toastMsg}
            />
        </div>
    );
}