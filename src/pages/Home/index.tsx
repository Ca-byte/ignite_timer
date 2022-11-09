/* eslint-disable prettier/prettier */
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCoundownBtn,
  TaskInput,
} from './styles'
import { useEffect, useState } from 'react'


// interface NewCicleFormData {
//   task: string
//   minutesAmount: number
// }

const newCycleFormValidationScrema = zod.object({
  task: zod.string().min(1, 'Please, you forgot the task name'),
  minutesAmount: zod
  .number()
  .min(5, 'Oh boy! Cannot be less than 5 minutes')
  .max(60, 'Oh boy! Cannot be more than 60 minutes'),
})

type NewCicleFormData = zod.infer<typeof  newCycleFormValidationScrema>

interface CycleProps {
  id: string
  task: string
  minutesAmout: number
  startDate: Date

}

export function Home() {
  const [ cycles, setCycles]= useState<CycleProps[]>([])
  const [ activeCycleId, setActiveCycleId]= useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed]= useState(0)
  
  const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCycleFormValidationScrema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
 
  const id = String(new Date().getTime())

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

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    useEffect(()=> {
      if(activeCycle){
        const interval = setInterval(()=>{
          setAmountSecondsPassed(
            differenceInSeconds(new Date(), activeCycle.startDate))
        },1000)
        return () => {
          clearInterval(interval)
        }
      }
    },[activeCycle])

  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmout = Math.floor(currentSeconds / 60)
  const secondsAmout = currentSeconds % 60

  const minutes = String(minutesAmout).padStart(2, '0')
  const seconds = String(secondsAmout).padStart(2, '0')

useEffect(()=> {
  if(activeCycle){
    document.title = `${minutes}: ${seconds}`
  }
}, [minutes, seconds, activeCycle])

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        <StartCoundownBtn disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCoundownBtn>
      </form>
    </HomeContainer>
  )
}
