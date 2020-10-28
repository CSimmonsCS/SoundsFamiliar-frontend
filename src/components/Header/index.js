import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
    };
  }

  render () {

    return (
      <div className='Header'>
        <header>
            <nav>
              <div className="logo">
                <Link to="/">SoundsFamiliar?</Link>
              </div>
              <ul>
                <li><Link to="/all">All Songs</Link></li>
                <li><Link to="/search">Search</Link></li>

                {this.props.logged_in  ?
                  <li><Link to="" onClick={this.props.handle_logout}>{this.props.username} Log Out</Link></li>
                  :
                  <li><Link to="/signin">Sign In</Link></li>
                }
                {this.props.logged_in  ?
                  ""
                  :
                  <li><Link to="/signup">Sign Up</Link></li>
                }
              </ul>
            </nav>
        </header>
      </div>
    );
  }
}

export default Header;
