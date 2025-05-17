import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '../Button/Button';

import makes from './typesHomes.json';
import f from './Filter.module.scss';

const muiTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: '14px',
        },
        popper: {
          '& .MuiAutocomplete-listbox': {
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(18, 20, 23, 0.05)',
              borderRadius: '10px',
            },
          },
        },
        option: {
          color: 'rgba(18, 20, 23, 0.2)',
          fontWeight: '500',
          '&:hover': {
            color: 'black',
          },
        },
      },
    },
  },
});

export const Filter = () => {
  const [typesHomes, setTypesHomes] = useState(null);
  const [Price, setPrice] = useState(null);
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  const filterData = { Price, typesHomes, minYear, maxYear };

  const generatePriceArr = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      value: (index + 10) * 1000,
      label: `${(index + 10) * 1000}₴`,
    }));
  };
  const priceOptions = generatePriceArr();

  return (
    <div className={f.container}>
      <div>
        <p className={f.caption}>House type</p>
        <ThemeProvider theme={muiTheme}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={makes}
            onChange={(_e, value) => {
              setTypesHomes(value);
            }}
            sx={{
              width: 224,
              backgroundColor: '#F7F7FB',
              borderRadius: '14px',
              border: 'none',
              button: {
                width: '24px',
                justifyContent: 'flex-end',
              },
              label: { color: 'var(--prim-black-color)' },
              fieldset: { padding: '0px', border: 'none' },
            }}
            renderInput={params => {
              return <TextField {...params} label="Types" />;
            }}
          />
        </ThemeProvider>
      </div>
      <div className={f.labelWrapper}>
        <p className={f.caption}>Price/ 1 month</p>
        <ThemeProvider theme={muiTheme}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={priceOptions}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(_e, value) => {
              setPrice(value);
            }}
            sx={{
              width: 125,
              backgroundColor: '#F7F7FB',
              borderRadius: '14px',
              border: 'none',
              button: {
                width: '24px',
                justifyContent: 'flex-end',
              },
              label: { color: 'var(--prim-black-color)', paddingLeft: '25px' },
              fieldset: { padding: '0px', border: 'none' },
              '.MuiOutlinedInput-root .MuiAutocomplete-input': {
                padding: '7.5px 4px 7.5px 25px',
              },
            }}
            renderInput={params => <TextField {...params} label="₴" />}
          />
        </ThemeProvider>
        <span className={f.inputAdditionText}>To</span>
      </div>
      <div className={f.mileageWrap}>
        <p className={f.caption}>House years</p>
        <div className={f.mileage}>
          <div>
            <span>From</span>
            <input
              type="text"
              pattern="[0-9]*"
              maxLength="4"
              value={minYear}
              onChange={e => {
                setMinYear(e.target.value);
              }}
            />
          </div>
          <div>
            <span>To</span>
            <input
              type="text"
              pattern="[0-9]*"
              maxLength="4"
              value={maxYear}
              onChange={e => {
                setMaxYear(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <Button text="Search" filterData={filterData} />
    </div>
  );
};
