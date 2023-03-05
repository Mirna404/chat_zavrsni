/// <reference types="vite/client" />
// Declare the Scaledrone global variable
declare const Scaledrone: {
  new(channelID: string, options:any): {
    subscribe(roomName: string): {
      on(eventName: string, callback: (data: any, client: any) => void): void;
      unsubscribe(): void;
    };
    publish(message: any): void;
    close(): void;
  };
};