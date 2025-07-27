/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, Suspense } from "react"

interface Props {
  component: ReactNode
}

export const SuspenseRoute = ({component} : Props) => {
  return (
    <Suspense fallback={<div style={{ display: 'none' }}>Loading...</div>}>
      {component}
    </Suspense>
  )
}