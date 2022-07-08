import { PaginationState } from './types'

export const getCurrentPage = (state: PaginationState) => {
  return state.count.currentPage
}
