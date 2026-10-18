export const WS_EVENTS = {
  newPost: 'post:new',
  newLike: 'like:new',
  newComment: 'comment:new',
} as const;

export type WsEvent = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];

// WebSocket server wiring lands in a later phase.
export const WS_PATH = '/api/ws';
