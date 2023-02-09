import styled from "styled-components";
import image from "../imgs/imgEight.png";
import vsm from "../imgs/vsm.png";

export const Bg = styled.div`
  background: url(${image});
  height: 100vh;
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;

  @media (min-width: 480px) and (max-width: 767px) {
    height: 70vh;
    width: 100%;
    background-position: center;
  }

  @media (min-width: 320px) and (max-width: 479px) {
    height: 70vh;
    width: 100%;
  }
`;
export const BgHero = styled.div`
  background: url(${image});
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;

  @media (min-width: 480px) and (max-width: 767px) {
    height: 100vh;
    width: 100%;
    background-position: center;
  }

  @media (min-width: 320px) and (max-width: 479px) {
    height: 100vh;
    width: 100%;
  }
`;

export const VsmBg = styled.div`
  background: url(${vsm});
  height: 100vh;
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;

  @media (min-width: 480px) and (max-width: 767px) {
    height: 70vh;
    width: 100%;
    display: none;
  }

  @media (min-width: 320px) and (max-width: 479px) {
    height: 70vh;
    width: 100%;
    display: none;
  }
`;

export const VsmBgHero = styled.div`
  background: url(${vsm});
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;

  @media (min-width: 480px) and (max-width: 767px) {
    height: 100vh;
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 479px) {
    height: 100vh;
    width: 100%;
  }
`;
