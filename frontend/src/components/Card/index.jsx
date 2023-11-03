// Importing the PropTypes library
import PropTypes from 'prop-types';
// _____________________________________________________

// Importing CSS and Assets: ___________________________
// Importing Default Picture
import DefaultPicture from '../../assets/profile.png';
// Importing colors
import colors from '../../utils/style/colors';
// _____________________________________________________
import { useTheme } from '../../utils/hooks'; // Using custom hook for theme
// Styled components: __________________________________
// Importing styled-components library
import styled from 'styled-components';
// Label:
const CardLabel = styled.span`
   color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
   font-size: 22px;
   font-weight: normal;
   padding-left: 15px;
   align-self: center;
`;
// Img:
const CardImage = styled.img`
   height: 150px;
   width: 150px;
   align-self: center;
   border-radius: 50%;
`;
// Title span:
const CardTitle = styled.span`
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
   font-size: 22px;
   font-weight: normal;
   align-self: center;
`;
// CardWrapper div:
const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   padding: 15px;
   background-color: ${({ theme }) =>
      theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
   border-radius: 30px;
   width: 300px;
   height: 300px;
   transition: 200ms;
   &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 10px #e2e3e9;
   }
`;
// _____________________________________________________

// Definition of the Card component: ___________________
const Card = ({ label, title, picture }) => {
   const { theme } = useTheme();
   return (
      <CardWrapper theme={theme}>
         <CardLabel theme={theme}>{label}</CardLabel>
         <CardImage src={picture} alt="freelance" />
         <CardTitle theme={theme}>{title}</CardTitle>
      </CardWrapper>
   );
};

// PropTypes: __________________________________________
// Defining the expected types for the props of the Card component
Card.propTypes = {
   label: PropTypes.string.isRequired, // label should be a string and require
   title: PropTypes.string.isRequired,
   picture: PropTypes.string.isRequired,
};

// Defining the default props
Card.defaultProps = {
   label: '',
   title: '',
   picture: DefaultPicture,
};
// _____________________________________________________

export default Card;
