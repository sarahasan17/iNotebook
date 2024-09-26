import React from 'react'

function ALert(props) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        A simple primary alert with{" "}
        <a href="#" class="alert-link">
          {props.message}
        </a>
       
      </div>
    </div>
  );
}

export default ALert
