// Importing Link from React router dom library:
import { Link } from 'react-router-dom';
// Importing styled-components library:
import styled, { keyframes } from 'styled-components';
// Importing clors
import colors from './colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
   padding: 10px;
   border: 6px solid ${colors.primary};
   border-bottom-color: transparent;
   border-radius: 22px;
   animation: ${rotate} 1s infinite linear;
   height: 0;
   width: 0;
`;

// Link:
export const StyledLink = styled(Link)`
   padding: 10px 15px;
   color: ${colors.secondary};
   text-decoration: none;
   font-size: 18px;
   text-align: center;
   ${(props) =>
      props.$isFullLink &&
      `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`;

// ErrorMsg span:
export const ErrorMsg = styled.span`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-size: 32px;
`;
