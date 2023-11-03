// Importing CSS and Assets: ___________________________
// Importing Style Atoms fro Link
import { StyledLink } from '../../utils/style/Atoms';
// Importing logo
import DarkLogo from '../../assets/dark-logo.png';
import LightLogo from '../../assets/light-logo.png';
// _____________________________________________________
// Importing Link from React router dom library:
import { Link } from 'react-router-dom';
// _____________________________________________________
import { useTheme } from '../../utils/hooks'; // using custom hook for theme
// Styled components: __________________________________
// Importing styled-components library:
import styled from 'styled-components';

// NavContainer nav:
const NavContainer = styled.nav`
   padding: 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

// HomeLogo img:
const HomeLogo = styled.img`
   height: 70px;
`;
// _______________________________________

const Header = () => {
   const { theme } = useTheme();
   return (
      <NavContainer>
         <Link to="/">
            <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
         </Link>
         <div>
            <StyledLink $theme={theme} to="/">
               Accueil
            </StyledLink>
            <StyledLink $theme={theme} to="/freelances">
               Profils
            </StyledLink>
            <StyledLink to="/survey/1" $isFullLink>
               Faire le test
            </StyledLink>
         </div>
      </NavContainer>
   );
};

export default Header;

// _______________________________________
// Nb: Eh bien, cela permet de signaler à  styled-components  que notre prop nous sert pour le style,
// et qu'elle ne doit pas être passée dans le DOM.

// Ce  $  est uniquement nécessaire pour passer une prop si le composant en question est un composant React,
// comme ici pour  Link  (et non un élément HTML). Si mon styled component était basé sur une simple balise  a  ,
// je pourrais totalement utiliser la prop  isFullLink  sans le  $  .
// _______________________________________
