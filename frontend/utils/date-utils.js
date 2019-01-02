function convertToHumanReadable(timestamp) {
  return new Date(timestamp).toDateString();
}

export {
  convertToHumanReadable
}