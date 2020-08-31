import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper:{
       textAlign: 'center',
       backgroundImage: `url('./home.jpg')`,
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
       backgroundSize: 'cover',
       minHeight:'100vh',
       paddingTop: '5%'
    },
    container:{
      backgroundColor:'rgb(255,255,255, 0.9)',
      padding: '2%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    },
}));