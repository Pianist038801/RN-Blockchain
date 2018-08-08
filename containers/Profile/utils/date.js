export const getDates = (start_date, end_date) => {
  start_date = new Date(start_date).getFullYear()

  if (isNaN(Date.parse(end_date)) || end_date === null) {
    end_date = 'Present'
  } else {
    end_date = new Date(end_date).getFullYear()
  }

  return {
    start_date: start_date,
    end_date: end_date
  }
}
