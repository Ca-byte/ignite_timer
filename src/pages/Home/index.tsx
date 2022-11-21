import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, StartCountdownBtn, StopCountdownBtn } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { CycleContext } from '../../contexts/CyclesContext'

const newCycleFormValidationScrema = zod.object({
  task: zod.string().min(1, 'Please, you forgot the task name'),
  minutesAmount: zod
    .number()
    .min(1, 'Oh boy! Cannot be less than 5 minutes')
    .max(60, 'Oh boy! Cannot be more than 60 minutes'),
})
type NewCicleFormData = zod.infer<typeof newCycleFormValidationScrema>

export function Home() {
  const { activeCycle, createNewCycle, stopCycle } = useContext(CycleContext)

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCycleFormValidationScrema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  function handleCreateNewCycle(data: NewCicleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownBtn type="button" onClick={stopCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownBtn>
        ) : (
          <StartCountdownBtn disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownBtn>
        )}
      </form>
    </HomeContainer>
  )
}
