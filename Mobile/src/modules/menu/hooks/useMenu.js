import { useState } from 'react';

export const useMenu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('Español');

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return {
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
  };
};

export default useMenu;
