import { format } from 'date-fns'
import type { FC } from 'react'

const Footer: FC = () => {
  const date = new Date()
  return (
    <div className="bg-light py-3 mt-5">
      <div className="text-center">
        <small>&copy; 2021-{format(date, 'yyyy')} Arthur, AgricolaDevJP</small>
      </div>
      <div className="text-center">
        <small>Last Modified: {format(date, 'yyyy-MM-dd hh:mm:ss')}</small>
      </div>
    </div>
  )
}

export default Footer
