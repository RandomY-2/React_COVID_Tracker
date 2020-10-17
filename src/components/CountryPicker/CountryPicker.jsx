import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = '011651b063811743ef33ffefd923eccb2e956eca572e1d8b807a3e2338fdd0dc/stage';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

    useEffect(() => {
        alanBtn({
            key: alanKey, 
            onCommand: ({ command, country }) => {
                if (command === 'selectCountry') {
                    handleCountryChange(country);
                }
            }
        })
        
    }, []);
    
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">United States</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;