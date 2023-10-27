// Importing CSS and Assets: _________________________
// Importing colors
import colors from '../../utils/style/colors';
// Importing 404 svg:
import NotFound from '../../assets/404.svg';
// _____________________________________________________

// Styled components: __________________________________
// Importing styled-components library
import styled from 'styled-components';
// ErrorWrapper div:
const ErrorWrapper = styled.div`
   margin: 30px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   background-color: ${colors.backgroundLight};
   align-items: center;
`;

// ErrorTitle h1:
const ErrorTitle = styled.h1`
   font-weight: 300;
`;
// ErrorSubtitle h2:
const ErrorSubtitle = styled.h2`
   font-weight: 300;
   color: ${colors.secondary};
`;
// Illustration img:
const Illustration = styled.img`
   max-width: 800px;
`;
// ___________________________________________________

const Error = () => {
   return (
      <ErrorWrapper>
         <ErrorTitle>Oups...</ErrorTitle>
         <Illustration src={NotFound} alt="Not found" />
         <ErrorSubtitle>
            Il semblerait que la page que vous cherchez n’existe pas
         </ErrorSubtitle>
      </ErrorWrapper>
   );
};

export default Error;
