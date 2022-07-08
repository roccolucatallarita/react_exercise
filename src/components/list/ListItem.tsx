import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-redeclare
import CSS from 'csstype'
interface ListItemProps {
  character: Character
  isFavourite: boolean
  onToggle: (text: string | number) => void
  onSelect: (charcter: Character) => void
}
export const ListItem: React.FC<ListItemProps> = (props) => {
  const value = props.character
  const favBtnStyles: CSS.Properties = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    float: 'right',
    flex: 1,
    textDecoration: 'underline',
    display: 'inline',
  }
  const rowContainerStyle: CSS.Properties = {
    borderBottomStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: '1px',
    flex: 1,
    cursor: 'pointer',
    margin: '5px',
    padding: '5px',
    display: 'block',
  }
  const elementContainerStyle: CSS.Properties = {
    flex: 1,
    cursor: 'pointer',
    display: 'inline',
  }
  return (
    <section style={rowContainerStyle} key={value.id + ''}>
      <div style={elementContainerStyle}>{value.name} </div>
      <button
        data-testid={'viewBtn_' + value.id}
        style={favBtnStyles}
        onClick={() => {
          props.onSelect(value)
        }}
      >
        View
      </button>
      <button
        style={favBtnStyles}
        onClick={(e) => {
          e.preventDefault()
          props.onToggle(value.id)
          return false
        }}
      >
        {props.isFavourite ? 'Remove from favourite' : 'Add to favourite'}
      </button>
    </section>
  )
}
