# motorpararol

Motor narrativo para partidas de rol (RPG), diseñado para asistir tanto en modo solitario como en entornos cooperativos o tradicionales. Facilita la creación, evolución y gestión de contenido narrativo dinámico mediante estructuras de datos claras y el apoyo de inteligencia artificial.

> La aplicación no sustituye la creatividad del jugador o del director de juego, sino que la potencia mediante herramientas que permiten improvisar, generar contexto y mantener coherencia narrativa.

---

## Tech Stack

- **Runtime:** Node.js 20+ (ESM)
- **Lenguaje:** TypeScript 5
- **Backend:** Express
- **Monorepo:** PNPM workspaces
- **Testing:** Vitest + Supertest
- **Calidad:** ESLint, Prettier, EditorConfig
- **Hooks:** Husky + lint-staged
- **Dev:** tsx

Futuro: PostgreSQL, Prisma, Docker, CI/CD.

---

## Estructura del repositorio

```
motorpararol/
├─ apps/
│  └─ api/                  → backend (Express)
│     └─ src/
│        ├─ domain/         → entidades y contratos de repositorio
│        ├─ application/    → casos de uso
│        ├─ infrastructure/ → HTTP, persistencia, adaptadores externos
│        ├─ app.ts          → composición de la app Express
│        └─ server.ts       → entry point
├─ packages/                → (reservado para paquetes compartidos)
├─ docs/                    → documentación de producto
├─ tsconfig.base.json       → configuración TS compartida
└─ pnpm-workspace.yaml
```

La arquitectura sigue principios de Clean Architecture: el dominio no conoce la infraestructura, la aplicación orquesta el dominio, la infraestructura implementa los adaptadores concretos.

---

## Requisitos

- Node.js `>= 20`
- PNPM `>= 9`

```bash
node --version   # v20+
pnpm --version   # 9+
```

---

## Primeros pasos

```bash
pnpm install
pnpm dev         # arranca apps/api en modo watch (tsx)
```

La API queda expuesta por defecto en `http://localhost:3000`.

Prueba rápida:

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/v1/sessions -H "Content-Type: application/json" -d '{}'
curl http://localhost:3000/v1/sessions
```

---

## Scripts

| Comando             | Descripción                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Arranca la API en modo watch               |
| `pnpm build`        | Compila todos los paquetes del monorepo    |
| `pnpm typecheck`    | Verifica los tipos en todo el monorepo     |
| `pnpm lint`         | Ejecuta ESLint sobre `apps/` y `packages/` |
| `pnpm lint:fix`     | Corrige automáticamente lo que se pueda    |
| `pnpm format`       | Aplica Prettier a todos los ficheros       |
| `pnpm format:check` | Comprueba formato sin escribir             |
| `pnpm test`         | Ejecuta la suite de tests (Vitest)         |
| `pnpm test:watch`   | Ejecuta Vitest en modo watch               |

---

## API (MVP)

Todas las rutas están bajo el prefijo `/v1/`.

| Método | Ruta           | Descripción     |
| ------ | -------------- | --------------- |
| `GET`  | `/health`      | Health check    |
| `POST` | `/v1/sessions` | Crea una sesión |
| `GET`  | `/v1/sessions` | Lista sesiones  |

Próximas (MVP en curso): `/v1/scenes`, `/v1/scenes/:id/pnjs`, `/v1/oracle`.

---

## Flujo de trabajo con ramas

El proyecto usa un flujo simplificado inspirado en GitHub Flow:

- **`main`** → rama estable. Solo recibe merges vía Pull Request. Refleja lo que está listo para producción.
- **`develop`** → rama de integración continua. Todas las features se mergean aquí antes de subir a `main`.
- **`feature/<nombre>`** → trabajo nuevo. Nace de `develop`, vuelve a `develop` vía PR.
- **`fix/<nombre>`** → correcciones de bugs. Mismo flujo que `feature/*`.
- **`chore/<nombre>`** → tooling, configuración, mantenimiento.
- **`hotfix/<nombre>`** → correcciones urgentes sobre `main`. Se mergean a `main` y a `develop`.

### Convención de commits

Sigue [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:   nueva funcionalidad
fix:    corrección de bug
chore:  tooling, dependencias, configuración
docs:   documentación
refactor: cambio sin alterar comportamiento
test:   añadir o corregir tests
```

### Flujo típico

```bash
git checkout develop
git pull
git checkout -b feature/scenes-endpoint
# ... trabajo ...
git add .
git commit -m "feat: add scenes endpoint"
git push -u origin feature/scenes-endpoint
# abrir PR → develop
```

---

## Testing

La estrategia de testing se organiza por capas:

| Nivel       | Qué se testea               | Herramienta        |
| ----------- | --------------------------- | ------------------ |
| Unitario    | Casos de uso (Application)  | Vitest             |
| Unitario    | Entidades y reglas (Domain) | Vitest             |
| Integración | Repositorios y adaptadores  | Vitest             |
| E2E         | Rutas HTTP completas        | Vitest + Supertest |

El Domain y Application deben tener cobertura de tests antes de considerar una feature completa.

---

## Documentación

Documentación extensa del proyecto (arquitectura, API, visión, modelo de datos) en:

- `docs/` → documentación viva del producto

---

## Licencia

UNLICENSED — proyecto privado en desarrollo.
