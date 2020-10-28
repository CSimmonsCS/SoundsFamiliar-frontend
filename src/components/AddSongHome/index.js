import React, { Component } from "react";
import AddSongForm from "../AddSongForm";

import axios from "axios";

import { API_URL } from "../constants";

class AddSongHome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      songs: []
    }
  };

  componentDidMount(){
    this.getSongs();
  }

  getSongs = () => {
    axios.get(API_URL).then(res => this.setState({ songs: res.data }));
    console.log(this.state.songs);
  };

  resetState = () => {
    this.getSongs();
  }

  render(){

    return(
      <div>
        <button type="button" onClick={this.getSongs}>
          reset state
        </button>
      </div>
    );
  }
}

export default AddSongHome;
