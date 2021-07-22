import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import MovieComponents from './MovieComponents';
import axios from 'axios';
import MovieInfoComponent from '../Marvel/MovieInfoComponent';

export const  API_KEY = 'a471a5fe';

const Container = styled.div`
    display: flex;    
    flex-direction : column;
`;

const Header = styled.div `
   display:flex;
   flex-direction : row;
   background-color: black;
   color:white;
   padding: 10px;
   font-size: 25px;
   font-weight: bold;
   box-shadow: 0 3px 6px #555;
   justify-content: space-between;
`;

const Appname = styled.div `
    display: flex;
    flex-direction : row;
    align-items : center;
`;
 
const SearchBox = styled.div `
   display: flex;
   flex-direction : row;
   padding: 10px 10px;
   background-color: white;
   border-radius: 6px;
   margin-left: 20px;
   width: 50%;
   background-color: white;
   align-items: center;
`;
const SearchInput = styled.input `
       color: black;
       font-size: 16px;
       font-weight: 500;
       border: none;
       outline: none;
       margin-left: 15px;
`;

const MovieListContainer = styled.div `
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 30px;
        justify-content : space-evenly;
        gap: 24px;

`;

const MovieList = () => {
    
     const [searchQuery, updatesearchQuery] = useState();
     const [timeoutId, updateTimeoutId] = useState(); // fetching api 
     const [movieList, updatemovieList] = useState([]); // array of movies, series ,etc
      const [selectedMovie, onMovieSelect] = useState(); // imdb of movies and it details

     const fetchData = async (searchString) =>{
         const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
         console.log(response);
         updatemovieList(response.data.Search);
     }

     const onTextChange = (event) =>{
         clearTimeout(timeoutId);
         updatesearchQuery(event.target.value); //input search
         const timeOut = setTimeout(() => fetchData(event.target.value), 500);
         updateTimeoutId(timeOut);
     }
     

    return (
        <>
        <Container >
        <Header>
        <Appname >
           React Movie
        </Appname>
        <SearchBox>
         <SearchIcon  style={{color: 'black'}}/>
           <SearchInput placeholder='Search Movie..' onChange={onTextChange} value={searchQuery}/>
        </SearchBox>
       </Header>
       {/* work in progress */}
        {/* {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}/>} */} 
        <MovieListContainer>
            {movieList?.length ? movieList.map((movie, index) => <MovieComponents key={index} movie={movie} onMovieSelect={onMovieSelect}/>) : 'No Search Found??'}
        </MovieListContainer> 
        </Container>
        
         
        </>
    )
}

export default MovieList;
