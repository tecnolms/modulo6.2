export const count = state => state.slide;

export const prevSlide = state => {
  if (state.slide <= "1") {
    return "0";
  } else {
    return "" + (Number(state.slide) - 1);
  }
};

export const nextSlide = state => {
  var isUnder = state.slide < state.totalSlides;
  if (isUnder) {
    var next = "" + (Number(state.slide) + 1);
    return next;
  } else {
    return state.totalSlides;
  }
};

export const progress = state => {
  if (state.slide == 0) {
    return 0;
  } else {
    return "" + state.slide * 100 / state.totalSlides;
  }
};

export const total = state => state.totalSlides;

export const viewed = state => state.viewedSlides;
