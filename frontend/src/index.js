import React from 'react';
import ReactDOM from 'react-dom/client';

// React router dom: ___________________________________
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages: ______________________________________________
import Home from './pages/Home';
import Survey from './pages/Survey';
import Results from './pages/Results';
import Freelances from './pages/Freelances';
// Components: _________________________________________
import Header from './components/Header';
import Error from './components/Error';
// _____________________________________________________
// Importing Global style
import GlobalStyle from './utils/style/GlobalStyle';
// Importing Context Providers:
import { SurveyProvider, ThemeProvider } from './utils/context';
import Footer from './components/Footer';
// _____________________________________________________

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Router>
         {/* Wrapping context providers */}
         <ThemeProvider>
            <SurveyProvider>
               <GlobalStyle />
               <Header />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/survey/:questionNumber" element={<Survey />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/freelances" element={<Freelances />} />
                  <Route path="*" element={<Error />} />
               </Routes>
               <Footer />
            </SurveyProvider>
         </ThemeProvider>
      </Router>
   </React.StrictMode>,
);
