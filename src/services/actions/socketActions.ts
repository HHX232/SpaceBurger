export const WS_CONNECT:"WS_CONNECT" = "WS_CONNECT"
export const WS_MESSAGE:"WS_MESSAGE" = "WS_MESSAGE"
export const WS_ERROR:"WS_ERROR" = "WS_ERROR"
export const WS_OPEN:"WS_OPEN" = "WS_OPEN"
export const WS_CLOSE:"WS_CLOSE" = "WS_CLOSE"

export const wsConnect = (url: string) => ({
   type: WS_CONNECT,
   payload: url,
 });

export const wsDisconnect = () => ({ type: WS_CONNECT });
export const wsOnMessage = (data: any) => ({ type: WS_MESSAGE, payload: data });
export const wsOnError = (error: any) => ({ type: WS_ERROR, payload: error });
export const wsOnOpen = () => ({ type: WS_OPEN });
export const wsOnClose = () => ({ type: WS_CLOSE });
