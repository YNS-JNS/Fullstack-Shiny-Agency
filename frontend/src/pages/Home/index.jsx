// Importing CSS and Assets: ___________________________
import colors from '../../utils/style/colors';
import { StyledLink } from '../../utils/style/Atoms';
import HomeIllustration from '../../assets/home-illustration.svg';
// _____________________________________________________

// Styled components: __________________________________
// Importing styled-components library:
import styled from 'styled-components';

// HomeWrapper div:
const HomeWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

// HomeContainer dov:
const HomeContainer = styled.div`
   margin: 30px;
   background-color: ${colors.backgroundLight};
   padding: 60px 90px;
   display: flex;
   flex-direction: row;
   max-width: 1200px;
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
`;

// Illustration img:
const Illustration = styled.img`
   flex: 1;
`;

// _______________________________________

const Home = () => {
   return (
      <HomeWrapper>
         <HomeContainer>
            <LeftCol>
               <StyledTitle>
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
