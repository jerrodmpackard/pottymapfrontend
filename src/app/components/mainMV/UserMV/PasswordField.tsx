import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { Ref } from 'react';

interface PasswordFieldProps {
  passwordRef: Ref<HTMLInputElement>; 
  id?: string;
  label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({passwordRef, id='password', label='Password'}) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClick = () => {
      setShowPassword(!showPassword)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    }


  return (
    <TextField
    autoFocus
    margin='normal'
    variant='outlined'
    id={id}
    label={label}
    type='text'
    fullWidth
    inputRef={passwordRef}
    inputProps={{minLength:6}}
    required
    InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
          <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
            
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
        )
    }}
    >
        
    </TextField>
  )
}

export default PasswordField