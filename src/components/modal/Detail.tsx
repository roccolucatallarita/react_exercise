import React, { useEffect } from 'react'
import './Detail.css'
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { CSSTransition } from 'react-transition-group'

interface DetailProps {
  character?: Character | null
  title: string
  show: boolean
  onClose: () => void
}
export const Detail: React.FC<DetailProps> = (props) => {
  const closeOnEscapeKeyDown = (event: any) => {
    if ((event.charCode || event.keyCode) === 27) {
      props.onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div data-testid="modal" className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">
            <section>
              <img
                className="avatar"
                src={props.character?.image}
                alt={`The Rick and Morty character, ${props.character?.name}`}
              />
              <article>
                <h2>Name: {props.character?.name}</h2>
                <h4>Gender: {props.character?.gender}</h4>
                <h4>Status: {props.character?.status}</h4>
                <h4>Species: {props.character?.species}</h4>
                <h4>Origin: {props.character?.origin.name}</h4>
              </article>
            </section>
          </div>
          <div className="modal-footer">
            <button
              data-testid="closeModalBtn"
              onClick={props.onClose}
              className="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
