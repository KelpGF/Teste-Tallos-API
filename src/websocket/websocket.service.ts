import { Body } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketService {

  @WebSocketServer()
  private server: Server

  @SubscribeMessage('CREATE_DELETE_EMPLOYEE')
  handleEmployeeList(@ConnectedSocket() client: Socket, @Body() body) {
    this.server.emit('UPDATE_EMPLOYEE_LIST', body)
  }

  @SubscribeMessage('EDIT_EMPLOYEE')
  handleCurrentUser(@ConnectedSocket() client: Socket) {    
    this.server.emit('UPDATE_CURRENT_USER')
  }
}
