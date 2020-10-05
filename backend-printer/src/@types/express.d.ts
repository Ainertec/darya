declare namespace Express {
  export interface Request {
    userId?: string;
    io?: socketio.Server;
    connectedUsers: { userId?: number };
  }
}
