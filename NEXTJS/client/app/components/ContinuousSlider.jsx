import * as React from 'react';
import Slider from '@mui/material/Slider';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochre: {
      primary:"red"
    },
  },
});


export default function ContinuousSlider() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
        <Slider aria-label="Volume" value={value} onChange={handleChange} sx={{ width: 300, color: '#06b6d4' }} />
  );
}
