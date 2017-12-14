import Vue from 'vue'
import VueX from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import course from '../course/course'

Vue.use(VueX)

const state = {
  slide: 0,
  totalSlides: course.qtySlides,
  viewedSlides: []
}

const store = new VueX.Store({
  state,
  getters,
  actions,
  mutations
})

export default store