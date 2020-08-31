import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '450px',
    maxWidth:'450px',
    margin: '2% 0% 0% 2%',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '3% 2% 2% 2%',
    borderRadius:'3%',
    float:'left'
  },
  lineTop:{
    width: '100%',
    height: '50px'
  },
  projectName:{
    width: '90%',
    float:'left'
  },
  deleteProject:{
    width: '10%',
    float:'left'
  },
  lineBottom:{
    width: '100%',
    height:'50px',
  },
  taskName:{
    width: '90%',
    float:'left'
  },
  newTask:{
    width: '10%',
    float:'left'
  },
}));