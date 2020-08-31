import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '50px',
    marginTop: '5px',
  },
  check:{
    width: '15%',
    float:"left"
  },
  task:{
    width: '75%',
    float:"left"
  },
  delete:{
    width: '10%',
    float:"left"
  }
}));