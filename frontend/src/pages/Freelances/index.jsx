import { useEffect, useState } from 'react';

// Importing CSS and Assets: ___________________________
// Importing Card Component
import Card from '../../components/Card';
// Importing colors
import colors from '../../utils/style/colors';
import { Loader, ErrorMsg } from '../../utils/style/Atoms';

// _____________________________________________________

// Styled components: __________________________________
// Importing styled-components library
import styled from 'styled-components';
// CardsContainer div:
const CardsContainer = styled.div`
   display: grid;
   gap: 24px;
   grid-template-rows: 350px 350px;
   grid-template-columns: repeat(2, 1fr);
   align-items: center;
   justify-items: center;
`;

// PageTitle h1:
const PageTitle = styled.h1`
   font-size: 30px;
   color: black;
   text-align: center;
   padding-bottom: 30px;
`;
// PageSubtitle h2:
const PageSubtitle = styled.h2`
   font-size: 20px;
   color: ${colors.secondary};
   font-weight: 300;
   text-align: center;
   padding-bottom: 30px;
`;

const LoaderWrapper = styled.div`
   display: flex;
   justify-content: center;
`;
// _______________________________________

const Freelances = () => {
   const [freelancersList, setFreelancersList] = useState([]);
   const [isDataLoading, setDataLoading] = useState(false);
   const [error, setError] = useState(false);

   // Nb: useEffect  permet de déclencher l’appel API ;
   // et useState  permet de stocker les données qui sont retournées.

   useEffect(() => {
      setDataLoading(true);
      fetch(`http://localhost:8000/freelances`)
         .then((response) => {
            response.json().then(({ freelancersList }) => {
               setFreelancersList(freelancersList);
               setDataLoading(false);
            });
         })
         .catch((error) => {
            console.error('+ Error ==>', error);
            setError(true);
         });
   }, []);

   // If there's an error:
   if (error) {
      return <ErrorMsg>Ooups! il y a eu un problème</ErrorMsg>;
   }

   return (
      <div>
         <PageTitle>Trouvez votre prestataire</PageTitle>
         <PageSubtitle>
            Chez Shiny nous réunissons les meilleurs profils pour vous.
         </PageSubtitle>

         {isDataLoading ? (
            <LoaderWrapper>
               <Loader />
            </LoaderWrapper>
         ) : (
            <CardsContainer>
               {freelancersList.map((profile, index) => (
                  <Card
                     key={`${profile.name}-${index}`}
                     label={profile.job}
                     title={profile.name}
                     picture={profile.picture}
                  />
               ))}
            </CardsContainer>
         )}
      </div>
   );
};

export default Freelances;

// Some data for test:
// const freelanceProfiles = [
//    {
//       name: 'Jane Doe',
//       jobTitle: 'Devops',
//    },
//    {
//       name: 'John Doe',
//       jobTitle: 'Developpeur frontend',
//    },
//    {
//       name: 'Jeanne Biche',
//       jobTitle: 'Développeuse Fullstack',
//    },
// ];
