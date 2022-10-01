import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCountries } from "../features/CountrySlice";
import { selectDarkMode } from "../features/ThemeSlice";
import { selectInputValue } from "../features/InputSlice";
import { selectSelectValue } from "../features/SelectSlice";
import { Link } from "react-router-dom";
import CountryListSkeleton from "./CountryListSkeleton";

function CountryList() {
  const countries = useSelector(selectCountries);
  const darkMode = useSelector(selectDarkMode);
  const inputValue = useSelector(selectInputValue);
  const selectValue = useSelector(selectSelectValue);

  return (
    <Container>
      {!countries ? (
        <CountryListSkeleton />
      ) : (
        countries
          .filter((country) => {
            if (
              inputValue === "" &&
              selectValue === country.region.toLowerCase()
            ) {
              return country;
            } else if (
              country.name.official
                .toLowerCase()
                .includes(inputValue.toLowerCase()) &&
              selectValue === "all"
            ) {
              return country;
            }
          })
          .map((country) => (
            <Country key={country.name.official} darkMode={darkMode}>
              <Link to={`/detail/${country.cca3}`}>
                <Img>
                  <img src={country.flags.png} />
                </Img>
                <Info darkMode={darkMode}>
                  <h2>{country.name.official}</h2>
                  <p>
                    Population:{" "}
                    <span>
                      {new Intl.NumberFormat("hu-HU", {
                        style: "decimal",
                      }).format(country.population)}
                    </span>
                  </p>
                  <p>
                    Region: <span>{country.region}</span>
                  </p>
                  <p>
                    Capital: <span>{country.capital}</span>
                  </p>
                </Info>
              </Link>
            </Country>
          ))
      )}
    </Container>
  );
}

export default CountryList;

const darkModeBg = "background-color: rgb(43, 55, 67)";
const lightModeBg = "background-color: white";

const darkModeColor = "color: white";
const lightModeColor = "color: black";

const Container = styled.div`
  display: grid;
  grid-gap: 50px;
  padding-bottom: 50px;

  @media only screen and (max-width: 567px) {
    padding-inline: 20px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media only screen and (min-width: 567px) {
    padding-inline: 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (min-width: 768px) {
    padding-inline: 50px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1200px) {
    padding-inline: 50px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-inline: 15%;
  }
`;

const Country = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  ${(props) => (props.darkMode ? "border: 2px solid" : "border: none")};
  border-color: rgba(249, 249, 249, 0.2);
  overflow: hidden;
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
  cursor: pointer;
  box-shadow: 40px 40px 40px 10px rgba(0, 0, 0, 0.6),
    20px 20px 30px -5px rgba(0, 0, 0, 8);
  transition: all 250ms;

  :hover {
    border: 2px solid;
    border-color: rgba(249, 249, 249, 1);
    transform: scale(1.1);
  }
`;

const Img = styled.div`
  //height: 50%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 20px;
  line-height: 25px;
  font-size: 10px;
  ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};

  h2 {
    margin-bottom: 15px;
    font-weight: 800;
  }

  p {
    font-weight: 600;
  }

  span {
    font-weight: 300;
  }

  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
`;
