import React, { useContext } from 'react';
import { SurveyContext } from '../../utils/context';
import { useFetch, useFormatFetchParams, useTheme } from '../../utils/hooks';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { ErrorMsg, Loader, StyledLink } from '../../utils/style/Atoms';

// Defining styled components:
// Styling for the Results container
const ResultsContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 60px 90px;
   padding: 30px;
   background-color: ${({ theme }) =>
      theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
   border-radius: 15px;
`;

// Styling for the Results Title
const ResultsTitle = styled.h2`
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
   font-weight: bold;
   font-size: 28px;
   max-width: 60%;
   text-align: center;
   & > span {
      padding-left: 10px;
   }
`;

// Styling for Job Title span
const JobTitle = styled.span`
   color: ${({ theme }) =>
      theme === 'light' ? colors.primary : colors.backgroundLight};
   text-transform: capitalize;
`;

// Styling for Description Wrapper div
const DescriptionWrapper = styled.div`
   padding: 60px;
`;

// Styling for Job Description ddiv
const JobDescription = styled.div`
   font-size: 18px;
   & > p {
      color: ${({ theme }) =>
         theme === 'light' ? colors.secondary : '#ffffff'};
      margin-block-start: 5px;
   }
   & > span {
      font-size: 20px;
   }
`;

// Styling for Loader Wrapper div
const LoaderWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

// _______________________________________

const Results = () => {
   // _______________________________________
   // Get Theme from useTheme custom hook
   const { theme } = useTheme();
   // _______________________________________
   // Get answers object from Context SurveyContext
   const { answers } = useContext(SurveyContext);
   // _______________________________________

   // Using the custom 'useFormatFetchParams' hook to format fetch params:
   const fetchParams = useFormatFetchParams(answers); // Example Output: a1=true&a2=false&a3=true&a4=true&a5=false&a6=false

   // Using the custom 'useFetch' hook to fetch freelances data from API:
   const { data, isLoading, error } = useFetch(
      `http://localhost:8000/results/?/results/?${fetchParams}`, // Example: http://localhost:8000/results/?/results/?a1=true&a2=false&a3=true&a4=true&a5=false&a6=false
   );

   const resultsData = data?.resultsData;
   // console.log('=== Answers ===', answers);
   // console.log('=== Data ===', data);
   // _______________________________________

   // Handling errors
   if (error) {
      return <ErrorMsg>Ooups! il y a eu un problème</ErrorMsg>;
   }
   // _______________________________________

   return isLoading ? (
      <LoaderWrapper>
         <Loader />
      </LoaderWrapper>
   ) : (
      <ResultsContainer theme={theme}>
         <ResultsTitle theme={theme}>
            Les compétences dont vous avez besoin :
            {resultsData &&
               resultsData.map((result, index) => (
                  <JobTitle
                     theme={theme}
                     key={`result-title-${index}-${result.title}`}
                  >
                     {result.title}
                     {/* Separator  */}
                     {index === resultsData.length - 1 ? '' : ','}
                  </JobTitle>
               ))}
         </ResultsTitle>
         <StyledLink $isFullLink to="/freelances">
            Découvrez nos profils
         </StyledLink>
         <DescriptionWrapper>
            {resultsData &&
               resultsData.map((result, index) => (
                  <JobDescription
                     theme={theme}
                     key={`result-detail-${index}-${result.title}`}
                  >
                     <JobTitle theme={theme}> {result.title} </JobTitle>
                     <p> {result.description} </p>
                  </JobDescription>
               ))}
         </DescriptionWrapper>
      </ResultsContainer>
   );
};

export default Results;
