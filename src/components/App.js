import React, { useEffect, useState } from "react";
import {
  Switch,
  /*
  useParams,
  Link,
  useRouteMatch,
  useHistory,*/
  useLocation,
  Route,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import styleApp from "./app.module.css";

import CountryInfo from "./CountryInfo/CountryInfo";
import Country from "./Country/Country";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Loader from "./Loader/Loader";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    setLoaded(true);
    const data = async () => {
      try {
        const urlCountries = "https://restcountries.eu/rest/v2/all";
        const res = await fetch(urlCountries);
        const data = await res.json();

        setCountries(data);
        setLoaded(false);
      } catch (err) {
        setError(true);
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

  //console.log(countries);
  //
  const nameLink = useLocation().pathname.slice(1);
  //console.log(nameLink);

  const handleCountry = () => {
    return countries.filter((country) => country.alpha3Code === nameLink);
  };

  if (error) <ErrorMessage />;

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Countries</title>
      </Helmet>
      <div className="container">
        <Switch>
          <Route exact path="/">
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
              value={search}
            />

            <div className={styleApp.grid}>
              {/* First loader */}
              {loaded ? (
                <Loader />
              ) : filterCountries.length ? (
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
          </Route>
          <Route exact path={`/${nameLink}`}>
            <CountryInfo {...handleCountry()} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
