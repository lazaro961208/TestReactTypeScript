import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'

import App from './App'
import { users } from './test/fixtures'
import { server } from './test/server'

const API_URL = 'https://jsonplaceholder.typicode.com'

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    ),
  }
}

async function selectUser(name = 'Leanne Graham') {
  const userButton = await screen.findByRole('button', { name: new RegExp(name, 'i') })
  await userEvent.click(userButton)
}

describe('interacciones de usuarios y publicaciones', () => {
  it('filtra la lista de usuarios por nombre', async () => {
    const { user } = renderApp()

    await screen.findByText('Leanne Graham')
    await user.type(screen.getByRole('searchbox', { name: /buscar por nombre/i }), 'Clementine')

    expect(screen.getByText('Clementine Bauch')).toBeInTheDocument()
    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
    expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument()
  })

  it('filtra sin distinguir mayúsculas y minúsculas', async () => {
    const { user } = renderApp()

    await screen.findByText('Leanne Graham')
    await user.type(screen.getByRole('searchbox', { name: /buscar por nombre/i }), 'lEaNnE gRaHaM')

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument()
  })

  it('muestra solo las publicaciones del usuario seleccionado', async () => {
    renderApp()

    await selectUser('Leanne Graham')

    const postList = await screen.findByRole('list', {
      name: /publicaciones del usuario seleccionado/i,
    })
    expect(within(postList).getByText('Publicación de Leanne')).toBeInTheDocument()
    expect(screen.queryByText('Publicación de Ervin')).not.toBeInTheDocument()
  })

  it('impide enviar campos vacíos y muestra los mensajes de validación', async () => {
    const postRequest = vi.fn()
    server.use(
      http.post(`${API_URL}/posts`, () => {
        postRequest()
        return HttpResponse.json({}, { status: 201 })
      }),
    )
    const { user } = renderApp()

    await selectUser()
    await user.click(screen.getByRole('button', { name: /^publicar$/i }))

    expect(await screen.findByText(/el título es obligatorio/i)).toBeInTheDocument()
    expect(screen.getByText(/el contenido es obligatorio/i)).toBeInTheDocument()
    expect(postRequest).not.toHaveBeenCalled()
  })

  it('añade una publicación creada y limpia el formulario', async () => {
    const { user } = renderApp()
    await selectUser()

    const titleInput = screen.getByRole('textbox', { name: /título/i })
    const bodyInput = screen.getByRole('textbox', { name: /contenido/i })
    await user.type(titleInput, 'Nueva publicación local')
    await user.type(bodyInput, 'Contenido creado durante la prueba.')
    await user.click(screen.getByRole('button', { name: /^publicar$/i }))

    expect(await screen.findByText('Nueva publicación local')).toBeInTheDocument()
    expect(screen.getByText('Contenido creado durante la prueba.')).toBeInTheDocument()
    await waitFor(() => {
      expect(titleInput).toHaveValue('')
      expect(bodyInput).toHaveValue('')
    })
  })

  it('muestra el error de API y permite reintentar', async () => {
    let attempts = 0
    server.use(
      http.get(`${API_URL}/users`, () => {
        attempts += 1
        return attempts === 1
          ? new HttpResponse(null, { status: 503 })
          : HttpResponse.json(users)
      }),
    )
    const { user } = renderApp()

    expect(await screen.findByText(/no pudimos cargar los usuarios/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(attempts).toBe(2)
  })
})
