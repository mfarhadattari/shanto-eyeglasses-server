export const currentWeekStartDate = () => {
  const weekStartsOn = 0;

  const currentDate = new Date();

  const currentWeekNumber = Math.floor(
    (currentDate.getDay() - weekStartsOn + 7) % 7,
  );

  const weekStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentWeekNumber,
    0,
    0,
    0,
    0,
  );
  return weekStartDate;
};

export const currentMonthStartDate = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthStartDate = new Date(currentYear, currentMonth, 1);
  return monthStartDate;
};
