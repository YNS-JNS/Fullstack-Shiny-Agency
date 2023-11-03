// Importing CSS and Assets: ___________________________
import colors from '../../utils/style/colors';
import { StyledLink } from '../../utils/style/Atoms';
import HomeIllustration from '../../assets/home-illustration.svg';
import { useTheme } from '../../utils/hooks';
// _____________________________________________________

// Styled components: __________________________________
// Importing styled-components library:
import styled from 'styled-components';

// HomeWrapper div:
const HomeWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

// HomeContainer div:
const HomeContainer = styled.div`
   background-color: ${({ theme }) =>
      theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
   margin: 30px;
   padding: 60px 90px;
   display: flex;
   flex-direction: row;
   max-width: 1200px;
   border-radius: 15px;
`;

// LeftCol div:
const LeftCol = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   flex: 1;
   ${StyledLink} {
      max-width: 250px;
   }
`;

// StyledTitle h2:
const StyledTitle = styled.h2`
   padding-bottom: 30px;
   max-width: 280px;
   line-height: 50px;
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

// Illustration img:
const Illustration = styled.img`
   flex: 1;
`;

// _______________________________________

const Home = () => {
   const { theme } = useTheme();
   return (
      <HomeWrapper>
         <HomeContainer theme={theme}>
            <LeftCol>
               <StyledTitle theme={theme}>
                  Repérez vos besoins, on s’occupe du reste, avec les meilleurs
                  talents
               </StyledTitle>
               <StyledLink to="/survey/1" $isFullLink>
                  Faire le test
               </StyledLink>
            </LeftCol>
            <Illustration src={HomeIllustration} />
         </HomeContainer>
      </HomeWrapper>
   );
};

export default Home;
