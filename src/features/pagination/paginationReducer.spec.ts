import { GO_NEXT, GO_PREV } from './actionTypes'
import paginationReducer from './paginationReducer'
import { PageNavigationTypes } from './types'

describe('features > pagination > paginationReducer', () => {
  it(`increments page, if ${GO_NEXT} action is provided`, () => {
    const initialState = {
      currentPage: 1,
    }

    const expectedState = {
      currentPage: 2,
    }

    const action: PageNavigationTypes = {
      type: GO_NEXT,
    }

    expect(paginationReducer(initialState, action)).toEqual(expectedState)
  })

  it(`increments page, if ${GO_PREV} action is provided`, () => {
    const initialState = {
      currentPage: 2,
    }

    const expectedState = {
      currentPage: 1,
    }

    const action: PageNavigationTypes = {
      type: GO_PREV,
    }

    expect(paginationReducer(initialState, action)).toEqual(expectedState)
  })
})
