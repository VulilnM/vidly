import React, { Component } from "react";
import { deleteMovie, getMovies } from "./moveDB/fakeMovieService";
import Like from "./components/common/like";
import Movies from "./components/movies";

export default class App extends Component {
  
   render(){
      return(
         <Movies/>
      )
   }

}
