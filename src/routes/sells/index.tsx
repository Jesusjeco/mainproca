import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sells/')({
  component: Index
})

function Index(){
  return(
    <h2>Ventas</h2>
  )
}