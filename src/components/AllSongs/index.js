import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";

import { API_URL } from "../constants";

import YouTube from "react-youtube";

class AllSongs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
    };
  }

  componentDidMount(){
    //HTTP get all the songs,
    //concatenates songs to state.songs,
    //gets random number based on songs array length,
    //sets state.randomSong to state.songs[randomNum],
    //initializes the start times for the YouTube iFrame API
    axios.get(API_URL)
      // .then(res => this.setState({ songs: res.data }, () => console.log(this.state.songs)));
      .then(
        res => this.setState({ songs: this.state.songs.concat(res.data)}, () => console.log(this.state.songs)));
          // () => this.setState({randomNum: Math.floor(Math.random() * this.state.songs.length)},
          //   () => this.setState({randomSong: this.state.songs[this.state.randomNum]},
          //     () => this.setOptsStarts())
                // () => console.log(this.state.randomSong))
                // )));

      // .then(res => console.log(res.data));
  }


  render () {
    return (
      <div className='AllSongs'>
      <table>
        <tbody>
          <tr>
            <td className="small-split font-25"><b>Song</b></td>
            <td className="small-split"></td>
            <td className="split"></td>
            <td className="small-split font-25"><b>Sampled</b></td>
            <td className="small-split"></td>
            <td></td>
          </tr>

          {!this.state.songs || this.state.songs.length <= 0 ? (
            <tr>
              <td>No Songs</td>
            </tr>
          ):(
            this.state.songs.map(song => (
              <tr key={song.id}>
                <td className="small-split"><b>{song.song_title}</b></td>
                <td className="small-split"><em>{song.song_artist}</em></td>
                <td className="split">{song.song_time_stamp}</td>
                <td className="small-split"><b>{song.sampled_title}</b></td>
                <td className="small-split"><em>{song.sampled_artist}</em></td>
                <td>{song.sampled_time_stamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    );
  }
}

export default AllSongs;
