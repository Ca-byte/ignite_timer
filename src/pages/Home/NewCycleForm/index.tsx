import { FormContainer, MinuteAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CycleContext } from '..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I am working on</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestion"
        placeholder="Give a name to your task"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestion">
        <option value="Code" />
        <option value="Code again" />
        <option value="Code repeat" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinuteAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
