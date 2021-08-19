import moment from 'moment'

// E.g: 5 hours ago, in 2 years...
export const formatToFromNow = (timestamp: string): string => {
  return moment.utc(timestamp).fromNow()
}

export const formatToDate = (timestamp: string): string => {
  return moment.utc(timestamp).format('MMM DD')
}
