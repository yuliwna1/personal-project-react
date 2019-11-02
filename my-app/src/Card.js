import React from "react";

function Card(props) {
  return (
    <a
      href={`https://github.com/${props.link}`}
      target="_blank"
      className="card"
    >
      <p className="bold">{props.name}</p>

      <p>
        <span>{props.type === "ForkEvent" ? "Forked from: " : "Status: "}</span>
        {props.info}
      </p>
    </a>
  );
}

export default Card;
