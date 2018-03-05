import styled from 'styled-components'
import React from 'react'
export const TreeUI = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row-revers
`

export const CanvasEl = styled.canvas`
    position: absolute;
    left: 0;
    right: 0;

`


export const RoundUI = styled.section`
    font: 300 15px $font-stack;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 0 20px;
    min-height: ${({ roundHeight }) => (`${roundHeight}px`)}; 
    flex-basis: 200px;
    position: relative;
    z-index: 2;
    pointer-events: none;
    margin-left: ${({ collapse }) => (collapse || undefined)};
`

export const RoundTitle = styled.div`
    position: absolute;
    top: 0;
    padding: 15px 10px;
    width: calc(100% - 2.5px);
    text-align: center;
    background: grey;
    color: #ffffff;
`

export const TeamUI = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 40px;
    width: ${({ teamWidth }) => (teamWidth || 160)}px;
    cursor: pointer;
    border-left: 10px solid #DDD;
    transition: .2s;
    box-shadow: inset 0 40px 0 rgba(255, 255, 255, 0);
    border: ${({ active, primaryColor }) => active && `2px solid ${primaryColor || 'green'}`};
    &:hover {
        background: #CFC59A;
        color: #FFF !important;
        box-shadow: inset 0 40px 0 rgba(255, 255, 255, .2);
    }
    background: ${({ lose }) => (lose && '#F7F7F7')};
    color: ${({ lose }) => '#BBB'};
`

export const TeamPlaceUI = styled.span`
    position: absolute;
    font-size: 12px;
    height: 25px;
    padding: 5px;
    background: ${({ bg }) => (bg)};
    color: ${({ color }) => (color)};
    min-width: 25px;
    /* line-height: 30px; */
    right: -40px;
    text-align: center;
    width: 30px;
    top: calc(50% - 12.5px);
    &::after {
    content: ''; 
    position: absolute;
    left: -14px; top: calc(50% - 7px);
    border: 7.5px solid transparent;
    border-right: 7.5px solid ${({ bg }) => (bg)};
   }
`
const width = 30

export const MapScoreWrap = styled.div`
    position: absolute;
    right: -${({ scoreLength }) => (scoreLength * width)}px;
    height: 30px;
    display: flex;
    background: rgba(50, 50, 50, .8);
    z-index: 10;
`
export const SmallTeamLogo = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 5px;
    display: inline-block;
`
export const MapScore = styled.div`
    width: 30px;
    height: 30px;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    position: relative;
    color: ${({ paired, count }) => (paired && ((count % 2) === 0) ? '#ffffff' : (!paired && ((count % 2) !== 0) ? '#ffffff' : '#999'))};
`

export const TeamScore = styled.span`
    font-size: 10px;
    color: #999;
    flex: 0 1 30px;
    text-align: center;
    transition: .2s;
    &:hover {
        color: #FFF;
    }
`

export const TeamPlace = ({ place }) => (
    place === 1 ? <TeamPlaceUI bg={'yellow'} color={'grey'}>1st</TeamPlaceUI> :
        place === 2 ? <TeamPlaceUI bg={'grey'} color={'#000000'}>2nd</TeamPlaceUI> :
            place === 3 ? <TeamPlaceUI bg={'grey'} color={'#000000'}>3rd</TeamPlaceUI> :
                place ? <TeamPlaceUI bg={'grey'} color={'#000000'}>{place}th</TeamPlaceUI> : null
)
export const TeamName = styled.span`
    flex: 1 1 auto;
    white-space: nowrap;           
    overflow: hidden;
    text-overflow: ellipsis;
`

export const GameUI = styled.article`
    background: #FFF;
    border-radius: 3px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 80px;
    pointer-events: auto;
`