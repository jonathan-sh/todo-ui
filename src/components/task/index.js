import React, { useState } from 'react';
import Checkbox from '@material-ui/icons/CheckBoxOutlineBlank';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/CheckBox';
import Tooltip from '@material-ui/core/Tooltip';

import Ask from '../ask/'
import theme from './style';
import axios from '../../util/axios';


const update = _.debounce((task) => {
    axios().put(`/task/${task._id}`, task)
        .catch(it => {
            const data = _.get(it, ['response', 'data']);
            console.log(data);
        })
}, 500);


export default ({ task, getTasks }) => {
    const style = theme();
    const [name, setName] = useState(task.name);
    const [finished, setFinished] = useState(task.finished);
    const [visible, setVisible] = useState({});
    const [askToDelete, setAskToDelete] = useState(false);

    const remove = () => {
        axios().delete(`/task/${task._id}`)
            .then(() => setVisible({display:'none'}))
            .catch(it => {
                const data = _.get(it, ['response', 'data']);
                console.log(data);
            })
    };

    const maksAsFinished = (task) => {
        task.finished = true;
        axios().put(`/task/${task._id}`, task)
            .then(() => setFinished(true))
            .catch(it => {
                const data = _.get(it, ['response', 'data']);
                console.log(data);
            })
    };

    const getDataFormated = () => {
        const date = new Date(task.updatedAt).toLocaleString();
        return `finished at: ${date}`;
    };

    return (
        <div className={style.root} style={visible}>
            {
                task.finished ?
                    <DoneIcon className={style.check} />
                    :
                    <label className={style.check}>
                        <IconButton component="span" onClick={() => maksAsFinished(task, getTasks)}>
                            <Checkbox checked={task.finished} />
                        </IconButton>
                    </label>

            }
            <Tooltip title={finished ? getDataFormated(task) : ''} placement="right">
                <TextField
                    value={name}
                    fullWidth
                    disabled={finished}
                    className={style.task}
                    onChange={(event) => {
                        const value = event.target.value;
                        task.name = value;
                        setName(value);
                        update(task);
                    }}
                />
            </Tooltip>

            {
                finished ?
                    <div />
                    :
                    <label className={style.delete}>
                        <IconButton component="span" onClick={() => setAskToDelete(true)}>
                            <Delete />
                        </IconButton>
                    </label>
            }
            <Ask 
                open={askToDelete}
                text={'Do you want delete this task?'}
                detail={task.name}
                yesFunction={() => {
                    remove();
                    setAskToDelete(false);
                }}
                noFunction={() => setAskToDelete(false)}
            />
        </div>
    );
}