import styled from "styled-components";
import React from "react";
import { _const } from "./const";
export const TreeUI = styled.div.attrs({
  className: `${_const.theme}_tree`
})``;

export const DoubleRoundWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const DoubleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const ScrollUI = styled.div.attrs({
  className: `${_const.theme}_scroll`
})``;

export const CanvasEl = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
`;

export const RoundUI = styled.section.attrs({
  className: `${_const.theme}_round`
})`
  display: ${({ isHide }) => (isHide ? "none" : "flex")};
  min-height: ${({ roundHeight }) =>
    roundHeight ? `${roundHeight}px` : "initial"};
  margin-left: ${({ collapse }) => collapse || undefined};
`;

export const RoundTitle = styled.div`
  position: static;
  top: 0;
  padding: 5px 10px;
  width: 100%;
  max-width: 150px;
  text-align: center;
  background: #303030;
  color: #ffffff;
  border: 1px solid black;
  min-height: 31px;
  align-self: flex-start;
`;

export const Flag = ({ flagname }) => (
  <i className={`flag flag-24 svg--${flagname} ng_dib ng_vam`} />
);

export const TeamUI = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 30px;
  cursor: pointer;
  width: 144px;
  position: relative;
  padding: 0 0 0 5px;
  background: #000000;
  box-shadow: inset 0 40px 0 rgba(255, 255, 255, 0);
  color: ${({ lose }) => (lose ? "#999" : "#ffffff")};
  border: ${({ lose }) => (lose ? "3px solid #303030" : "3px solid #1e1e1e")};
  border: ${({ active, primaryColor }) =>
    active && `3px solid ${primaryColor || "3px solid #1e1e1e"}`};
  color: ${({ active }) => active && `#ffffff !important`};
`;

export const SmallTeamLogo = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
  display: inline-block;
`;
const width = 30;

export const MapScoreWrap = styled.div`
  position: absolute;
  right: -${({ scoreLength }) => scoreLength * 30 + 7.5}px;
  height: 30px;
  display: flex;
  background: rgba(50, 50, 50, 1);
  z-index: 5;
`;
export const MapScore = styled.div`
  width: 30px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  line-height: 30px;
  position: relative;
  color: ${({ winner, howTeam }) => (winner === howTeam ? "#ffffff" : "#999")};
`;

export const TeamScore = styled.span`
  font-size: 12px;
  color: #999;
  flex: 0 1 30px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  color: ${({ lose }) => (lose ? "#999" : "#ffffff")};
  background: ${({ lose }) => (lose ? "#303030" : "#1e1e1e")};
  background: ${({ active, primaryColor }) =>
    active && `${primaryColor || "#1e1e1e"}`};
  color: ${({ active }) => active && `#ffffff !important`};
  &:hover {
    color: #fff;
  }
`;
export const TeamName = styled.span`
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 103px;
`;

export const TeamPlaceUI = styled.span`
  position: absolute;
  font-size: 12px;
  height: 25px;
  padding: 5px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  min-width: 25px;
  /* line-height: 30px; */
  right: -40px;
  text-align: center;
  width: 30px;
  top: calc(50% - 12.5px);
  &::after {
    content: "";
    position: absolute;
    left: -14px;
    top: calc(50% - 7px);
    border: 7.5px solid transparent;
    border-right: 7.5px solid ${({ bg }) => bg};
  }
`;

export const TeamPlace = ({ place }) =>
  place == 1 ? (
    <TeamPlaceUI bg={"yellow"} color={"grey"}>
      1st
    </TeamPlaceUI>
  ) : place == 2 ? (
    <TeamPlaceUI bg={"grey"} color={"#000000"}>
      2nd
    </TeamPlaceUI>
  ) : place == 3 ? (
    <TeamPlaceUI bg={"grey"} color={"#000000"}>
      3rd
    </TeamPlaceUI>
  ) : place ? (
    <TeamPlaceUI bg={"grey"} color={"#000000"}>
      {place}th
    </TeamPlaceUI>
  ) : null;

export const GameUI = styled.article`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  width: 144px;
  min-height: 60px;
  margin-bottom: 15px;
  margin-top: 15px;
  align-self: baseline;
  pointer-events: auto;
  ${({ isBronzeGame }) =>
    isBronzeGame ? "position: absolute; top: calc(50% + 80px)" : undefined};
`;
