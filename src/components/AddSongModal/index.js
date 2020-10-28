import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop'

// UNNEEDED
const AddSongModal = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const body = (
    <div className="AddSongForm">
      <form>
        <h2>Song Info</h2>
        <div className="song-form-text">
          <TextField required id="song-title" label="Song Title" />
          <TextField required id="song-artist" label="Artist" />
          <TextField required id="song" label="Song" />
          <TextField required id="song-time" label="Song Time-Stamp" />
          <TextField required id="song-address" label="Song Address" />
        </div>
        <h2>Sampled Song Info</h2>
        <div className="sampled-form-text">
          <TextField required id="sampled-title" label="Sampled Title" />
          <TextField required id="sampled-artist" label="Sampled Artist" />
          <TextField required id="sampled-song" label="Sampled Song" />
          <TextField required id="sampled-time" label="Sampled Time-Stamp" />
          <TextField required id="sampled-address" label="Sampled Address" />
        </div>
        <div className="add-song-button">
          <Button type="submit" variant="contained">Submit</Button>
        </div>
      </form>
    </div>

  );

  return(
    <div className="AddSongModal">
      <button type="button" onClick={handleOpen}>
        Add/Edit Song
      </button>

      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
           timeout: 500,
         }}
       >
         {body}
       </Modal>

    </div>
  );
}

export default AddSongModal;
