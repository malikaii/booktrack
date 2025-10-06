import React from "react";
import "./ErrorField.css";

function ErrorField({ errorMessage }) {
  return (
    <>
      <div id="error-field">
        <h5>{errorMessage}</h5>
      </div>
    </>
  );
}

export default ErrorField;
