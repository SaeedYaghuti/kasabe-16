// REDIS EVENTS
// There are three types of events that go through Redis:

// Emit event only to a specified auth
export const REDIS_SOCKET_EVENT_EMIT_USER = 'REDIS_SOCKET_EVENT_EMIT_USER';

// Emit event only to a specified auth
export const REDIS_SOCKET_EVENT_EMIT_GROUP = 'REDIS_SOCKET_EVENT_EMIT_GROUP';

// Emit status of client: isOnlie, isTyping, ...
export const REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS = 'REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS';

// We subscribe to event emitted by following clients 
export const REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS = 'REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS';

// Emit event to all open connections
export const REDIS_SOCKET_EVENT_EMIT_ALL = 'REDIS_SOCKET_EVENT_EMIT_ALL';

// Emit event only to the authenticated auths
export const REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED = 'REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED';
