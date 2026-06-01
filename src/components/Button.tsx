import type { FC, MouseEventHandler } from 'react'
import './Button.css'

export type ButtonVariant = 'digit' | 'operator' | 'action' | 'equals' | 'clear'

interface Props {
  label: string
  variant?: ButtonVariant
  onClick: MouseEventHandler<HTMLButtonElement>
  'aria-label'?: string
}

const Button: FC<Props> = ({ label, variant = 'digit', onClick, 'aria-label': ariaLabel }) => (
  <button
    className={`calc-btn calc-btn--${variant}`}
    onClick={onClick}
    aria-label={ariaLabel ?? label}
    type="button"
  >
    {label}
  </button>
)

export default Button
