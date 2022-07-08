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
test('detail modal is not visible by default', async () => {
  const { unmount } = display()
  const searchBtn = await waitFor(() => screen.getByTestId('viewBtn_1'))

  fireEvent(
    searchBtn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  const modal = await waitFor(() => screen.getByTestId('modal'))

  expect(modal).toBeInTheDocument()
  unmount()
})

test('detail modal is not visible by default', async () => {
  const { unmount } = display()
  const searchBtn = await waitFor(() => screen.getByTestId('viewBtn_1'))
  fireEvent(
    searchBtn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  const modal = await waitFor(() => screen.getByTestId('modal'))
  expect(modal).toBeInTheDocument()
  const closeBtn = await waitFor(() => screen.getByTestId('closeModalBtn'))
  fireEvent(
    closeBtn,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  await waitFor(() => expect(modal).toHaveClass('exit-done'))

  unmount()
})
