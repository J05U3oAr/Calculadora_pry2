# CALC-9000 🖩

Una calculadora retro-industrial construida con React + TypeScript + Vite.

## Stack

- **Runtime / Package Manager**: [Bun](https://bun.sh)
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Tests**: Vitest + Testing Library
- **Linting**: ESLint (Standard JS + reglas custom)
- **Docs**: Storybook 8
- **CI**: GitHub Actions

## Requisitos previos

Instalar [Bun](https://bun.sh):

```bash
curl -fsSL https://bun.sh/install | bash
```

## Instalación

```bash
bun install
```

## Correr la aplicación

```bash
bun run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Correr los tests

```bash
bun test
```

Para modo watch:

```bash
bun run test:watch
```

## Correr el lint

```bash
bun run lint
```

## Correr Storybook

```bash
bun run storybook
```

Abre [http://localhost:6006](http://localhost:6006)

## Funcionalidades

- ✅ Suma, resta, multiplicación, división, módulo
- ✅ Punto decimal
- ✅ Toggle de signo (+/-)
- ✅ Límite de 9 caracteres en display
- ✅ ERROR en resultados negativos o > 999999999
- ✅ ERROR en división por cero
- ✅ Truncado de resultados con muchos decimales (ej: 22/7)
- ✅ Hook personalizado `useCalculator`
- ✅ Todos los componentes ≤ 20 líneas
- ✅ Título y favicon custom (CALC-9000)
- ✅ Atributos de accesibilidad (aria-labels, roles)

## Arquitectura

```
src/
  components/
    Button.tsx       # Botón reutilizable con variantes
    Display.tsx      # Pantalla de la calculadora
    Keyboard.tsx     # Teclado con todos los botones
    Calculator.tsx   # Componente raíz
  hooks/
    useCalculator.ts # Toda la lógica encapsulada en un hook
  stories/           # Historias de Storybook
  test/              # Tests de Vitest
```

## Reglas de linting custom

- ❌ Sin punto y coma (`semi: never`)
- ❌ Máximo 120 caracteres por línea (`max-len: 120`)
- ✅ Standard JS como base

## CI

GitHub Actions corre automáticamente lint y tests en cada push y pull request.
