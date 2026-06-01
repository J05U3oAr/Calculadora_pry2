# CALC-9000

Calculadora hecha con React, TypeScript y Vite.

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion

```bash
npm install
```

## Correr la aplicacion

```bash
npm run dev
```

Luego abre `http://localhost:5173`.

## Correr los tests

```bash
npm test
```

Para modo watch:

```bash
npm run test:watch
```

## Correr el lint

```bash
npm run lint
```

## Correr Storybook

```bash
npm run storybook
```

Luego abre `http://localhost:6006`.

## Funcionalidades

- Suma, resta, multiplicacion, division y modulo
- Punto decimal
- Funcion `+/-`
- Limite de 9 caracteres en el display
- Estado `ERROR` para resultados negativos o mayores a `999999999`
- Estado `ERROR` en division o modulo por cero
- Hook personalizado `useCalculator`
- Tests con Vitest y Testing Library
- Historias de Storybook para componentes principales
- Lint con Standard JS, sin punto y coma y maximo de 120 caracteres por linea
- CI con GitHub Actions para tests y lint

## Estructura

```text
src/
  components/
    Button.tsx
    Display.tsx
    Keyboard.tsx
    Calculator.tsx
  hooks/
    useCalculator.ts
  stories/
  test/
```
