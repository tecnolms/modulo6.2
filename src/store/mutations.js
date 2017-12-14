export const increment = state => {
  state.slide++;
};
export const decrement = state => {
  state.slide >= 1 ? state.slide-- : (state.slide = 0);
};
export const updateState = (state, payload) => {
  state.slide = payload;
};
export const updateViewed = (state, payload) => {
  state.viewedSlides = [];
  for (let index = 1; index <= payload; index++) {
    state.viewedSlides.push(index);
  }
};
