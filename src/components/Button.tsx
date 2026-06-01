import type { MouseEventHandler } from 'react'
import './Button.css'

export type ButtonVariant = 'digit' | 'operator' | 'action' | 'equals' | 'clear'

export interface ButtonProps {
  label: string
  variant?: ButtonVariant
  onClick: MouseEventHandler<HTMLButtonElement>
  'aria-label'?: string
}

const Button = ({ label, variant = 'digit', onClick, 'aria-label': ariaLabel }: ButtonProps) => (
  <button className={`calc-btn calc-btn--${variant}`} onClick={onClick} aria-label={ariaLabel ?? label} type="button">
    {label}
  </button>
)

export default Button
