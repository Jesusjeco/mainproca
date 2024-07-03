export const DMYdate = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const currentDateForInput = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1; // Months start at 0
  let dd: string | number = today.getDate();

  // Add leading zeros to day and month if needed
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return `${yyyy}-${mm}-${dd}`;
}