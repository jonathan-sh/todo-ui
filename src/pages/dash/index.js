import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Crud from '../../components/simple-create';
import useStyles from './style';
import Project from '../../components/project'

import axios from '../../util/axios/index';

export default () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState();

    const [projects, setProjects] = useState([]);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const history = useHistory();
    const handlerLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        history.push('/');
    };

    const getProjects = () => {
        axios().get('/project')
               .then(it => {
                   setProjects([]);
                   const foundProjects = it.data;
                   const list = foundProjects.map((it, id) => <Project key={id} project={it} getProjects={getProjects} />);
                   setProjects(list);
               })
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position='absolute' className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                        Simple TODO List
                    </Typography>
                    <div color='inherit'>
                        <Button color='secondary' onClick={handleMenuClick}>
                            {localStorage.getItem('name')}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                        >
                            <MenuItem onClick={handlerLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                <br />
                <Crud
                    path='project'
                    label='New project'
                    title='Creating new project'
                    fields={[
                        { name: 'name', label: 'Project name', type: 'text' },
                    ]}
                    caseCreateFunction={() => {
                        getProjects();
                    }}
                />
                <div className={classes.projects}>
                    {projects}
                </div>    
            </div>

        </div>
    );
}