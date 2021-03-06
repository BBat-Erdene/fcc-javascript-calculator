
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addChar, removeLastChar, selectFormulaScreen, reset as resetFormulaScreen } from '../features/formulaScreenSlice'
import { reset, addChar as addCharToOutputScreen, selectOutputScreen } from '../features/outputScreenSlice'

export const OperatorKey = (props: OperatorKeyProps) => {
  const dispatch = useAppDispatch()
  const formulaScreen = useAppSelector(selectFormulaScreen)
  const outputScreen = useAppSelector(selectOutputScreen)

  const handleClick = () => {
    if ( formulaScreen.includes('=')) {
      dispatch(resetFormulaScreen())
      dispatch(addChar(outputScreen))
      dispatch(addChar(operatorKeys[props.children]))
      dispatch(reset())
      dispatch(addCharToOutputScreen('0'))
      return
    }
    dispatch(reset())
    dispatch(addCharToOutputScreen('0'))
    if ( formulaScreen ) {
      if ( !Object.values(operatorKeys).includes(formulaScreen.slice(-1))) {
        dispatch(addChar(operatorKeys[props.children]))
      } else {
        const lastOneWithChildren = formulaScreen.slice(-1) + props.children
        const lastTwo = formulaScreen.slice(-2)
        const regex = new RegExp(`[^-]-`)
        const joinedOperators = Object.values(operatorKeys).join('')
        const regexLastTwo = new RegExp(`[${joinedOperators}]{2}`)
        if (regexLastTwo.test(lastTwo)) {
          dispatch(removeLastChar())
          dispatch(removeLastChar())
          dispatch(addChar(operatorKeys[props.children]))
        }

        if( !regex.test(lastOneWithChildren) || props.children !== '-') dispatch(removeLastChar())
        dispatch(addChar(operatorKeys[props.children]))
      }
    }
  }

  return (
    <div className="bg-dim-gray flex items-center justify-center hover:outline-grey" onClick={handleClick} id={props.id}>
      {props.children}
    </div>
  )
}

interface OperatorKeyProps {
  children: string,
  id: string,
}

export const operatorKeys: {[key: string]: string} = {
  'x': '*',
  '/': '/',
  '+': '+',
  '-': '-',
}
