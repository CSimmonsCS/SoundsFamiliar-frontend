import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';

import axios from "axios";

import { USER_URL } from "../constants";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  }

  // componentDidMount() {
  //   if (this.state.logged_in) {
  //     fetch('http://localhost:8000/core/current_user/', {
  //       headers: {
  //         Authorization: `JWT ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({ username: json.username });
  //       });
  //   }
  // }

  componentDidUpdate(prevProps){
    if(this.props.logged_in){
      this.props.history.push('/');
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.password === this.state.confirm_password){
      this.props.handle_signup(e, this.state);
    }
    else{
      alert('Passwords do not match');
    }
  }

  // createUser = e => {
  //   e.preventDefault();
  //   console.log(this.state.username + ' has been added');
  //   axios.post(USER_URL, this.state).then(() => {
  //     // this.resetState();
  //   })
  // };

  // handle_signup = (e) => {
  //   e.preventDefault();
  //   // axios.post('http://localhost:8000/core/users/', this.state, {
  //   fetch('http://localhost:8000/core/users/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       localStorage.setItem('token', json.token);
  //       this.setState({
  //         logged_in: true,
  //         // displayed_form: '',
  //         username: json.username
  //       });
  //       console.log(this.state.logged_in);
  //     });
  // };

  render () {
    return (
      <div className='SignUp'>
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Sign Up</h2>
          <div className="song-form-text">
            <TextField name="email" fullWidth value={this.state.email || ''} onChange={this.onChange} required id="email" label="Email" />
          </div>
          <div className="song-form-text">
            <TextField name="username" fullWidth value={this.state.username || ''} onChange={this.onChange} required id="username" label="Username" />
          </div>
          <div className="song-form-text">
            <TextField name="password" type="password" fullWidth value={this.state.password || ''} onChange={this.onChange} required id="password" label="Password" />
          </div>
          <div className="song-form-text">
            <TextField name="confirm_password" type="password" fullWidth value={this.state.confirm_password || ''} onChange={this.onChange} required id="confirm_password" label="Confirm Password" />
          </div>
          <div className="sign-up-button">
            <Button type="submit" variant="contained">Sign Up</Button>
          </div>
        </form>
      </div>
    );
  }
}




// <div className="song-form-text">
//   <TextField name="confirm_password" type="password" fullWidth value={this.defaultIfEmpty(this.state.confirm_password)} onChange={this.onChange} required id="confirm_password" label="Confirm Password" />
// </div>


export default withRouter(SignUp);
