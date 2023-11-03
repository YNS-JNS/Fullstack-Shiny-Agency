import { createContext, useState } from 'react';

// 1: Create ThemeContext
export const ThemeContext = createContext();

// 2: Create ThemeProvider
export const ThemeProvider = ({ children }) => {
   // State
   const [theme, setTheme] = useState('light');
   // Func to toggle theme
   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };

   return (
      // 3: Provide the theme context and values to child components
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

// SurveyContext _______________________________
// Create a context for the survey data
export const SurveyContext = createContext();

// Create a provider for the survey context
export const SurveyProvider = ({ children }) => {
   // Define the state for answers and a function to save answers
   const [answers, setAnswers] = useState({});
   // Function to save new answers, merging them with the existing answers
   const saveAnswers = (newAnswers) => {
      setAnswers({ ...answers, ...newAnswers });
   };

   return (
      // Provide the answers state and saveAnswers function to the children
      <SurveyContext.Provider value={{ answers, saveAnswers }}>
         {children}
      </SurveyContext.Provider>
   );
};
