import React from "react";
import Card from "./Card";

function Container(props) {
  return (
    <div className="text-left">
      <h1>{props.title}</h1>
      {props.data.map((item, index) => {
        return (
          <Card
            link={item.repo.name}
            key={`${item}-${index}`}
            type={item.type}
            name={
              props.name === "fork"
                ? item.payload.forkee.full_name
                : item.payload.pull_request.title
            }
            info={
              props.name === "fork"
                ? item.repo.name
                : item.payload.pull_request.state
            }
          />
        );
      })}
    </div>
  );
}

export default Container;
