import {  GO_NEXT, GO_PREV , GO_FIRST} from './actionTypes'

interface NextPage {
  type: typeof GO_NEXT
}
interface PreviousPage {
  type: typeof GO_PREV
}

interface FirstPage {
  type: typeof GO_FIRST
}
export type PageNavigationTypes = NextPage | PreviousPage | FirstPage

export interface PaginationState {
  count: {
    currentPage: number
  }
}
