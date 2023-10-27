// Importing from React router dom: ______
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//__
import colors from '../../utils/style/colors';
import { Loader, ErrorMsg } from '../../utils/style/Atoms';
//__

// Styled components: __________________________________
// Importing styled-components library:
import styled from 'styled-components';
// SurveyContainer div:
const SurveyContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

// QuestionTitle h2:
const QuestionTitle = styled.h2`
   text-decoration: underline;
   text-decoration-color: ${colors.primary};
`;

// QuestionContent span:
const QuestionContent = styled.span`
   margin: 30px;
`;

// LinkWrapper div:
const LinkWrapper = styled.div`
   padding-top: 30px;
   & a {
      color: black;
   }
   & a:first-of-type {
      margin-right: 20px;
   }
`;

// _____________________________________________________

const Survey = () => {
   // ____________________________________
   // Get parametre from url:
   const { questionNumber } = useParams();

   // Trt: _______________________________
   // coder un lienprécédentet un liensuivant:
   // convert to int
   const questNumToInt = parseInt(questionNumber);
   // Si la question actuelle est à 1, le lien “précédent” reste sur la question 1
   // OTHERWISE WE DO THE DECREMENTATION BY 1
   const prevQuestNum = questNumToInt === 1 ? 1 : questNumToInt - 1;
   // INCREMENTATION BY 1
   const nextQuestNum = questNumToInt + 1;
   // _____________________________________
   const [surveyData, setSurveyData] = useState({});
   const [isDataLoading, setDataLoading] = useState(false);
   const [error, setError] = useState(false);

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

   // d'autre method: __________________________________________________
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

   useEffect(() => {
      setDataLoading(true);
      fetch(`http://localhost:8000/survey`)
         .then((response) =>
            response.json().then(({ surveyData }) => {
               setSurveyData(surveyData);
               setDataLoading(false);
            }),
         )
         .catch((error) => {
            console.log('+ Error ==>', error);
            setError(true);
         });
   }, []);

   // If there's an error:
   if (error) {
      return <ErrorMsg>Ooups! il y a eu un problème</ErrorMsg>;
   }

   return (
      <SurveyContainer>
         <QuestionTitle>Question {questionNumber}</QuestionTitle>
         {/* To fetch data  */}
         {isDataLoading ? (
            <Loader />
         ) : (
            <QuestionContent> {surveyData[questionNumber]} </QuestionContent>
         )}
         <LinkWrapper>
            <Link to={`/survey/${prevQuestNum}`}>Précédent</Link>
            {surveyData[questNumToInt] + 1 ? (
               <Link to={`/survey/${nextQuestNum}`}>Suivant</Link>
            ) : (
               <Link to={`/results`}>Résultats</Link>
            )}
         </LinkWrapper>
      </SurveyContainer>
   );
};

export default Survey;
