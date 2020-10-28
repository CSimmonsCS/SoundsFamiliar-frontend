import React, { useState } from "react";
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddSongModal from '../AddSongModal';
import Modal from '@material-ui/core/Modal';

import axios from "axios";

import { API_URL } from "../constants";

class AddSongForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'song_title':"",
      'song_artist':"",
      'song_videoId':"",
      'song_time_stamp':"",
      'song_views': 0,
      'song_likes': 0,

      'sampled_title':"",
      'sampled_artist':"",
      'sampled_videoId':"",
      'sampled_time_stamp':"",
      'sampled_views':0,
      'sampled_likes':0,
      addOpen: false,
      editOpen: false,
      deleteOpen: false,
      songs:[],
    }
  }

  componentDidMount(){
    axios.get(API_URL)
      .then(res => this.setState({ songs: res.data }));
  }

  handleAddOpen = () => {
    this.setState({ addOpen: true });
  };

  handleAddClose = () => {
    this.setState({ addOpen: false });
    this.resetState();
  };

  handleEditOpen = () => {
    this.setState({ editOpen: true });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
    this.resetState();
  };

  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
    this.resetState();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  resetState = () => {
    this.setState({
        'song_title':"",
        'song_artist':"",
        'song_videoId':"",
        'song_time_stamp':"",
        'song_views': 0,
        'song_likes': 0,

        'sampled_title':"",
        'sampled_artist':"",
        'sampled_videoId':"",
        'sampled_time_stamp':"",
        'sampled_views':0,
        'sampled_likes':0,
      })
  }

  createSong = e => {
    e.preventDefault();
    console.log(this.state.song_title + ' has been added');
    axios.post(API_URL, this.state).then(() => {
      this.resetState();
    })
  };

  editSong = e => {
    e.preventDefault();

    // console.log(this.state.songs.indexOf("Test"));
    var songToBeEdited = this.state.songs.map(e => e.song_title).indexOf(this.state.song_title);
    // console.log(this.state.songs[songToBeEdited].id);
    // console.log(this.state.songs[songToBeEdited].song_title);
    // console.log(this.state.songs[songToBeEdited].song_artist);
    console.log(this.state.song_title + ' has been edited');
    axios.put(API_URL + this.state.songs[songToBeEdited].id, this.state).then(() => {
      this.resetState();
    })
  };

  deleteSong = e => {
    e.preventDefault();
    var songToBeDeleted = this.state.songs.map(e => e.song_title).indexOf(this.state.song_title);
    console.log( this.state.song_title + ' has been deleted');
    axios.delete(API_URL + this.state.songs[songToBeDeleted].id).then(() => {
      this.resetState();
    });
  };

  render () {

    return (
      <div className="AddSongForm">
        <div className="buttons">
          <div className="next-button">
            <button type="button" onClick={this.handleAddOpen}>
              Add Song
            </button>
          </div>
          <div className="comment-button">
            <button type="button" onClick={this.handleEditOpen}>
              Edit Song
            </button>
          </div>
          <div className="next-button">
            <button type="button" onClick={this.handleDeleteOpen}>
              Delete Song
            </button>
          </div>
        </div>

          <Modal
             open={this.state.addOpen}
             onClose={this.handleAddClose}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
           >
             <div className="AddSongModal">
               <h2>Add</h2>
               <form onSubmit={this.createSong}>
                 <h2>Song Info</h2>
                 <div className="song-form-text">
                   <TextField name="song_title" value={this.defaultIfEmpty(this.state.song_title)} onChange={this.onChange} required id="song_title" label="Song Title" />
                   <TextField name="song_artist" value={this.defaultIfEmpty(this.state.song_artist)} onChange={this.onChange} required id="song-artist" label="Song Artist" />
                   <TextField name="song_time_stamp" value={this.defaultIfEmpty(this.state.song_time_stamp)} onChange={this.onChange} required id="song-time" label="Song Time-Stamp" />
                   <TextField name="song_videoId" value={this.defaultIfEmpty(this.state.song_videoId)} onChange={this.onChange} required id="song-videoId" label="Song videoId" />
                 </div>
                 <h2>Sampled Song Info</h2>
                 <div className="sampled-form-text">
                   <TextField name="sampled_title" value={this.defaultIfEmpty(this.state.sampled_title)} onChange={this.onChange}required id="sampled-title" label="Original Title" />
                   <TextField name="sampled_artist" value={this.defaultIfEmpty(this.state.sampled_artist)} onChange={this.onChange}required id="sampled-artist" label="Original Artist" />
                   <TextField name="sampled_time_stamp" value={this.defaultIfEmpty(this.state.sampled_time_stamp)} onChange={this.onChange}required id="sampled-time" label="Original Time-Stamp" />
                   <TextField name="sampled_videoId" value={this.defaultIfEmpty(this.state.sampled_videoId)} onChange={this.onChange}required id="sampled-videoId" label="Original videoId" />
                 </div>
                 <div className="add-song-button">
                   <Button type="submit" variant="contained">Submit</Button>
                 </div>
               </form>
             </div>
           </Modal>

           <Modal
              open={this.state.editOpen}
              onClose={this.handleEditClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className="AddSongModal">
                <h2>Edit</h2>
                <form onSubmit={this.editSong}>
                  <h2>Song Info</h2>
                  <div className="song-form-text">
                    <TextField name="song_title" value={this.defaultIfEmpty(this.state.song_title)} onChange={this.onChange} required id="song_title" label="Song Title" />
                    <TextField name="song_artist" value={this.defaultIfEmpty(this.state.song_artist)} onChange={this.onChange} required id="song-artist" label="Song Artist" />
                    <TextField name="song_time_stamp" value={this.defaultIfEmpty(this.state.song_time_stamp)} onChange={this.onChange} required id="song-time" label="Song Time-Stamp" />
                    <TextField name="song_videoId" value={this.defaultIfEmpty(this.state.song_videoId)} onChange={this.onChange} required id="song-videoId" label="Song videoId" />
                  </div>
                  <h2>Sampled Song Info</h2>
                  <div className="sampled-form-text">
                    <TextField name="sampled_title" value={this.defaultIfEmpty(this.state.sampled_title)} onChange={this.onChange}required id="sampled-title" label="Sampled Title" />
                    <TextField name="sampled_artist" value={this.defaultIfEmpty(this.state.sampled_artist)} onChange={this.onChange}required id="sampled-artist" label="Sampled Artist" />
                    <TextField name="sampled_time_stamp" value={this.defaultIfEmpty(this.state.sampled_time_stamp)} onChange={this.onChange}required id="sampled-time" label="Sampled Time-Stamp" />
                    <TextField name="sampled_videoId" value={this.defaultIfEmpty(this.state.sampled_videoId)} onChange={this.onChange}required id="sampled-videoId" label="Sampled videoId" />
                  </div>
                  <div className="add-song-button">
                    <Button type="submit" variant="contained">Submit</Button>
                  </div>
                </form>
              </div>
            </Modal>

            <Modal
               open={this.state.deleteOpen}
               onClose={this.handleDeleteClose}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
             >
               <div className="AddSongModal">
                 <h2>Delete</h2>
                 <form onSubmit={this.deleteSong}>
                   <h2>Song Info</h2>
                   <div className="song-form-text">
                     <TextField name="song_title" value={this.defaultIfEmpty(this.state.song_title)} onChange={this.onChange} required id="song_title" label="Song Title" />
                   </div>
                   <div className="add-song-button">
                     <Button type="submit" variant="contained">Submit</Button>
                   </div>
                 </form>
               </div>
             </Modal>
      </div>
    );
  }
}

export default AddSongForm;
