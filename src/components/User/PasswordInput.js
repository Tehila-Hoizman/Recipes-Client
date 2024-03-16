import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
<TextField
  type={showPassword ? 'text' : 'password'}
  required
  fullWidth
  variant="outlined"
  name="password"
  label="סיסמה"
  id="password"
  autoComplete="new-password"
  InputLabelProps={{
    shrink: true,
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePasswordVisibility}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
  );
};

export default PasswordInput;