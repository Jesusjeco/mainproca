import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router";

export function FetchErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}