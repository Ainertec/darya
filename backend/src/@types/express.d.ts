declare namespace Express {
  export interface Request {
    userId?: string;
    io?: socketio.Server;
    connectedUser?: { userId?: number };
  }
}
