"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('kk');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    } else {
      localStorage.setItem('locale', 'kk');
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
      <LocaleContext.Provider value={{ locale, changeLocale }}>
        {children}
      </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);