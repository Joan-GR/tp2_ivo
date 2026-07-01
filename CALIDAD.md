# Estrategia de Calidad

## Herramientas utilizadas

- **Vitest**: framework de unit testing para TypeScript/JavaScript.
- **Playwright**: framework de testing end-to-end (E2E) que automatiza el navegador.
- **ESLint**: linter estático para detectar errores de código.
- **GitHub Actions**: pipeline de CI/CD que ejecuta lint, tests y build automáticamente.

## Tests desarrollados

### Unit tests (`src/lib/utils.test.ts`)

Se testean las funciones utilitarias de `src/lib/utils.ts`:

| Test | Descripción |
|------|-------------|
| `formatearCantidad` devuelve string vacío si cantidad es 0 | Verifica el caso borde de cantidad cero |
| `formatearCantidad` devuelve cantidad y unidad correctamente | Verifica el formato esperado |
| `formatearCantidad` devuelve string vacío si cantidad es negativa | Verifica que no se muestren valores inválidos |
| `validarItem` retorna false si el nombre está vacío | Validación de entrada requerida |
| `validarItem` retorna false si la cantidad es negativa | Validación de rango numérico |
| `validarItem` retorna true si nombre y cantidad son válidos | Caso exitoso esperado |

### Tests E2E (`e2e/main.spec.ts`)

Se testea el flujo principal de autenticación sobre el entorno de producción:

| Test | Descripción |
|------|-------------|
| Redirige a `/register` cuando el usuario no está autenticado | Verifica la protección de rutas |
| La página de login muestra el formulario correctamente | Verifica que los campos y botón estén visibles |
| Login exitoso redirige a la lista de compras | Verifica el flujo completo de autenticación (requiere credenciales) |

## Casos críticos cubiertos

- Rutas protegidas: un usuario no autenticado es redirigido automáticamente.
- Validación de datos de entrada: nombres vacíos y cantidades negativas son rechazados.
- Formato de datos: la función de formateo maneja correctamente los casos borde.

## Pipeline CI/CD

El pipeline definido en `.github/workflows/ci.yml` se ejecuta en cada push y pull request a `main` y `develop`, con los siguientes pasos en orden:

1. **Lint**: ejecuta ESLint sobre el código fuente.
2. **Test**: ejecuta los unit tests con Vitest (requiere que lint pase).
3. **Build**: compila el proyecto con Astro (requiere que los tests pasen).

## Limitaciones

- Los tests E2E requieren que la aplicación esté desplegada. Localmente apuntan a `https://tp2-ivo.vercel.app`.
- El test de login E2E requiere credenciales reales configuradas como variables de entorno (`TEST_EMAIL`, `TEST_PASSWORD`), por lo que se omite en entornos sin esas variables.
- Los unit tests cubren únicamente las funciones utilitarias. La lógica de negocio integrada con Supabase no está cubierta por tests unitarios debido a la complejidad de mockear el cliente de base de datos.
