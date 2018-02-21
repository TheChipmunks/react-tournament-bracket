export const calcRight = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().left) + object.clientWidth + object.clientLeft,
      y: object.offsetTop + object.clientHeight / 2
    };
  }

  export const calcLeft = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().left),
      y: object.offsetTop + object.clientHeight / 2
    }
  }

  export const  calcCenter = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().x) + object.clientWidth / 2,
      y: object.offsetTop + object.clientHeight / 2
    };
  }