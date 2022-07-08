import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const params:QueryParams = useParams()
  return (
    <nav>
      <div>
        <NavLink to="/">
          Rick and Morty
        </NavLink>
        <ul className="right">
          <li>
          {params.type === 'favourite' ?
              <NavLink to="/characters/1">Show full list</NavLink>
              : <NavLink to="/favourite/1">Show favourites</NavLink>
            }
            </li>
        </ul>
      </div>
    </nav>
  )
}