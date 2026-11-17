import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreatePost } from '../hooks'

const createPostSchema = z.object({
  title: z.string().trim().min(1, 'El título es obligatorio.'),
  body: z.string().trim().min(1, 'El contenido es obligatorio.'),
})

type CreatePostFormValues = z.infer<typeof createPostSchema>

interface CreatePostFormProps {
  userId: number
}

export function CreatePostForm({ userId }: CreatePostFormProps) {
  const { mutateAsync, isPending, isError } = useCreatePost()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync({ userId, ...values })
      reset()
    } catch {
      // La mutación expone el error y el formulario conserva sus valores.
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-5"
    >
      <h3 className="text-lg font-semibold text-slate-100">
        Crear publicación
      </h3>

      <div className="mt-4 space-y-2">
        <label htmlFor="post-title" className="block text-sm font-medium text-slate-200">
          Título
        </label>
        <input
          id="post-title"
          type="text"
          disabled={isPending}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'post-title-error' : undefined}
          {...register('title')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Título de la publicación"
        />
        {errors.title && (
          <p id="post-title-error" role="alert" className="text-sm text-red-300">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <label htmlFor="post-body" className="block text-sm font-medium text-slate-200">
          Contenido
        </label>
        <textarea
          id="post-body"
          rows={5}
          disabled={isPending}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? 'post-body-error' : undefined}
          {...register('body')}
          className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Escribe el contenido"
        />
        {errors.body && (
          <p id="post-body-error" role="alert" className="text-sm text-red-300">
            {errors.body.message}
          </p>
        )}
      </div>

      {isError && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-200"
        >
          No se pudo crear la publicación. Los datos se conservaron para que puedas reintentar.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Publicando…' : 'Publicar'}
      </button>
    </form>
  )
}
