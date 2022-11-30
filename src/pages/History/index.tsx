import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CycleContext } from '../../contexts/CyclesContext'
import { HistoryContaner, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CycleContext)
  return (
    <HistoryContaner>
      <h1>My history</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmout} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Completed</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrupted</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Running</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContaner>
  )
}
