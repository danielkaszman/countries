import React from "react";
import styled from "styled-components";
import { MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, selectDarkMode } from "../features/ThemeSlice";
import { MdOutlineQuiz } from "react-icons/md";

function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const navigate = useNavigate();

  return (
    <Container darkMode={darkMode}>
      <Title
        darkMode={darkMode}
        onClick={() => {
          navigate("/");
        }}
      >
        <h2>Where in the world?</h2>
      </Title>

      <Quiz
        darkMode={darkMode}
        onClick={() => {
          navigate("/quiz");
        }}
      >
        <MdOutlineQuiz />
        <p>Start Quiz</p>
      </Quiz>

      <Theme darkMode={darkMode}>
        <p onClick={() => dispatch(setDarkMode(!darkMode))}>
          <MdOutlineDarkMode />
          {darkMode && <span>Light Mode</span>}
          {darkMode || <span>Dark Mode</span>}
        </p>
      </Theme>
    </Container>
  );
}

export default Navbar;

const darkModeBg = "background-color: rgb(43, 55, 67)";
const lightModeBg = "background-color: white";

const darkModeColor = "color: white";
const lightModeColor = "color: black";

const Container = styled.nav`
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  ${(props) => (props.darkMode ? darkModeBg : lightModeBg)};
  font-weight: 800;
  padding-inline: 50px;
  z-index: 10;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.329) 0px 7px 29px 0px;

  display: flex;
  align-items: center;

  @media screen and (max-width: 763px) {
    padding-inline: 20px;
  }
`;

const Title = styled.div`
  ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
  cursor: pointer;

  @media screen and (max-width: 763px) {
    font-size: 10px;
  }
`;

const Quiz = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;

  svg {
    ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
    margin-right: 5px;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
    font-weight: 600;
    cursor: pointer;
  }

  @media screen and (max-width: 763px) {
    font-size: 13px;
  }
`;

const Theme = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => (props.darkMode ? darkModeColor : lightModeColor)};
    font-weight: 600;
    cursor: pointer;

    span {
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 763px) {
    font-size: 13px;
  }
`;
