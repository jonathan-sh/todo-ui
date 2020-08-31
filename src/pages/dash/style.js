import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    projects:{
      with: '100%'
    },  
    toolbar: {
      paddingRight: 24,
    },
    appBar: {
      width: `100%`,
    },
    title: {
      flexGrow: 1,
      color: '#fff'
    },
    body:{
        width:'100%',
        paddingTop:'65px',
        textAlign: 'center',
        display: ''
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  }));