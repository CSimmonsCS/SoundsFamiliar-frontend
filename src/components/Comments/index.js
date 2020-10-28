import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from '../Buttons';

import axios from "axios";

import { API_URL } from "../constants";

class Comments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentToggle: false,
    }
    this.handleCommentToggle = this.handleCommentToggle.bind(this);
  }

  handleCommentToggle(){
    this.setState(prevState => ({
      commentToggle: !prevState.commentToggle,
    }));
  }

  render () {

    return (
      <div className='Comments'>
        <Buttons handleCommentToggle={this.handleCommentToggle}/>
        <div className="comment-section">
          <div className={this.state.commentToggle ? 'clicked-comment' : 'unclicked-comment'}>
            <form action="index.html" method="post" >
              <textarea className="add-comment" defaultValue="Type your comment here...">
              </textarea>
              <br/>
              <input type="submit" name="submit" defaultValue="Send"></input>
            </form>
          </div>
          <div className="line-break"></div>
          <div className="comments-list">
            <div className="comment-thumbnail">
            </div>
            <div className="comment-and-user">
              <div className="comment">
                This is a comment about the song and sample that is being used.
              </div>
              <div className="user">
                sfcdot
              </div>
            </div>
          </div>

          <div className="comments-list">
            <div className="comment-thumbnail">
            </div>
            <div className="comment-and-user">
              <div className="comment">
                This is a comment about the song and sample that is being used.
              </div>
              <div className="user">
                xFRISCO
              </div>
            </div>
          </div>

          <div className="end-comments"></div>
        </div>

      </div>
    );
  }
}

export default Comments;
