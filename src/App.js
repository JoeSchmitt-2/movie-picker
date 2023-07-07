//By: Joseph Schmitt
//Email: schmitttyy@gmail or jcs20fh@fsu.edu
//Description: This is a movie picker app written using React!
import { Button, TextField, InputAdornment, Stack } from '@mui/material';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';


export default function Movie() {

  //this state is used to store the value of the input
  const [query,setQuerys] = useState('');

  //this state is used to store the data from the api
  const [container, setContainer] = useState([]);

  //this takes the value of the input once submit is clicked and stores it in endPoint
  const [endPoint, setEndPoint] = useState('');

  //this calls fetchMe() when the state 'query->endPoint', aka input, is changed
  useEffect(() => {
    fetchMe()
  },[endPoint])

  //fetching data from the api
  //back ticks are used to add the value of the state 'query' to the url
  const fetchMe = () =>{
  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=+${query}`, {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '70eb97ac5bmshb04b05b2e5ddfd6p1861c2jsn323041c6c66c',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
})

//adding .json() returns a promise
.then(response => {
  //console.log(response.json());
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
//setEndPoint having endpoint as a parameter allows us to use the value of endpoint once the 
//button is clicked and used as the value for endPoint which is set by setEndPoint
const submitHandler = (e) => {
  e.preventDefault();
  setEndPoint(query);
}

  
 
  return (
    <>
      <header>Movie Picker</header>
      <div className='columns'>
        <nav>Left Advertisement Space</nav>
          <main>
            <form onSubmit={ submitHandler }>
            <TextField
            InputProps={{ endAdornment: (
              <InputAdornment position='end'>
                <TheaterComedyIcon />
              </InputAdornment>
            ), }}
            color='success'
            autoComplete="on" 
            helperText="Hint: Doctor Who" 
            size='small' 
            label="Search" 
            variant="filled"
            value={ query } 
            onChange={ onChangeHandler } 
            />
            <Button size='large' color='secondary' variant='contained' type="submit">Submit</Button>
          </form>
          {/*<AutoCompleteFoods />*/}

          {container.map(( item, index ) => {
            return (
              <Stack key={index} className='element'>
                <img src={ item.i.imageUrl } alt="" className='img'/>
                <p>{ item.l }</p>
                <p>Actors: { item.s }</p>
                <p>{ item.y }</p>
              </Stack>
            );
          })}
          </main>
        <aside>Right Advertisement Space</aside>
    </div>
    <footer>By Joseph Schmitt</footer>
    </>
  );
}