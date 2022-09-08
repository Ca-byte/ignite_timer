import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCoundownBtn,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I am working on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestion"
            placeholder="Give a name to your task"
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
        <StartCoundownBtn disabled type="submit">
          <Play size={24} />
          Start
        </StartCoundownBtn>
      </form>
    </HomeContainer>
  )
}
