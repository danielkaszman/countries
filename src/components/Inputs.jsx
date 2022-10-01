import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "../features/CountrySlice";
import { setInputValue } from "../features/InputSlice";
import { setSelectValue } from "../features/SelectSlice";
import { selectDarkMode } from "../features/ThemeSlice";

function Inputs() {
  const inputField = useRef();
  const selectValue = useRef();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  async function fetchAllCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    dispatch(setCountries(data));
  }

  return (
    <Container darkMode={darkMode}>
      <InputField darkMode={darkMode}>
        <Wrap darkMode={darkMode}>
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search for a country..."
            ref={inputField}
            onChange={(event) => {
              selectValue.current.value = "all";
              dispatch(setSelectValue("all"));
              dispatch(setInputValue(event.target.value));
            }}
          />
        </Wrap>
      </InputField>
      <Select darkMode={darkMode}>
        <select
          ref={selectValue}
          onChange={(event) => {
            inputField.current.value = "";
            dispatch(setInputValue(""));
            dispatch(setSelectValue(event.target.value));
          }}
        >
          <option value="all">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </Select>
    </Container>
  );
}

export default Inputs;

const darkModeBg = "background-color: rgb(43, 55, 67)";
const lightModeBg = "background-color: white";

const darkModeColor = "color: white";
const lightModeColor = "color: black";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};

  @media screen and (max-width: 763px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 20px;
    padding-bottom: 40px;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
  box-shadow: rgba(0, 0, 0, 0.329) 0px 7px 29px 0px;
  border-radius: 10px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
  border-radius: 10px;
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};

  input {
    padding: 12px;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
    ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
    font-size: 14px;

    ::placeholder {
      ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
      font-size: 12px;
    }

    :focus {
      outline: none;
    }
  }
`;

const Select = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  select {
    padding: 12px;
    border: none;
    border-radius: 10px;
    ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
    ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.329) 0px 7px 29px 0px;
    cursor: pointer;
  }

  @media screen and (max-width: 763px) {
    select {
      margin-top: 20px;
    }
  }
`;
