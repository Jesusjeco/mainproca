import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tests/')({
  component: renderComponent
})

function renderComponent() {

  return (
    <>
      <h2>test index</h2>
    </>
  )
}