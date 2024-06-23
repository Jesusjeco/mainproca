import { useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/products" });
  }, []);
  return (
    <h1>MAINPROCA</h1>
  )
}
