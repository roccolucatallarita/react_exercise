import { getCharacters } from '../../api/RaM'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionTypes, selectors } from '../../features/pagination'
import { ListItem } from './ListItem'

export const List: React.FC<ListProps> = (props) => {
  const currentPage = useSelector(selectors.getCurrentPage)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(page)
  const dispatch = useDispatch()

  const [characters, setCharacters] = useState<Character[]>()

  const params: QueryParams = useParams()

  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem('favourite') || '[]')
  })
  const fetchData = () => {
    let path = 'character'
    let charactersParams: CharactersParams = {
      page: props.page,
    }
    if (params.name?.length) {
      charactersParams.name = params.name
    }
    if (params.type === 'favourite') {
      charactersParams = {}
      setPage(1)
      if (!favourites.length) {
        setLastPage(1)
        setCharacters([])
        return
      } else {
        path += '/' + favourites.join(',')
      }
    }

    getCharacters(path, { params: charactersParams }).then((data) => {
      setLastPage(Number(data.info?.pages) || 1)
      const charactersData =
        params.type === 'favourite'
          ? (data as Character).id
            ? [data as Character]
            : (data as Character[])
          : data.results
      setCharacters(charactersData)
    })
  }
  useEffect(() => {
    props.cb(params.page || 1)
  }, [params.page])

  useEffect(() => {
    fetchData()
  }, [params])

  useEffect(() => {
    if (currentPage != page) {
      setPage(currentPage)
    }

    props.cb(currentPage.toString())
  }, [currentPage])
  const favouriteToggle = (id: any) => {
    let myFav = [...favourites]
    let exist = myFav.indexOf(id)
    if (exist === -1) {
      myFav.push(id)
    } else {
      myFav.splice(exist, 1)
    }
    localStorage.setItem('favourite', JSON.stringify(myFav))
    setFavourites(myFav)
    if (params.type === 'favourite') {
      const newList = characters?.filter((item) => item.id !== id)
      setCharacters(newList)
    }
  }

  return (
    <div>
      <section>
        {characters?.map((value) => {
          const isFavourite = favourites.indexOf(value.id) > -1
          return (
            <ListItem
              key={value.id}
              onSelect={props.onSelect}
              onToggle={favouriteToggle}
              character={value}
              isFavourite={isFavourite}
            ></ListItem>
          )
        })}
      </section>
      <section>
        <div className="group">
          <button
            type="button"
            data-testid="prevPageBtn"
            disabled={currentPage <= 1 === true}
            onClick={() => dispatch({ type: actionTypes.GO_PREV })}
          >
            Prev
          </button>
          Current page {currentPage} of {lastPage}
          <button
            type="button"
            data-testid="nextPageBtn"
            disabled={currentPage >= lastPage === true}
            onClick={() => dispatch({ type: actionTypes.GO_NEXT })}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
