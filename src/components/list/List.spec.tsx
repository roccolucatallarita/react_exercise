import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './../../App'
import { Provider } from 'react-redux'
import store from './../../store'

const display = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
test('prev button is disabled on page 1', async () => {
  const { unmount } = display()

  const prevBtn = await waitFor(() => screen.getByTestId('prevPageBtn'))
  expect(prevBtn).toBeDisabled()
  unmount()
})

test('next button is enabled', async () => {
  const { unmount } = display()
  console.log(location.pathname)
  const prevBtn = await waitFor(() => screen.getByTestId('nextPageBtn'))
  await waitFor(() => expect(prevBtn).toBeEnabled())
  unmount()
})

test('click on next btn should update url', async () => {
  const { unmount } = display()
  console.log(location.pathname)
  const prevBtn = await waitFor(() => screen.getByTestId('nextPageBtn'))
  await waitFor(() => expect(prevBtn).toBeEnabled())
  fireEvent(
    prevBtn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(location.pathname).toBe('/characters/2')
  unmount()
})
test('prev button is enabled on page 2', async () => {
  const { unmount } = display()

  const prevBtn = await waitFor(() => screen.getByTestId('prevPageBtn'))
  await waitFor(() => expect(prevBtn).toBeEnabled())
  unmount()
})
