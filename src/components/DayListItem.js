import React from "react";
import className from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayListItemClass = className("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots == 0

  });

  let formatSpots = (spots) => {
    return spots 
      ? (spots > 1) 
        ? `${spots} spots remaining`
        : `${spots} spot remaining`
      : `no spots remaining` 
  };

  return (
    <li className={dayListItemClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day" >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};