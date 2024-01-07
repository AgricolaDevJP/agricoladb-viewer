import { compareDesc, format } from 'date-fns'
import type { FC } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import type { ChangeLog } from '@/libs/changeLogs'

type ChangeLogsProps = Readonly<{
  logs: readonly ChangeLog[]
}>

const ChangeLogs: FC<ChangeLogsProps> = ({ logs }) => {
  const sortedLogs = [...logs].sort((a, b) => compareDesc(a.timestamp, b.timestamp))
  return (
    <ListGroup>
      {sortedLogs.map(log => (
        <ListGroup.Item key={log.id}>
          <span className="text-secondary">{format(log.timestamp, 'yyyy-MM-dd')}</span>
          <br />
          {log.description}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ChangeLogs
