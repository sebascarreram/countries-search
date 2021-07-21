import React from "react";
import styleCard from "./country.module.css";
import { Link } from "react-router-dom";

const Country = (props) => {
  //  console.log(props);
  //  const linkCountry = props.name.replace(/\s/g, "-").toLowerCase();
  //  console.log(linkCountry);
  return (
    <>
      <div className={styleCard.card}>
        <img className={styleCard.flag} src={props.flag} alt={props.name} />

        <div className={styleCard.info}>
          {props.id} <h2 className={styleCard.name}>{props.name}</h2>
          <Link onClick={props.onClick}
            to={{
              pathname: `${props.alpha3Code}`,
              // hash: `#${props.alpha3Code}`,
            }}
            className={styleCard.showMore}
          >
            View details
          </Link>
        </div>
      </div>
    </>
  );
};

export default Country;
