interface NotFoundComponentProps {
  message: string;
}

export function NotFoundComponent({ message }: NotFoundComponentProps) {
  return (
    <>
      <h2>Not Found</h2>
      <p>{message}</p>
    </>
  )
}