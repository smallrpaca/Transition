import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./ShowMessage.css";

const ShowMessage = () => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      {showButton && (
        <button onClick={() => setShowMessage(true)}>Show Message</button>
      )}
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <div onClick={() => setShowMessage(false)}>
          <div>Animated alert message</div>
          <p>This alert message</p>
          <button onClick={() => setShowMessage(false)}>Close</button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ShowMessage;
