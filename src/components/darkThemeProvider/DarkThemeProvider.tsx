'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import CTA from '../CTA/CTA';

const DarkThemeContext = createContext({
  darkTheme: false,
  toggleTheme: () => {},
});

export const useDarkTheme = () => useContext(DarkThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <DarkThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export default ThemeProvider;

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { darkTheme } = useDarkTheme();

  return (
    <div
      className={
        darkTheme
          ? 'dark bg-[#171c1c] text-foreground'
          : 'light bg-background text-copy'
      }
    >
      {children}
    </div>
  );
};

export const ToggleTheme = () => {
  const { darkTheme, toggleTheme } = useDarkTheme();

  return (
    <CTA onClick={toggleTheme} title='Change Theme' className='text-3xl'>
      {darkTheme ? <BiSun /> : <BiMoon />}
    </CTA>
  );
};
