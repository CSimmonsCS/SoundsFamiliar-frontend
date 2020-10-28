import React from 'react';
import ReactDOM from 'react-dom';

const Buttons = (props) => {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     commentToggle: false,
  //   }
  // }
  // render () {

  const refresh = (e) => {
    e.preventDefault();
    window.location.reload(false);
  }

  return (
    <div className='Buttons'>
      <div className="under-video">
        <div className="comment-button">
          <button type="button" name="comment" onClick={() => {props.handleCommentToggle()}}>COMMENT</button>
        </div>
        <div className="next-button">
          <button onClick={refresh} type="button" name="next">RANDOM</button>
        </div>
      </div>
    </div>
  );
}
// }

export default Buttons;
