import { INestApplication } from '@nestjs/common';

// import { RedisPropagatorService } from '@app/shared/redis-propagator/redis-propagator.service';
// import { SocketStateAdapter } from '@app/shared/socket-state/socket-state.adapter';
// import { SocketStateService } from '@app/shared/socket-state/socket-state.service';

// import { RedisPropagatorService } from './realtime/redis-propagator/redis-propagator.service';
import { SocketStateAdapter } from './realtime/socket-state/socket-state.adapter';
import { SocketStateService } from './realtime/socket-state/socket-state.service';
// import { AuthService } from 'src/auth/auth.service';

export const initAdapters = (app: INestApplication): INestApplication => {
  const socketStateService = app.get(SocketStateService);
  // const redisPropagatorService = app.get(RedisPropagatorService);
  // const authService = app.get(AuthService);

  // To register our custom adapter, we have to use the useWebSocketAdapter method of a Nest application:
  // app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, redisPropagatorService, authService));
  // app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, authService));
  app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService));

  return app;
};
