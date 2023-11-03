// import { useContext } from 'react';
// import { ThemeContext } from '../../utils/context';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { useTheme } from '../../utils/hooks';

const FooterContainer = styled.footer`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   padding-top: 60px;
   padding-bottom: 60px;
`;

const NightModeButton = styled.button`
   background-color: transparent;
   border: none;
   cursor: pointer;
   color: ${colors.secondary};
`;

const Footer = () => {
   // _______________________________________

   // Get values from ThemeContext
   // const { toggleTheme, theme } = useContext(ThemeContext);

   // Here we have replaced ThemeContext with the useTheme custom hook
   const { toggleTheme, theme } = useTheme();

   // _______________________________________

   return (
      <FooterContainer>
         <NightModeButton onClick={() => toggleTheme()}>
            Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
         </NightModeButton>
      </FooterContainer>
   );
};

export default Footer;
