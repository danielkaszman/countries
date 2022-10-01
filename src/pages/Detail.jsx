import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../features/ThemeSlice";
import { selectCountries } from "../features/CountrySlice";

function Detail() {
  const [country, setCountry] = useState();
  const params = useParams();
  const darkMode = useSelector(selectDarkMode);
  const countries = useSelector(selectCountries);

  useEffect(() => {
    getCountry();
  }, [params]);

  function getCountry() {
    countries.find((country) => {
      if (country.cca3 === params.cca3) {
        setCountry(country);
      }
    });
  }

  return (
    <Container darkMode={darkMode}>
      <Button darkMode={darkMode}>
        <Link to={"/"}>
          <button>
            <BsArrowLeft />
            <span>Back</span>
          </button>
        </Link>
      </Button>
      {country && (
        <Content key={country.cca3}>
          <Flag>
            <img src={country.flags.png} alt="" />
          </Flag>
          <Info>
            <h2>{country.name.official}</h2>
            <Description>
              <LeftContent>
                <p>
                  Native Name:{" "}
                  <span>
                    {Object.values(country.name.nativeName)[0].official}
                  </span>
                </p>
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
                  Sub Region: <span>{country.subregion}</span>
                </p>
                <p>
                  Capital: <span>{country.capital}</span>
                </p>
              </LeftContent>
              <RightContent>
                <p>
                  Top Level Domain: <span>{country.tld && country.tld[0]}</span>
                </p>
                <p>
                  Currencies:{" "}
                  <span>{Object.values(country.currencies)[0].name}</span>
                </p>
                <p>
                  Languages: <span>{Object.values(country.languages)[0]}</span>
                </p>
              </RightContent>
            </Description>
            <Border>
              <h3>Border Countries:</h3>
              <BorderCountries>
                {country.borders &&
                  country.borders.map((border) => (
                    <Link to={`/detail/${border}`}>
                      <BorderCountry key={border} darkMode={darkMode}>
                        {border}
                      </BorderCountry>
                    </Link>
                  ))}
              </BorderCountries>
            </Border>
          </Info>
        </Content>
      )}
    </Container>
  );
}

export default Detail;

const darkModeBg = "background-color: rgb(32, 45, 54)";
const lightModeBg = "background-color: rgb(249, 249, 249)";

const Container = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
  ${(props) => (props.darkMode ? "color: white" : "color: black")};
  padding-inline: 50px;
  padding-bottom: 50px;

  @media only screen and (max-width: 992px) {
    padding-inline: 20px;
  }
`;

const Button = styled.div`
  height: 140px;
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-inline: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    ${(props) =>
      props.darkMode
        ? "background-color: rgb(43, 55, 67)"
        : "background-color: white"};
    ${(props) => (props.darkMode ? "color: white" : "color: black")};
    border: 1px solid rgba(249, 249, 249, 0.1);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.329) 0px 7px 29px 0px;
    font-size: 20px;
    cursor: pointer;
    transition: all 250ms;

    span {
      margin-left: 5px;
      font-size: 15px;
    }

    :hover {
      transform: scale(1.1);
      border: 1px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

const Content = styled.div`
  display: flex;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const Flag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50%;
  padding-right: 50px;

  img {
    height: 80%;
    width: 80%;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.329) 0px 7px 29px 0px;
  }

  @media only screen and (max-width: 992px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Info = styled.div`
  padding-inline: 50px;
  width: 50%;

  h2 {
    font-weight: 800;
  }

  h3 {
    font-weight: 600;
  }

  @media only screen and (max-width: 992px) {
    margin-top: 50px;
    padding-inline: 0px;
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Description = styled.div`
  display: flex;
  margin-top: 30px;

  p {
    font-weight: 600;
    line-height: 25px;
  }

  span {
    font-weight: 300;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  width: 50%;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const RightContent = styled(LeftContent)``;

const Border = styled.div`
  margin-top: 50px;
`;

const BorderCountries = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 0.3fr));
  grid-gap: 10px;

  margin-top: 10px;
`;

const BorderCountry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.darkMode
      ? "background-color: rgb(43, 55, 67)"
      : "background-color: white"};
  ${(props) => (props.darkMode ? "color: white" : "color: black")};
  border: 1px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  cursor: pointer;
  transition: all 250ms;

  :hover {
    border: 1px solid rgba(249, 249, 249, 0.8);
    transform: scale(1.1);
  }
`;
