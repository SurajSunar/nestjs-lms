import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ScannerGateway {
  @WebSocketServer() server: Server;
  private sessions = new Map<string, any>();
  private clientId: string;

  handleConnection(client: Socket) {
    console.log('Connected:', client.id);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { sessionId, role } = data;
    if (!this.sessions.has(sessionId)) this.sessions.set(sessionId, {});
    this.sessions.get(sessionId)[role] = client?.id;
    console.log('sessionId==', this.sessions.get(sessionId));
  }

  sendToDesktop(sessionId: string, payload: any) {
    const session = this.sessions.get(sessionId);
    console.log('sendToDesktop', sessionId, session?.desktop, payload);
    if (session?.desktop)
      this.server.to(session.desktop).emit('scan-result', payload);
  }
}
