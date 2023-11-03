import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context';

export const useFetch = (url) => {
   // State variables to manage data fetching
   const [data, setData] = useState({}); // To store the fetched data
   const [isLoading, setLoading] = useState(true); // To indicate if data is currently being loaded
   const [error, setError] = useState(false); // To indicate if an error occurred during fetching

   useEffect(() => {
      // 1: Checking URL is providing
      if (!url) return;

      // Set isLoading to true to indicate data fetching has started
      setLoading(true);

      // Define an asynchronous function to fetch data
      const fetchData = async () => {
         try {
            // Fetch data from the provided URL
            const response = await fetch(url);
            // Parse the response body as JSON and store it in the data state
            const data = await response.json();
            setData(data);
         } catch (error) {
            // If an error occurs during fetching, log the error and set the error state to true
            console.log('+ error: +', error);
            setError(true);
         } finally {
            // Whether successful or not, set isLoading to false to indicate data fetching is complete
            setLoading(false);
         }
      };

      // Invoke the fetchData function
      fetchData();
   }, [url]);

   // Return an object with isLoading, data, and error for the component using this hook
   return { isLoading, data, error };

   // Nb:
   // data: This property holds the data fetched from the API.
   // isLoading: This property is a boolean indicating whether data is currently being loaded.
   // error: This property is a boolean indicating whether an error occurred during the data fetching process.

   // _________________________
   // useEffect(() => {
   //    setLoading(true);
   //    fetch(url)
   //       .then((response) =>
   //          response.json().then(({ data }) => {
   //             setData(data);
   //             setLoading(false);
   //          }),
   //       )
   //       .catch((error) => {
   //          console.log('+ Error ==>', error);
   //          setError(true);
   //       });
   //    // setLoading(false);
   // }, [url]);
   // _________________________
};

// _______________________________________

// useTheme custom hook: (  dark  ou light  )
export const useTheme = () => {
   const { toggleTheme, theme } = useContext(ThemeContext); // Get theme from Context
   return { toggleTheme, theme };
};

// _______________________________________

// useFormatFetchParams custom hook:
export const useFormatFetchParams = (answers) => {
   // 1:
   const answerNumbers = Object.keys(answers);

   // 2:
   return answerNumbers.reduce((previousParams, answerNumber, index) => {
      const isFirstParam = index === 0;
      const separator = isFirstParam ? '' : '&';

      return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
   }, '');

   // Explication pour cette fonction : __________________________________________________________
   /*
   La fonction formatFetchParams est utilisée pour formater un objet d'answers en une chaîne de requête (query string)
   que vous pourriez utiliser pour une requête HTTP GET, généralement pour l'envoi de données à un serveur.

   Voici une explication de cette fonction :

   const answerNumbers = Object.keys(answers):
   Cette ligne crée un tableau (answerNumbers) contenant les clés (noms) de toutes les propriétés dans l'objet answers.
   Ces clés sont essentiellement les numéros de réponse.

   return answerNumbers.reduce((previousParams, answerNumber, index) => { ... }:
   C'est une utilisation de la méthode reduce sur le tableau answerNumbers.
   La méthode reduce prend une fonction de rappel et un point de départ (dans ce cas, une chaîne vide '').
   Elle parcourt le tableau et accumule les résultats à partir du point de départ.

   Dans la fonction de rappel, previousParams représente la valeur accumulée précédente (initialement une chaîne vide),
   answerNumber est la clé de réponse actuelle, et index est l'indice de cette réponse dans le tableau answerNumbers.

   const isFirstParam = index === 0 :
   Cela vérifie si nous sommes au tout début de la réduction (première réponse),
   afin de déterminer si nous devons ajouter un séparateur & à la chaîne de requête.
   Si c'est la première réponse, isFirstParam sera vrai, sinon il sera faux.

   const separator = isFirstParam ? '' : '&' : Ceci définit le séparateur à utiliser avant la réponse actuelle.
   Si c'est la première réponse, nous n'utilisons pas de séparateur (une chaîne vide), sinon, nous utilisons &.

   return ${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}``:
   Cela ajoute la réponse actuelle à la chaîne de requête en utilisant le format aX=Y, où X est le numéro de réponse
   et Y est la valeur de la réponse. La réponse actuelle est séparée de la précédente par le séparateur approprié.

   La fonction reduce parcourt toutes les réponses, les concatène avec les séparateurs,
   et renvoie la chaîne de requête complète.

   Exemple d'utilisation :

   Supposons que vous ayez un objet answers comme suit :

   javascript:
   // ******************
   const answers = {
     1: 'yes',
     2: 'no',
     3: 'yes'
   };
   // ******************

   L'appel de formatFetchParams(answers) avec cet objet produira la chaîne de requête suivante :

   Output:
   // ******************
   a1=yes&a2=no&a3=yes
   // ******************
   Vous pourriez utiliser cette chaîne de requête pour effectuer une requête HTTP GET vers un serveur
   en tant que paramètres pour récupérer ces réponses.
   */
};
