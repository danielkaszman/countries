import React from "react";
import styled from "styled-components";

function CountryListSkeleton() {
  const numberOfSkeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {numberOfSkeletons.map((index) => (
        <Country key={index}>
          <Img />
          <Info>
            <H2 />
            <P1 />
            <P />
            <P2 />
          </Info>
        </Country>
      ))}
    </>
  );
}

export default CountryListSkeleton;

const Country = styled.div`
  display: flex;
  flex-direction: column;

  height: 300px;
  border-radius: 20px;
  border: 1px solid;
  background-color: transparent;
  overflow: hidden;
  animation: skeleton-border-loading 500ms linear infinite alternate;
`;

const Img = styled.div`
  height: 50%;
  width: 100%;
  animation: skeleton-bg-loading 500ms linear infinite alternate;
`;

const Info = styled.div`
  padding: 20px;
  height: 50%;
`;

const H2 = styled.div`
  margin-bottom: 20px;
  height: 10px;
  width: 50%;
  animation: skeleton-bg-loading 500ms linear infinite alternate;
`;

const P = styled.div`
  margin-bottom: 10px;
  height: 8px;
  width: 100%;
  animation: skeleton-bg-loading 500ms linear infinite alternate;
`;

const P1 = styled(P)`
  width: 95%;
  margin-left: 5%;
`;

const P2 = styled(P)`
  width: 80%;
`;
