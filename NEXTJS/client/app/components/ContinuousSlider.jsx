import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function ContinuousSlider({ value, onChange }) {
  return (
    <Slider 
      aria-label="Confidence" 
      value={value} 
      onChange={onChange} 
      sx={{ color: '#06b6d4' }} 
    />
  );
}