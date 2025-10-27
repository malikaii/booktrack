import React from "react";
import "./ErrorField.css";
import { FaExclamationCircle } from "react-icons/fa";

function ErrorField({ errorMessage }) {
  return (
    <>
      <div id="error-field">
        <p>
          <FaExclamationCircle /> {errorMessage}
        </p>
      </div>
    </>
  );
}

export default ErrorField;
