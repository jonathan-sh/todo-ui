import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { get } from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';

import Tost from '../toast';
import axios from '../../util/axios';
import Task from '../task';
import theme from './style';
import Ask from '../ask/'

const update = _.debounce((projetc) => {
    axios().put(`/project/${projetc._id}`, projetc)
        .catch(it => {
            const data = _.get(it, ['response', 'data']);
            console.log(data);
        })
}, 500);

export default ({ project, getProjects }) => {
    const style = theme();
    const [tostMsg, setTostMsg] = useState('');
    const [tostSeverity, setTostSeverity] = useState('info');
    const [showTost, setShowTost] = useState(false);

    const [tasks, setTasks] = useState([]);
    const newTaskRef = useRef(null);
    const [newTask, setNewTask] = useState();
    const [projectName, setProjecName] = useState(project.name);

    const [askToDelete, setAskToDelete] = useState(false);


    const [visible, setVisible] = useState({});
    const remove = () => {
        axios().delete(`/project/${project._id}`)
            .then(() => setVisible({ display: 'none' }))
            .catch(it => {
                const data = _.get(it, ['response', 'data']);
                console.log(data);
            })
    };

    const createNewTask = () => {
        if (newTask && newTask !== "") {
            const task = { name: newTask, project_id: project._id };
            axios().post('/task', task)
                .then(() => {
                    setNewTask('');
                    getTasks();
                    newTaskRef.current.focus();
                })
                .catch(it => {
                    const data = get(it, ['response', 'data']);
                    if (data) {
                        setTostMsg(data.erro || data.info);
                        setTostSeverity('warning');
                        setShowTost(true);
                    }
                })
        } else {
            setTostMsg('the task should have a text, right? 🤔');
            setShowTost(true);
        }
    };

    const getTasks = () => {
        axios().get(`/task/${project._id}`)
            .then(response => {
                setTasks([]);
                const foundTaks = response.data;
                const all = foundTaks.map((task, id) => <Task key={id} task={task} getTasks={getTasks} />)
                setTasks(all);
            })
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className={style.root} style={visible}>

            <div className={style.lineTop}>
                <TextField
                    variant='outlined'
                    label={'project name'}
                    fullWidth
                    value={projectName}
                    className={style.projectName}
                    onChange={(event) => {
                        const value = event.target.value
                        project.name = value;
                        setProjecName(value);
                        update(project);
                    }} />
                <label className={style.deleteProject}>
                    <IconButton onClick={() => setAskToDelete(true)}>
                        <Delete />
                    </IconButton>
                </label>
            </div>
            <br />

            {tasks}

            <br />
            <div className={style.lineBottom}>
                <TextField
                    fullWidth
                    inputRef={newTaskRef}
                    value={newTask}
                    className={style.taskName}
                    placeholder={'type the new task here'}
                    onChange={(event) => {
                        const value = event.target.value;
                        setNewTask(value);
                    }} />

                <label className={style.newTask}>
                    <IconButton onClick={createNewTask}>
                        <Tooltip title='create the task' aria-label='add'>
                            <AddIcon />
                        </Tooltip>
                    </IconButton>
                </label>
            </div>

            <Tost
                open={showTost}
                duration={4}
                onClose={() => setShowTost(false)}
                variant='filled'
                severity={tostSeverity}
                text={tostMsg}
            />

            <Ask
                open={askToDelete}
                text={'Do you want delete this project?'}
                detail={project.name}
                yesFunction={() => remove()}
                noFunction={() => setAskToDelete(false)}
            />
        </div>
    );
}