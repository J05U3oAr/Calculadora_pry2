import type { getKeyboardKeys } from '../keyboardKeys'
import { getKeyboardKeys as getKeys } from '../keyboardKeys'
import Button from './Button'
import './Keyboard.css'

type Props = Parameters<typeof getKeyboardKeys>[0]

const Keyboard = (props: Props) => {
  const keys = getKeys(props)

  return (
    <div className="keyboard" role="group" aria-label="Calculator keyboard">
      {keys.map(([label, variant, onClick, aria]) => (
        <Button key={aria ?? label} label={label} variant={variant} onClick={onClick} aria-label={aria} />
      ))}
    </div>
  )
}
export default Keyboard
