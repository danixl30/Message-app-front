import { useState } from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },  
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '11.5em',
    margin: theme.spacing(1),
  },
  input:{
    color:'#ffff',
      //border:'1px solid #EC6802',
    '&:hover': {
    color: '#F2AA10 !important',
    },
    '&:before': {
    borderBottomColor: '#F2AA10 !important',
    },
    '&:hover:before': {
        borderBottomColor: '#F2AA10',
    },
    '&:after': {
        borderBottomColor: '#F2AA10',
    },
    '& .MuiTextField-root':{
        color:'#ffff',          
    }
  }
}));

const PasswordInput = (props) => {
    const [values, setValues] = useState({ showPassword: false });
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
           <FormControl style={{marginTop:10}} className={classes.textField} variant="filled">
                <InputLabel style={{color: '#F2AA10'}} htmlFor="standard-adornment-password">{props.label}</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={props.value}
                    onChange={props.onChangePass}
                    name={props.name}
                    className={classes.input}
                    onKeyPress={props.onKeyPress}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        style={{color: '#F2AA10'}}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl> 
        </>
    )
}

export default PasswordInput;