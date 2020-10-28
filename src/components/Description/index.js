import React from 'react';
import ReactDOM from 'react-dom';
import AddSongForm from '../AddSongForm';

class Description extends React.Component {
  render () {
    return (
      <div className='Description'>
        <div className="title-container">
          <div className="description">
            <h1>Discover Musical Connections Through Samples!</h1>
            <p>
              Find out the direct connections of music through their samples, interpolations, and melodies.
              Sampled music spans across all genres and can be from musical eras from decades ago!
            </p>
            <AddSongForm />
          </div>
        </div>
      </div>
    );
  }
}

// Dig deeper into music by discovering direct connections among over 702,000 songs and 229,000 artists, from Hip-Hop, Rap and R&B via Electronic / Dance through to Rock, Pop, Soul, Funk, Reggae, Jazz, Classical and beyond.
// SoundsFamiliar's content is built by a community of over 24,000 contributors. Make contributions to earn Cred  - our very own points system. Join us now to add more knowledge and share it with the world!

export default Description;
