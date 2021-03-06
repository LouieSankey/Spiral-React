import React from 'react';
import MainContext from '../../MainContext'
import { useContext } from 'react';
import '../TaskEntryBar/TaskEntryBar.css'



const NavModal = ({ handleClose, show, children }) => {

  const context = useContext(MainContext)
  const showHideClassName = show ? "nav-link-modal display-block" : "nav-link-modal display-none";

  return (

    <div className={showHideClassName}>
      <section className="modal-nav-link-main">
        <button className="modal-close-button" onClick={handleClose}>x</button>
        {/* <div className="modal-content"> */}
          <h2 className="">Wait!</h2>
       

            <p>It looks like you're in the middle of a cycle, and we don't want you to loose your progress.</p>
            <p>Before navigating, you can add your current progress to tracking with 'Skip to Break'</p>
            <p>Or use 'Stop' to terminate this cycle without recording.</p>
       
     
        {/* </div> */}
      </section>
    </div>
  );
};

export default NavModal;