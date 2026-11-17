# Directorio de usuarios y publicaciones

## Descripción de la aplicación

Aplicación web desarrollada como prueba técnica con React y TypeScript. Permite consultar usuarios de JSONPlaceholder, buscarlos por nombre, seleccionar un perfil, visualizar sus publicaciones y crear publicaciones simuladas durante la sesión actual.

La interfaz incluye diseño responsive, estados de carga y error, opciones de reintento, validación accesible de formularios y pruebas automatizadas de los flujos principales.

> **Autor/a:** `[COMPLETAR POR LA PERSONA CANDIDATA]`  
> **Repositorio o URL de entrega:** `[COMPLETAR POR LA PERSONA CANDIDATA]`

## Tecnologías utilizadas

- React 19 y React DOM.
- TypeScript en modo estricto.
- Vite como servidor de desarrollo y herramienta de build.
- Tailwind CSS para los estilos.
- TanStack Query para consultas, mutaciones y caché de estado remoto.
- React Hook Form y Zod para gestión y validación del formulario.
- Fetch API para la comunicación HTTP.
- Vitest, React Testing Library y `user-event` para las pruebas.
- MSW para simular la API en los tests.
- ESLint para el análisis estático.

## Requisitos previos

- Node.js `^20.19.0` o `>=22.12.0`, según los requisitos de la versión instalada de Vite.
- npm, incluido con Node.js.
- Conexión a Internet durante el uso normal de la aplicación, ya que los datos se consultan desde JSONPlaceholder.

La entrega se verificó localmente con Node.js `22.15.1` y npm `10.9.2`.

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

El archivo `package-lock.json` fija las versiones resueltas para obtener instalaciones reproducibles.

## Ejecución en desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la URL local de la aplicación, normalmente `http://localhost:5173`.

## Ejecución de tests

```bash
npm run test
```

El comando ejecuta Vitest una vez en modo no interactivo. La suite actual contiene seis pruebas de comportamiento y no realiza peticiones a la API real: MSW simula usuarios, publicaciones, creación y errores de red.

Los casos cubiertos son:

- búsqueda de usuarios por nombre;
- búsqueda sin distinguir mayúsculas y minúsculas;
- selección de usuario y aislamiento de sus publicaciones;
- validación de campos obligatorios;
- creación exitosa y limpieza del formulario;
- error de API y reintento.

## Build de producción

```bash
npm run build
```

Este comando ejecuta primero la comprobación de TypeScript y después genera los archivos optimizados en `dist/`.

Para revisar localmente el resultado del build:

```bash
npm run preview
```

## Calidad de código

```bash
npm run lint
```

## Estructura del proyecto

```text
src/
├── components/       # Componentes visuales y estados de interfaz
├── hooks/            # Consultas y mutaciones de TanStack Query
├── services/         # Acceso a JSONPlaceholder mediante Fetch API
├── test/             # Configuración de MSW, fixtures y setup global
├── types/            # Interfaces y tipos compartidos
├── utils/            # Utilidades compartidas, disponible para extensiones
├── App.test.tsx      # Pruebas integradas de los flujos principales
├── App.tsx           # Composición de la pantalla y estado de selección
├── index.css         # Tailwind CSS y estilos globales
└── main.tsx          # Entrada de React y QueryClientProvider
```

## Funcionalidades

- Listado de usuarios obtenido desde `GET /users`.
- Búsqueda local en tiempo real por nombre, sin distinguir mayúsculas y minúsculas y sin nuevas peticiones al escribir.
- Selección accesible de un usuario con indicación visual del perfil activo.
- Publicaciones obtenidas desde `GET /posts?userId={id}`.
- Separación de la caché de publicaciones mediante una `queryKey` que contiene el ID del usuario.
- Creación simulada mediante `POST /posts` con título y contenido obligatorios.
- Validación que rechaza valores vacíos o compuestos únicamente por espacios.
- Conservación en memoria de las publicaciones creadas al cambiar de perfil o refetch durante la sesión.
- Estados de carga, error, reintento y contenido vacío.
- Diseño responsive con panel lateral en escritorio y distribución adaptada a móvil.
- Navegación por teclado, labels, estados de foco y atributos ARIA básicos.

## Decisiones técnicas

### Arquitectura sencilla por responsabilidades

Los componentes se ocupan de la presentación, los hooks encapsulan TanStack Query y los servicios concentran las llamadas con Fetch API. Esta separación mantiene la interfaz desacoplada del transporte HTTP sin introducir capas innecesarias.

### TanStack Query para el estado remoto

Usuarios y publicaciones son datos remotos, por lo que se gestionan con TanStack Query en lugar de duplicarlos en estado global. El ID forma parte de la clave de publicaciones para evitar mezclar datos al cambiar de usuario.

### Estado local para búsqueda y selección

La búsqueda y el usuario seleccionado solo afectan a la pantalla actual. Mantenerlos en `App` evita añadir una librería de estado global sin una necesidad real.

### Publicaciones locales dentro de la caché

JSONPlaceholder no persiste los `POST`. Tras una respuesta correcta, la mutación añade la publicación a la caché del usuario y le asigna un `localId` generado en el cliente. Los refetch combinan las publicaciones locales con las remotas, lo que evita perderlas durante la sesión y no depende del ID repetible que devuelve la API simulada.

### Validación compartida por React Hook Form y Zod

Zod expresa las reglas de datos y React Hook Form gestiona el estado y los errores del formulario con pocos renderizados. El uso de `trim()` garantiza que un texto compuesto únicamente por espacios no sea válido.

### Pruebas orientadas al comportamiento

Los tests interactúan con la aplicación mediante roles, labels y texto visible. MSW intercepta Fetch en el límite de red, por lo que se ejercitan componentes, hooks, servicios y caché sin depender de Internet ni probar detalles internos de React.

