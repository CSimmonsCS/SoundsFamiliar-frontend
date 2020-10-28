import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { API_URL } from "../constants";

import YouTube from "react-youtube";

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      searchNum: 0,
      searchSong: {},
      song_opts: {},
      sampled_opts: {},
      songPlayer: null,
      sampledPlayer: null,
      searchTitle: "",
      searchArtist: "",
    };
  }

  componentDidMount(){
    //HTTP get all the songs,
    //concatenates songs to state.songs,
    //gets search number based on songs array length,
    //sets state.searchSong to state.songs[searchNum],
    //initializes the start times for the YouTube iFrame API
    axios.get(API_URL)
      // .then(res => this.setState({ songs: res.data }, () => console.log(this.state.songs)));
      .then(
        res => this.setState({ songs: this.state.songs.concat(res.data) },
          () => this.setState({searchNum: Math.floor(Math.random() * this.state.songs.length)},
            () => this.setState({searchSong: this.state.songs[this.state.searchNum]},
              () => this.setOptsStarts())
                // () => console.log(this.state.searchSong))
                )));

      // .then(res => console.log(res.data));
  }

  handleLikeClickSong = (e) => {
    e.preventDefault()
    //sets temp obj to searchSong, changes song_likes variable then setState for searchSong to tempSong obj
    var tempSong = this.state.searchSong;
    tempSong.song_likes += 1;
    // console.log(tempSong.song_likes);
    this.setState({searchSong: tempSong});
    axios.put(API_URL + this.state.searchSong.id, this.state.searchSong).then(() => {
      console.log(this.state.searchSong.song_likes);
    });
  }

  handleLikeClickSampled = (e) => {
    e.preventDefault();
    //sets temp obj to searchSong, changes sampled_likes variable then setState for searchSong to tempSong obj
    var tempSong = this.state.searchSong;
    tempSong.sampled_likes += 1;
    // console.log(tempSong.song_likes);
    this.setState({searchSong: tempSong});
    axios.put(API_URL + this.state.searchSong.id, this.state.searchSong).then(() => {
      console.log(this.state.searchSong.sampled_likes);
    });
  }

  timeStampToSeconds = (time) => {
    //splits time stamp by ':', multiplies minutes (temp[0]) by 60 and adds seconds (temp[1])
    var temp = time.split(':');
    var seconds = (parseInt(temp[0]) * 60) + parseInt(temp[1]);
    return seconds;
  }

  setOptsStarts = () => {
    //holds both Opt start functions for the YouTube iFrame API
    this.setSongOptsStart();
    this.setSampledOptsStart();
  }

  setSongOptsStart = () => {
    var songOpts = {width: '560', height: '315', playerVars: {start:0}};
    // var song_time_stamp = this.state.searchSong.song_time_stamp;
    songOpts.playerVars.start = this.timeStampToSeconds(this.state.searchSong.song_time_stamp);
    // console.log(songOpts);
    this.setState({song_opts: songOpts});
  }

  setSampledOptsStart = () => {
    var sampledOpts = {width: '560', height: '315', playerVars: {start:0}};
    // var song_time_stamp = this.state.searchSong.song_time_stamp;
    sampledOpts.playerVars.start = this.timeStampToSeconds(this.state.searchSong.sampled_time_stamp);
    // console.log(sampledOpts);
    this.setState({sampled_opts: sampledOpts});
  }

  goToSongTimeStamp = (e) =>{
    e.preventDefault();
    // console.log(this.timeStampToSeconds(this.state.searchSong.sampled_time_stamp));
    // this.state.songPlayer.playVideo();
    this.state.songPlayer.seekTo(this.timeStampToSeconds(this.state.searchSong.song_time_stamp));
  };

  goToSampledTimeStamp = (e) =>{
    e.preventDefault();
    // console.log(this.timeStampToSeconds(this.state.searchSong.sampled_time_stamp));
    // this.state.sampledPlayer.playVideo();
    this.state.sampledPlayer.seekTo(this.timeStampToSeconds(this.state.searchSong.sampled_time_stamp));
  };

  songOnReady = (event) => {
    this.setState({songPlayer: event.target});
  }

  sampledOnReady = (event) => {
    this.setState({sampledPlayer: event.target});
  }

  preventDefault = (e) => {
    e.target.preventDefault();
  }

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearch = e => {
    e.preventDefault();
    //filters songs by artist
    var filteredSongByArtist = this.state.songs.filter((artist) => {
      return artist.song_artist === this.state.searchArtist;
    });
    // console.log(filteredSongByArtist);
    //then we go through filtered array to check for song, gets song object
    var searchSongIndex = filteredSongByArtist.map(e=>e.song_title).indexOf(this.state.searchTitle);
    // console.log(searchSongIndex);
    if(searchSongIndex === -1){
      console.log('No Results');
    } else{
      this.setState({searchSong: filteredSongByArtist[searchSongIndex]});
    }


    // var songToBeSearched;
    // var artistToBeSearched;
    // if(this.state.songs.map(e => e.song_title).indexOf(this.state.searchTitle) > -1){
    //   songToBeSearched = this.state.songs.map(e => e.song_title).indexOf(this.state.searchTitle);
    // }
    // if(this.state.songs.map(e => e.song_artist).indexOf(this.state.searchArtist) > -1){
    //   artistToBeSearched = this.state.songs.map(e => e.song_artist).indexOf(this.state.searchArtist);
    // }
    // if(songToBeSearched > -1 && artistToBeSearched >-1){
    //   // console.log(songToBeSearched);
    //   // console.log(artistToBeSearched);
    //   if (songToBeSearched === artistToBeSearched){
    //     // console.log(this.state.songs[songToBeSearched].id);
    //     this.setState({searchSong: this.state.songs[songToBeSearched]}, () => this.setOptsStarts());
    //   } else{
    //     console.log('No Results');
    //   }
    // } else{
    //   console.log('No Results');
    // }

    // axios.get(API_URL, this.state).then(() => {
    //   this.resetState();
    // })
  };

  render () {
    return (
      <div className='Search'>
        <div className="search-container">
          <div className="SearchBar">
            <form onSubmit={this.onSearch}>
              <div className="search-inputs">
                <TextField required name="searchTitle" value={this.defaultIfEmpty(this.state.searchTitle)} onChange={this.onChange} id="search_title" label="Search Title"/>
                <TextField required name="searchArtist" value={this.defaultIfEmpty(this.state.searchArtist)} onChange={this.onChange} id="search_title" label="Search Artist"/>
              </div>
              <div className="add-song-button">
                <Button type="submit" variant="contained">Submit</Button>
              </div>
            </form>
          </div>
        </div>


        <div className="song-container">
          <div className="left-side">
            <div className="title-likes-container">
              <h3>Song</h3>
              <div className="likes-container">
                <div className="likes-number">
                  <a onClick={this.handleLikeClickSong} href="#">&hearts;</a> { this.state.searchSong.song_likes }
                </div>
              </div>
            </div>
            <h2>{ this.state.searchSong.song_title }</h2>
            <h4>{ this.state.searchSong.song_artist }</h4>
            <div className="time-stamp-container">
              <div className="time-stamp">
                <a onClick={this.goToSongTimeStamp} href="#">{ this.state.searchSong.song_time_stamp }</a>
              </div>
            </div>
            <div className="song-video">
              <YouTube className="youtube-iframe" videoId={this.state.searchSong.song_videoId} opts={this.state.song_opts} onReady={this.songOnReady} />
            </div>
          </div>
          <div className="right-side">
            <div className="title-likes-container">
              <h3>Sampled</h3>
              <div className="likes-container">
                <div className="likes-number">
                  <a onClick={this.handleLikeClickSampled} href="#">&hearts;</a> { this.state.searchSong.sampled_likes }
                </div>
              </div>
            </div>
            <h2>{ this.state.searchSong.sampled_title }</h2>
            <h4>{ this.state.searchSong.sampled_artist }</h4>
            <div className="time-stamp-container">
              <div className="time-stamp">
                <a onClick={this.goToSampledTimeStamp} href="#">{ this.state.searchSong.sampled_time_stamp }</a>
              </div>
            </div>
            <div className="sampled-video">
              <YouTube className="youtube-iframe" videoId={this.state.searchSong.sampled_videoId} opts={this.state.sampled_opts} onReady={this.sampledOnReady}/>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Search;
