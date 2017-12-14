export const increment = ({ commit }) => commit("increment");
export const decrement = ({ commit, state }) => {
  if (state.slide <= 1) {
    return 0;
  } else {
    commit("decrement");
  }
};
export const updateState = ({ commit }, payload) => {
  commit("updateState", payload);
};

export const updateViewed = ({ commit }, payload) => {
  commit("updateViewed", payload);
};
