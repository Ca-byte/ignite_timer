import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCoundownBtn,
  TaskInput,
} from './styles'

const newCycleFormValidationScrema = zod.object({
  task: zod.string().min(1, 'Please, you forgot the task name'),
  minutesAmount: zod
    .number()
    .min(5, 'Oh boy! Cannot be less than 5 minutes')
    .max(60, 'Oh boy! Cannot be more than 60 minutes'),
})

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationScrema),
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I am working on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestion"
            placeholder="Give a name to your task"
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
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCoundownBtn disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCoundownBtn>
      </form>
    </HomeContainer>
  )
}
