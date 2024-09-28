import { WS_URL } from '../../components/Pages/Feed/Feed';
import { wsOnMessage, wsOnError, wsOnOpen, wsOnClose } from '../actions/socketActions';

export const socketMiddleware = () => {
  let socket: WebSocket | null = null;

  return (store: any) => (next: any) => (action: any) => {
    const { dispatch } = store;
    const { type, payload } = action;

    switch (type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close(); 
        }
        const socketpayload = payload ? payload : WS_URL
        console.log("socketpayload", socketpayload)
        socket = new WebSocket(socketpayload); 

        socket.onopen = () => {
          dispatch(wsOnOpen());
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch(wsOnMessage({
              orders: data.orders,
              total: data.total,
              totalToday: data.totalToday,
            }));
          }
        };

        socket.onerror = (error) => {
          dispatch(wsOnError(error));
        };

        socket.onclose = () => {
          dispatch(wsOnClose());
        };
        break;

      case 'WS_DISCONNECT':
        if (socket) {
          socket.close(); 
        }
        socket = null;
        break;

      default:
        break;
    }

    return next(action);
  };
};
