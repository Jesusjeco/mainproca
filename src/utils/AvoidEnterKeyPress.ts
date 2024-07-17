export const AvoidEnterKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}