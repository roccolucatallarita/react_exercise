import React, { Fragment, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Searchbar } from '../components/searchbar/Searchbar'
import { List } from '../components/list/List'
import { Detail } from '../components/modal/Detail'

export const Home: React.FC = () => {
  const params: any = useParams()
  const [name] = useState(params.name)
  const [page] = useState(params.page)
  const [type] = useState(params.type)
  const [selection, setSelection] = useState<Character | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  let history = useHistory()

  useEffect(() => {
    if (selection && Object.keys(selection).length) {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [selection])

  const onNameChange = (_name: any) => {
    let newPath: string = ''
    if (!_name.length) {
      newPath = '/' + params.type + '/1'
    } else if (_name != name && _name !== 'undefined') {
      newPath = '/' + params.type + '/1/' + _name
    }
    history.push(newPath)
  }

  const onPageChange = (_page: any) => {
    let newPath: string = ''
    _page = Number(_page) > 1 ? Number(_page) : 1
    if (page != _page) {
      if (params.name && params.name?.length) {
        newPath = '/' + params.type + '/' + _page + '/' + params.name
      } else {
        newPath = '/' + params.type + '/' + _page
      }
      history.push(newPath)
    }
  }

  return (
    <Fragment>
      <Navbar />
      <h1>{params.type} list</h1>
      <Searchbar cb={onNameChange} />
      <List type={type} name={params.name} page={params.page} cb={onPageChange} onSelect={(selected: Character) => setSelection(selected)} />
      <Detail title="Details" onClose={() => setSelection(null)} show={showDetail} character={selection} />
    </Fragment>
  )
}
