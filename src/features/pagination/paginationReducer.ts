/* eslint-disable @typescript-eslint/default-param-last */

import { GO_NEXT, GO_PREV, GO_FIRST } from './actionTypes'
import { PageNavigationTypes } from './types'

const initialState = {
  currentPage: 1,
}

export default (state = initialState, action: PageNavigationTypes) => {
  switch (action.type) {
    case GO_NEXT:
      return { ...state, currentPage: state.currentPage + 1 }
    case GO_PREV:
      return { ...state, currentPage: state.currentPage - 1 }
    case GO_FIRST:
      return { ...state, currentPage: 1 }
    default:
      return state
  }
}
