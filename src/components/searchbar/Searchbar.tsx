import React, { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionTypes } from '../../features/pagination'
import './Searchbar.css'

export const Searchbar: React.FC<UIProps> = (props) => {
  const dispatch = useDispatch()
  const params: QueryParams = useParams()
  const [name, setName] = useState(params.name || '')

  const onSearchCLick = () => {
    props.cb(name || '')
    dispatch({ type: actionTypes.GO_FIRST })
  }

  const onNameChange = function (event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement
    const value = target.value
    setName(value)
  }

  return (
    <div className="row">
      <input
        data-testid="searchInput"
        id="queryInput"
        autoFocus
        placeholder="Search your best character"
        type="text"
        value={name}
        onChange={(e) => onNameChange(e)}
      />
      <button
        data-testid="searchBtn"
        className="button"
        onClick={onSearchCLick}
      >
        Search
      </button>
    </div>
  )
}
