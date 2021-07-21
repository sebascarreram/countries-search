import React from "react";
//import countryData from "./../../utils/countriesData";
import styleInfo from "./countryInfo.module.css";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Helmet } from "react-helmet";
//import { useHistory } from "react-router-dom";

const CountryInfo = (props) => {
  //  console.log(useHistory().location.pathname.slice(1));
  //const [countriesTest, setCountriesTest] = useState([]);
  //  const [countries, setCountries] = useState(props[0]);
  //  console.log(props[0].name);

  /*useEffect(() => {
    setCountries(props[0]);
  });*/
  const { name, region, subregion, capital, currencies, flag, languages } =
    props[0];
  //  console.log(props[0]);
  console.log(name);
  //  console.log(countries);
  //const { name } = countries;
  //console.log(name)

  //console.log(name);
  const joinLanguages = languages.map((e) => e.name).join(", ");
  const joinCurrencies = currencies.map((e) => e.name).join(", ");

  //  console.log(props);
  //  console.log(countries);
  const styleBackground = {
    backgroundImage: `url(${flag})`,
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "saturation",
    backgroundPosition: "top",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    filter: "blur(5px)",
    zIndex: -9999,
  };

  return (
    <>
      <Helmet>
        <title>{`Country - ${name}`} </title>
      </Helmet>
      <div className={styleInfo.groupInfo}>
        <div style={styleBackground}></div>
        <div className={styleInfo.card}>
          <img src={flag} alt={name} className={styleInfo.flag} />
          <div className={styleInfo.info}>
            <h1 className={styleInfo.name}>{name}</h1>

            <h2 className={styleInfo.title}>
              Region: <span className={styleInfo.capital}>{region}</span>
            </h2>
            <h2 className={styleInfo.title}>
              Subregion: <span className={styleInfo.capital}>{subregion}</span>
            </h2>
            <h2 className={styleInfo.title}>
              Capital:{" "}
              <span className={styleInfo.capital}>
                {capital ? `${capital}` : "No capital"}
              </span>
            </h2>
            <h2 className={styleInfo.title}>
              {currencies.length > 1 ? "Currencies: " : "Currency: "}
              <span className={styleInfo.currency}>{joinCurrencies}</span>
            </h2>
            <h2 className={styleInfo.title}>
              {languages.length > 1 ? "Languages: " : "Language: "}
              <span className={styleInfo.languages}>{joinLanguages}</span>
            </h2>
            <Link to="/" className={styleInfo.back}>
              <IoMdArrowRoundBack className={styleInfo.iconBack} />
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryInfo;
