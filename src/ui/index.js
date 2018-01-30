import styled from 'styled-components'

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
    min-height: ${({roundHeight}) => (`${roundHeight}px`)}; 
    flex-basis: 200px;
    position: relative;
    z-index: 2;
    pointer-events: none;
    margin-left: ${({ collapse }) => ( collapse || undefined)};
`

export const TeamUI = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 40px;
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