## Limitaciones de JSONPlaceholder

- Los `POST` se simulan, pero no se almacenan en el servidor.
- La respuesta de creación puede devolver IDs repetidos; por eso las publicaciones locales usan además un identificador generado en el cliente.
- Las publicaciones creadas se conservan solo en memoria. Se pierden al recargar o cerrar la pestaña.
- La API no representa autenticación, autorización ni reglas de negocio de un backend real.
- Los datos remotos son estáticos y no ofrecen paginación real para este caso de uso.
- La aplicación necesita acceso a JSONPlaceholder en ejecución normal; los tests son independientes de la red.

## Qué mejoraría con más tiempo

Con más tiempo, la prioridad sería revisar con mayor profundidad la experiencia de usuario y ajustar los detalles visuales, responsive y de interacción que surgieran de pruebas manuales adicionales.

No añadiría nuevas funcionalidades por iniciativa propia: el alcance actual cubre los requisitos de esta prueba técnica. Cualquier ampliación debería responder a una necesidad de producto o a nuevos requisitos previamente definidos.

## Uso de inteligencia artificial

La inteligencia artificial se utilizó como herramienta de apoyo dentro de un proceso dirigido y supervisado por el desarrollador. ChatGPT ayudó a estructurar el encargo y Codex actuó como agente de implementación durante las siete etapas incrementales. La responsabilidad sobre el alcance, los requisitos y la aceptación de los resultados permaneció en el desarrollador.

### Participación del desarrollador

- Se utilizó ChatGPT para generar y organizar un prompt de trabajo dividido en siete etapas.
- El desarrollador revisó ese prompt antes de entregar cada etapa a Codex y comprobó que las instrucciones representaran sus requisitos y expectativas.
- Después de cada implementación, el desarrollador revisó el resultado antes de autorizar la continuación con la etapa siguiente.
- Codex se utilizó como un programador asistido por IA que trabajó bajo las instrucciones, los criterios técnicos y la supervisión del desarrollador, quien asumió el rol de ingeniero de software responsable de la solución.
- Las decisiones de alcance se mantuvieron bajo control humano; la IA no recibió autorización para añadir funcionalidades fuera de las solicitadas.

### Tareas solicitadas a Codex

- Inicializar React, TypeScript estricto, Vite, Tailwind CSS y TanStack Query.
- Implementar listado, búsqueda y selección de usuarios.
- Consultar y mostrar publicaciones por usuario.
- Implementar creación de publicaciones con React Hook Form, Zod y TanStack Query.
- Conservar publicaciones simuladas durante la sesión.
- Mejorar el diseño responsive, accesibilidad básica y estados de interfaz.
- Configurar Vitest, React Testing Library y MSW, y crear pruebas de comportamiento.
- Auditar la entrega y redactar esta documentación.

### Propuestas incorporadas al repositorio

- Separación en `components`, `hooks`, `services`, `types`, `utils` y `test`.
- Uso de claves de consulta por usuario y caché de TanStack Query para el estado remoto.
- Uso de un `localId` para publicaciones creadas y combinación de datos locales y remotos en cada refetch.
- Componentes reutilizables para carga y error con reintento.
- Diseño responsive con panel de usuarios y área principal de publicaciones.
- Pruebas integradas desde `App` con red simulada mediante MSW.

Estas propuestas quedaron incorporadas después de que el desarrollador revisara los resultados de cada etapa y confirmara que cumplían sus requisitos y expectativas para continuar el proceso.

### Decisiones revisadas

Codex revisó la arquitectura, el tipado estricto, la separación de responsabilidades, las dependencias, el comportamiento de la caché y la cobertura solicitada. También ejecutó lint, tests y build durante la implementación.

El desarrollador revisó personalmente:

- la división del trabajo y el alcance de cada etapa antes de entregarla a Codex;
- los resultados generados en cada etapa antes de continuar;
- el cumplimiento de los requisitos funcionales y de sus expectativas para esta prueba;
- la decisión de mantener una arquitectura sencilla y no incorporar funcionalidades innecesarias.

No se ha documentado una matriz específica de navegadores o dispositivos utilizados durante la revisión manual. Si la entrega exige ese detalle, deberá registrarse antes de enviarla.

### Correcciones realizadas realmente

- Durante la etapa de tests, el build de TypeScript detectó que la versión instalada de MSW no aceptaba la opción `onUnhandledRequest` en `server.listen`. Se retiró esa opción y se volvieron a ejecutar satisfactoriamente tests, lint y build.
- No se modificó la lógica de producción únicamente para facilitar los tests.
- Tras revisar los resultados por etapas, el desarrollador no solicitó correcciones adicionales que deban documentarse en esta entrega.

### Alcance de la verificación asistida

Codex comprobó automáticamente compilación, lint, tests, dependencias instaladas y ausencia de archivos con nombres o patrones habituales de secretos. La automatización visual en un navegador aislado no estuvo disponible durante la etapa de interfaz, por lo que la revisión responsive y visual final debe realizarse manualmente antes de la entrega.

## Estado de la verificación final

En la última verificación automatizada:

- `npm run test`: 1 archivo y 6 tests aprobados; 0 fallidos.
- `npm run lint`: aprobado sin errores.
- `npm run build`: aprobado.
- `npm ls --depth=0`: sin dependencias faltantes o extraneous.
- Escaneo del repositorio: sin archivos de secretos ni coincidencias evidentes de credenciales.
- Archivos generados (`node_modules/`, `dist/` y `.codebase-memory/`): ignorados por Git.

Antes de enviar la prueba, se recomienda completar los datos de autoría y, si resulta necesario para la evaluación, registrar los navegadores y dispositivos utilizados en la validación manual.
