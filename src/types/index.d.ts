import { PropsWithChildren } from 'react'
import { AxiosRequestConfig } from 'axios'

declare global {
  interface QueryParams {
    type?: string
    page?: number | string | undefined
    name?: string
  }

  interface ApiResponse {
    /** The HTTP status code from the API response */
    status: number
    /** The HTTP status message from the API response */
    statusMessage: string
    /** The response that was provided by the API */
    data: T
  }

  interface CharactersParams extends AxiosRequestConfig {
    page?: number
    name?: string
  }
  interface Character {
    id: number
    name: string
    url: string
    created: string
    status: 'Dead' | 'Alive' | 'unknown'
    species: string
    type: string
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    origin: CharacterLocation
    location: CharacterLocation
    image: string
    episode: string[]
  }

  interface Info {
    /**
     * The API will automatically paginate the responses. You will receive up to `20` documents per page.
     */
    info?: {
      /** The length of the response */
      count: number
      /** The amount of pages */
      pages: number
      /** Link to the next page (if it exists) */
      next: string | null
      /** Link to the previous page (if it exists) */
      prev: string | null
    }
    results?: Character[]
  }
  interface UIProps extends PropsWithChildren {
    cb: (text: string | number) => void
  }
  interface ListProps extends UIProps {
    type: string
    page: number
    name?: string
    data?: Character[]
    onSelect: (element: Character) => void
  }
}
