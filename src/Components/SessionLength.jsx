import React from "react";

function SessionLength(props) {

    function increaseSession(){
        if(props.sessionLength === 60){
            return;
        }
        props.increaseSession();
    }

    function decreaseSession(){
        if(props.sessionLength === 1){
            return;
        }
        props.decreaseSession();
    }
  return (
    <section className="div-container">
      <h4>Session Length</h4>
      <section className="container">
        <button disabled ={props.isPlay === true ? "desable" : ""}
        onClick={decreaseSession}>Bajar</button>
        <p className="interval-Number">{props.sessionLength}</p>
        <button disabled ={props.isPlay === true ? "desable" : ""}
         onClick={increaseSession}>Subir</button>
      </section>
    </section>
  );
}

export default SessionLength;
