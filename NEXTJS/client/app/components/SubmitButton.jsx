import * as React from 'react';
import Button from '@mui/material/Button';

export default function SubmitButton({ onClick, disabled }) {
  return (
    <Button 
      variant="contained" 
      className="bg-cyan-500" 
      onClick={onClick}
      disabled={disabled}
    >
      Submit
    </Button>
  );
}