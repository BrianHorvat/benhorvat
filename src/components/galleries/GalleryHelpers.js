const states = Object.freeze({
  IDLE: 1,
  ENTER: 2,
  LEAVE: 3,
  ANIMATING: 4,
  DRAGGING: 5
});

const animTypes = Object.freeze({
  PAGE_RESET: 1,
  PAGE_LEFT: 2,
  PAGE_RIGHT: 3
});

const durations = Object.freeze({
  enter: 300,
  exit: 300,
  page: 300,
  pagePartial: 150
});

const easingPoints = [0.4, 0.0, 0.2, 1];

const easing = `cubic-bezier(${easingPoints[0]}, ${easingPoints[1]}, ${
  easingPoints[2]
}, ${easingPoints[3]})`;

const animatePromise = (element, ...animParams) => {
  let animation;
  const promise = new Promise(resolve => {
    animation = element.animate.apply(element, animParams);
    animation.onfinish = resolve;
  });

  return {
    animation,
    promise
  };
};

export { states, animTypes, durations, easing, easingPoints, animatePromise };
