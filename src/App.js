//By: Joseph Schmitt
//Email: schmitttyy@gmail or jcs20fh@fsu.edu
//Description: This is a movie picker app written using React!
import { InputAdornment, Button, TextField, Stack } from '@mui/material';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { default as LocalMoviesIcon } from '@mui/icons-material/LocalMovies';

export default function Movie() {

  //this state is used to store the value of the input
  const [query,setQuerys] = useState('');

  //this state is used to store the data from the api
  const [container, setContainer] = useState([]);

  //this takes the value of the input once submit is clicked and stores it in finalQuery
  const [finalQuery, setFinalQuery] = useState('');

  //this calls fetchMe() when the state 'query->finalQuery', aka input, is changed
  useEffect(() => {
    fetchMe()
  },[finalQuery])

  //fetching data from the api
  //back ticks are used to add the value of the state 'query' to the url
  const fetchMe = () =>{
  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=+${query}`, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
    "x-rapidapi-key": "70eb97ac5bmshb04b05b2e5ddfd6p1861c2jsn323041c6c66c"
  }
})

//adding .json() returns a promise
.then(response => {
  return response.json();
})
//data is all of the elements from the api being stored in the state 'container'
.then(data => {
  setContainer(data.d)
})
//error catching
.catch(err => {
  console.error(err);
});
}

//e is every value we type in
//setQuerys is the changer that updates the state
const onChangeHandler = (e) => {
  setQuerys(e.target.value);
}

//allows the submit button to work
//setFinalQuery having endpoint as a parameter allows us to use the value of endpoint once the 
//button is clicked and used as the value for finalQuery which is set by setFinalQuery
const submitHandler = (e) => {
  e.preventDefault();
  setFinalQuery(query);
}

  
 
  return (
    <div className="App">
      
      <h1>Movie Picker</h1>

      <form onSubmit={ submitHandler }>
        <TextField 
        InputProps={{ endAdornment: (
          <InputAdornment position='end'>
            <LocalMoviesIcon />
          </InputAdornment> ),
        }}
        color='success'
        autoComplete="on" 
        helperText="Hint: Spider Man" 
        size='small' 
        label="Search" 
        variant="filled"
        value={ query } 
        onChange={ onChangeHandler } 
        />
        <Button size='large' color='secondary' variant='contained' type="submit">Submit</Button>
      </form>

      
  
      {container.map(( item, index ) => {
        return (
          <Stack key={index} direction="row"> 
            <img src={ item.i.imageUrl } alt="" />
            <p>{ item.l }</p>
            <p>Actors: { item.s }</p>
            <p>{ item.qid }</p>
            <p>{ item.y }</p>
          </Stack>
    
        );
      })}
    </div>
  );
}