import moment from 'moment'

function convertToHumanReadable(timestamp) {
  const momentDate = moment(new Date(timestamp));
  return momentDate.format('MMM D, YYYY [@] HH:mm:ss');
}

export {
  convertToHumanReadable
}