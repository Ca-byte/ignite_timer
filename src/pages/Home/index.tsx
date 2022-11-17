import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, StartCountdownBtn, StopCountdownBtn } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

interface CycleProps {
  id: string
  task: string
  minutesAmout: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: CycleProps | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CyclesContextType)

const newCycleFormValidationScrema = zod.object({
  task: zod.string().min(1, 'Please, you forgot the task name'),
  minutesAmount: zod
    .number()
    .min(1, 'Oh boy! Cannot be less than 5 minutes')
    .max(60, 'Oh boy! Cannot be more than 60 minutes'),
})
type NewCicleFormData = zod.infer<typeof newCycleFormValidationScrema>

export function Home() {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const id = String(new Date().getTime())

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCycleFormValidationScrema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: NewCicleFormData) {
    const newCycle: CycleProps = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownBtn type="button" onClick={handleStopCycle}>
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
