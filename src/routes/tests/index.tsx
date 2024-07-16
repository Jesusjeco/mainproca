import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tests/')({
  component: renderComponent,
})

function renderComponent() {
  return (
    <>
      <h1>Test index</h1>
    </>
  )
}