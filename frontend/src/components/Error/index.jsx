// Importing CSS and Assets: _________________________
// Importing colors
import colors from '../../utils/style/colors';
// Importing 404 svg:
import NotFound from '../../assets/404.svg';
// _____________________________________________________
import { useTheme } from '../../utils/hooks'; // Using custom hook for theme
// Styled components: __________________________________
// Importing styled-components library
import styled from 'styled-components';
// ErrorWrapper div:
const ErrorWrapper = styled.div`
   margin: 30px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   background-color: ${({ theme }) =>
      theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
   align-items: center;
`;

// ErrorTitle h1:
const ErrorTitle = styled.h1`
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
   font-weight: 300;
`;
// ErrorSubtitle h2:
const ErrorSubtitle = styled.h2`
   font-weight: 300;
   color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
`;
// Illustration img:
const Illustration = styled.img`
   max-width: 800px;
`;
// ___________________________________________________

const Error = () => {
   const { theme } = useTheme();
   return (
      <ErrorWrapper theme={theme}>
         <ErrorTitle theme={theme}>Oups...</ErrorTitle>
         <Illustration src={NotFound} alt="Not found" />
         <ErrorSubtitle theme={theme}>
            Il semblerait que la page que vous cherchez n’existe pas
         </ErrorSubtitle>
      </ErrorWrapper>
   );
};

export default Error;
