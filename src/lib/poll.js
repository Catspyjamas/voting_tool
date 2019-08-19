const possiblePollStates = {
  OPEN: "OPEN",
  DRAFT: "DRAFT",
  CLOSED: "CLOSED"
};

// Filtering Functions for Polls
export function isOpen(poll) {
  return poll.status === possiblePollStates.OPEN;
}
export function isDraft(poll) {
  return poll.status === possiblePollStates.DRAFT;
}
export function isClosed(poll) {
  return poll.status === possiblePollStates.CLOSED;
}

export { possiblePollStates };
