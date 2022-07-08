import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const display = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

test('display a record present on first page', async () => {
  const { unmount } = display()
  const element = await waitFor(() =>
    screen.getByText(/Abadango Cluster Princess/i)
  )
  expect(element).toBeInTheDocument()
  unmount()
})

test('search bar is present', async () => {
  const { unmount } = display()
  const element = await waitFor(() => screen.getByTestId('searchInput'))
  expect(element).toBeInTheDocument()
  unmount()
})

test('search a character and check if is present', async () => {
  const { unmount } = display()
  const valueToSearch = 'Aqua Morty'
  const input = await waitFor(() => screen.getByTestId('searchInput'))
  const searchBtn = screen.getByTestId('searchBtn')
  fireEvent.change(input, { target: { value: valueToSearch } })
  fireEvent(
    searchBtn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  const rercord = await waitFor(() =>
    screen.getByText(new RegExp(valueToSearch))
  )
  expect(rercord).toBeInTheDocument()
  unmount()
})
