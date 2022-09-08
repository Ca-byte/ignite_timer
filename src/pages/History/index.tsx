import { HistoryContaner, HistoryList, Status } from './styles'

export function History() {
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
            <tr>
              <td>Task name</td>
              <td>10 minutes</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>5 minutes</td>
              <td>10 days ago</td>
              <td>
                <Status statusColor="red">Cancelled</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>60 minutes</td>
              <td>1 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>60 minutes</td>
              <td>1 days ago</td>
              <td>
                <Status statusColor="yellow">in process</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContaner>
  )
}
