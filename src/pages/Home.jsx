import React from "react";
import styled from "styled-components";
import CountryList from "../components/CountryList";
import Inputs from "../components/Inputs";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../features/ThemeSlice";

function Home() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <Container darkMode={darkMode}>
      <Inputs />
      <CountryList />
    </Container>
  );
}

export default Home;

//const darkModeBg = "background-color: rgb(32, 45, 54)";
const darkModeBg = "background-color: rgb(255,0,0)";
const lightModeBg = "background-color: rgb(249, 249, 249)";

const Container = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
`;
