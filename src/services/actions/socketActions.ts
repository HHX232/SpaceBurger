
export const wsConnect = (url: string) => ({
   type: 'WS_CONNECT',
   payload: url,
 });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsOnMessage = (data: any) => ({ type: 'WS_MESSAGE', payload: data });
export const wsOnError = (error: any) => ({ type: 'WS_ERROR', payload: error });
export const wsOnOpen = () => ({ type: 'WS_OPEN' });
export const wsOnClose = () => ({ type: 'WS_CLOSE' });
