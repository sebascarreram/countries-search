import React, { useEffect, useState } from "react";
import {
  Link,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import CountryInfo from "./../CountryInfo/CountryInfo";
import Country from "./../Country/Country";
import axios from "axios";
import styleApp from "./home.module.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  //const [error, seterror] = usestate(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    setLoaded(true);
    const data = async () => {
      const urlCountries = "https://restcountries.eu/rest/v2/all";
      try {
        const res = await axios(urlCountries);
        setCountries(res.data);
        setLoaded(false);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  useEffect(() => {
    setFilterCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  // console.log(filtercountries);
  //console.log(countries);
  //let { topicId } = useParams();
  //  console.log(useParams());
  //let { path, url } = useRouteMatch();
  //  console.log(useHistory());
  console.log(useLocation().pathname);

  return (
    <div className="app">
      <div className="container">
        <h1 className={styleApp.title}>
          <span className={styleApp.titleNumber}>
            {filterCountries.length}{" "}
          </span>
          {filterCountries.length < 2 ? "country" : "countries"}
        </h1>
        <input
          className={styleApp.input}
          type="text"
          placeholder="search countries"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styleApp.grid}>
          {filterCountries.length ? (
            filterCountries.map((country, idx) => {
              return <Country key={idx} {...country} />;
            })
          ) : (
            <h1 className={styleApp.error}>
              sorry, we couldn't find what you're looking for. please try
              another search.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
