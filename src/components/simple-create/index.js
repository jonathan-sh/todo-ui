import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { get } from 'lodash';

import useVerify from '../../hooks/useVerify';
import axios from '../../util/axios';
import Toast from '../toast';
import useSytle from './style';

const checkers = []
const object = {};
const getForm = (itens) => {
    const form = itens.map(it => {

        const [fieldRef, fieldVerify] = useVerify();
        checkers.push(fieldVerify);
        return (<TextField
            key={it.name}
            variant='outlined'
            margin='normal'
            inputRef={fieldRef}
            label={it.label}
            type={it.type || 'text'}
            onChange={(event) => object[it.name] = event.target.value}
            fullWidth />)
    })

    return (<div> {form} </div>)
}

export default ({ path, label, title, fields, caseCreateFunction, autoClose = true}) => {

    const theme = useTheme();
    const style = useSytle();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [open, setOpen] = useState(false);
    const openModel = () => setOpen(true);
    const closeModel = () => setOpen(false);

    const [alerError, setAlerError] = useState(false);
    const showToast = () => setAlerError(true);
    const [alerErrorMsg, setAlerErrorMsg] = useState('error');

    const salve = () => {
        const isCorrectlyForm = checkers.map(checker => checker())
            .filter(result => result === false)
            .length === 0;
        if (isCorrectlyForm) {
            axios().post(path, object)
                .then(it => { 
                    if(autoClose){
                        closeModel();
                    }
                    caseCreateFunction(object, it);
                    
                })
                .catch(it => {
                    const data = get(it, ['response', 'data']);
                    if (data) {
                        setAlerErrorMsg(data.erro || data.info);
                        showToast(true);
                    }
                })
        }
    };
    return (
        <div>
            <Button fullWidth variant='contained' color='primary' onClick={openModel}>
                <label className={style.white} >{label} </label>
            </Button>
            <Dialog fullScreen={fullScreen} open={open} onClose={closeModel}>

                <DialogTitle>{title}</DialogTitle>

                <DialogContent> {getForm(fields)} </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={closeModel}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={salve} color='primary' className={style.white}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={alerError}
                duration={4}
                onClose={() => setAlerError(false)}
                variant='filled'
                severity='warning'
                text={alerErrorMsg}
            />
        </div>
    );
}