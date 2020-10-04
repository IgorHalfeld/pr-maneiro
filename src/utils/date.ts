// get date on twitter format
export function getCurrentTimeFormated (now?: Date): string {
  const currentTime = now ?? new Date()
  const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  function getCurrentMonth (monthNumber: number): string {
    return monthList[monthNumber]
  }

  const day = currentTime.getDate()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth()

  const hourNow = currentTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return `${hourNow} · ${getCurrentMonth(month)} ${day} ${year}`
}
