import Card from '../../components/Card'; // Importing Card Component
import colors from '../../utils/style/colors'; // Importing colors
import { Loader, ErrorMsg } from '../../utils/style/Atoms'; // Importing custom style components
import styled from 'styled-components'; // Importing styled-components for styling
import { useFetch, useTheme } from '../../utils/hooks'; // Importing a custom hook for data fetching

// Defining styled components:
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
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;
// PageSubtitle h2:
const PageSubtitle = styled.h2`
   font-size: 20px;
   color: ${colors.secondary};
   font-weight: 300;
   text-align: center;
   padding-bottom: 30px;
   color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const LoaderWrapper = styled.div`
   display: flex;
   justify-content: center;
`;
// _______________________________________

const Freelances = () => {
   // Get useTheme custom hook for context:
   const { theme } = useTheme();
   // _____________________________________

   // Using the custom 'useFetch' hook to fetch freelances data from API:
   const { data, isLoading, error } = useFetch(
      `http://localhost:8000/freelances`,
   );

   // Ici le "?" permet de s'assurer que data existe bien.
   // Vous pouvez en apprendre davantage sur cette notation ici :
   // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
   //   const freelancersList = data?.freelancersList
   // Or use this: -- -- --
   // Destructuring the data object to extract the freelancersList property:
   const { freelancersList } = data; // This assumes that the data object returned from the API contains a property named freelancersList. If this property exists in the response data, it will be assigned to the freelancersList variable.

   // _____________________________________

   // handling errors:
   if (error) {
      return <ErrorMsg>Ooups! il y a eu un problème</ErrorMsg>;
   }

   return (
      <div>
         <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
         <PageSubtitle theme={theme}>
            Chez Shiny nous réunissons les meilleurs profils pour vous.
         </PageSubtitle>

         {isLoading ? (
            <LoaderWrapper>
               {/* <Loader theme={theme} /> */}
               <Loader />
            </LoaderWrapper>
         ) : (
            <CardsContainer>
               {freelancersList &&
                  freelancersList.map((profile, index) => (
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

// _______________________________________

// const [freelancersList, setFreelancersList] = useState([]);
// const [isDataLoading, setDataLoading] = useState(false);
// const [error, setError] = useState(false);

// Nb: useEffect  permet de déclencher l’appel API ;
// et useState  permet de stocker les données qui sont retournées.

// useEffect(() => {
//    setDataLoading(true);
//    fetch(`http://localhost:8000/freelances`)
//       .then((response) => {
//          response.json().then(({ freelancersList }) => {
//             setFreelancersList(freelancersList);
//             setDataLoading(false);
//          });
//       })
//       .catch((error) => {
//          console.error('+ Error ==>', error);
//          setError(true);
//       });
// }, []);

// _______________________________________

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

// _______________________________________
