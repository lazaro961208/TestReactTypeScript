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
      aria-busy={isPending}
      className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4 sm:p-5"
    >
      <div>
        <h3 className="text-lg font-bold text-white">Crear publicación</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          Comparte una publicación con este perfil.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <label htmlFor="post-title" className="block text-sm font-semibold text-slate-200">
          Título
        </label>
        <input
          id="post-title"
          type="text"
          disabled={isPending}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'post-title-error' : undefined}
          {...register('title')}
          className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-900/50 disabled:opacity-60"
          placeholder="Título de la publicación"
        />
        {errors.title && (
          <p id="post-title-error" role="alert" className="text-sm text-red-300">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <label htmlFor="post-body" className="block text-sm font-semibold text-slate-200">
          Contenido
        </label>
        <textarea
          id="post-body"
          rows={5}
          disabled={isPending}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? 'post-body-error' : undefined}
          {...register('body')}
          className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-900/50 disabled:opacity-60"
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
          className="mt-4 rounded-xl border border-red-900 bg-red-950/50 px-4 py-3 text-sm leading-6 text-red-200"
        >
          No se pudo crear la publicación. Los datos se conservaron para que puedas reintentar.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-2.5 font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none sm:w-auto"
      >
        {isPending && (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-slate-500 border-t-slate-200 motion-reduce:animate-none"
          />
        )}
        {isPending ? 'Publicando…' : 'Publicar'}
      </button>
    </form>
  )
}
