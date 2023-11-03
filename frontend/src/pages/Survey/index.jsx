import { Link, useParams } from 'react-router-dom'; // Importing routing-related components
import { useContext } from 'react'; // Importing the useContext hook
import { SurveyContext } from '../../utils/context'; // Importing the SurveyContext
import colors from '../../utils/style/colors'; // Importing colors
import { Loader, ErrorMsg } from '../../utils/style/Atoms'; // Importing custom style components
import { useFetch, useTheme } from '../../utils/hooks'; // Importing a custom hook for data fetching
import styled from 'styled-components'; // Importing styled-components for styling

// Defining styled components:
// Styling for the survey container
const SurveyContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

// Styling for the question title
const QuestionTitle = styled.h2`
   text-decoration: underline;
   text-decoration-color: ${colors.primary};
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

// Styling for the question content
const QuestionContent = styled.span`
   margin: 30px;
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

// Styling for the link wrapper
const LinkWrapper = styled.div`
   padding-top: 30px;
   & a {
      color: color: ${({ theme }) =>
         theme === 'light' ? '#000000' : '#ffffff'};;
   }
   & a:first-of-type {
      margin-right: 20px;
   }
`;

// Styling for reply boxes
const ReplyBox = styled.button`
   border: none;
   height: 100px;
   width: 300px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: ${({ theme }) =>
      theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
   border-radius: 30px;
   cursor: pointer;
   box-shadow: ${(props) =>
      props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
   &:first-child {
      margin-right: 15px;
   }
   &:last-of-type {
      margin-left: 15px;
   }
`;

// Styling for the reply wrapper
const ReplyWrapper = styled.div`
   display: flex;
   flex-direction: row;
`;
// _____________________________________________________

// Survey component
const Survey = () => {
   const { theme } = useTheme();
   // ____________________________________
   // Extracting the 'questionNumber' parameter from the URL
   const { questionNumber } = useParams();
   // Calculating previous and next question numbers
   const questNumToInt = parseInt(questionNumber); // convert it to int
   // Si la question actuelle est à 1, le lien “précédent” reste sur la question 1
   // OTHERWISE WE DO THE DECREMENTATION BY 1
   const prevQuestNum = questNumToInt === 1 ? 1 : questNumToInt - 1;
   // INCREMENTATION BY 1
   const nextQuestNum = questNumToInt + 1;

   // _____________________________________

   // Accessing values provided by the SurveyContext:
   // extracting answers and saveAnswers from the context, which were defined in the SurveyProvider:
   const { answers, saveAnswers } = useContext(SurveyContext);
   // Saving answers: answer => true (Oui) or false (Non)
   const saveReply = (answer) => {
      saveAnswers({ [questionNumber]: answer }); // Output => 1: true or 1: false
   };

   // _____________________________________

   // Using the custom 'useFetch' hook to fetch survey data:
   const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`);
   const surveyData = data?.surveyData; // Checking if survey data exists
   // Or: // const { surveyData } = data;
   // console.log('===surveyData===', surveyData);

   // _____________________________________

   // Handling errors
   if (error) {
      return <ErrorMsg>Ooups! il y a eu un problème</ErrorMsg>;
   }

   return (
      <SurveyContainer>
         <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
         {/* To fetch data  */}
         {isLoading ? (
            <Loader />
         ) : (
            <QuestionContent theme={theme}>
               {surveyData[questionNumber]}
            </QuestionContent>
         )}
         <ReplyWrapper>
            <ReplyBox
               theme={theme}
               onClick={() => saveReply(true)}
               isSelected={answers[questionNumber] === true}
            >
               Oui
            </ReplyBox>
            <ReplyBox
               theme={theme}
               onClick={() => saveReply(false)}
               isSelected={answers[questionNumber] === false}
            >
               Non
            </ReplyBox>
         </ReplyWrapper>
         <LinkWrapper theme={theme}>
            <Link to={`/survey/${prevQuestNum}`}>Précédent</Link>
            {surveyData && surveyData[questNumToInt] + 1 ? (
               <Link to={`/survey/${nextQuestNum}`}>Suivant</Link>
            ) : (
               <Link to={`/results`}>Résultats</Link>
            )}
         </LinkWrapper>
      </SurveyContainer>
   );
};

export default Survey;

// __________________________________________________________________
// Cette syntaxe permet aussi bien de faire des calls API.
// Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
// Comme la fonction passée à useEffect ne peut pas être asynchrone,
// il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.

// const fetchData = async () => {
//    try {
//       const response = await fetch(`http://localhost:8000/survey`);
//       const { surveyData } = await response.json();
//       setSurveyData(surveyData);
//    } catch (error) {
//       console.log('Oops ! Somthing wrong !');
//    }
// };

// useEffect(() => {
// setDataLoading(true);
// fetchData();
// setDataLoading(false);
// }, []);

// Creating a function inside useEffect hooks: __________________________________________________
// useEffect(() => {
//    // Creating Func:
//    const fetchSurveyData = async () => {
//    setDataLoading(true);
//       try {
//          const response = await fetch(`http://localhost:8000/survey`);
//          const { surveyData } = await response.json();
//          setSurveyData(surveyData);
//       } catch (error) {
//          console.log('Oops ! Somthing wrong !');
//          setError(true);
//       } finally {
//          setDataLoading(false);
//       }
//    };
//    // Calling Func:
//    fetchSurveyData();
// }, []);

// __________________________________________________________________
// Using Promises:
// useEffect(() => {
//    setDataLoading(true);
//    fetch(`http://localhost:8000/survey`)
//       .then((response) =>
//          response.json().then(({ surveyData }) => {
//             setSurveyData(surveyData);
//             setDataLoading(false);
//          }),
//       )
//       .catch((error) => {
//          console.log('+ Error ==>', error);
//          setError(true);
//       });
// }, []);
// __________________________________________________________________
