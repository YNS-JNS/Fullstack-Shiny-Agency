import React from 'react';
import ReactDOM from 'react-dom/client';

// React router dom: ___________________________________
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// _____________________________________________________

// Pages: ______________________________________________
import Home from './pages/Home';
import Survey from './pages/Survey';
import Results from './pages/Results';
import Freelances from './pages/Freelances';

// _____________________________________________________

// Components: _________________________________________
import Header from './components/Header';
import Error from './components/Error';
// _____________________________________________________

// Styled components: __________________________________
// Using Global Style from styled-components library
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle` * {
   font-family: 'Trebuchet MS', Helvetica, sans-serif;
 }

 body {
   margin: 0;
 }`;
// _____________________________________________________

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Router>
         <GlobalStyle />
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey/:questionNumber" element={<Survey />} />
            <Route path="/results" element={<Results />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </Router>
   </React.StrictMode>,
);
