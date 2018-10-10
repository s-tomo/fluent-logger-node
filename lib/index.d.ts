declare namespace fluentLogger {
  interface Options {
    eventMode?: string;
    host?: string;
    port?: number;
    path?: string;
    timeout?: number;
    tls?: any;
    tlsOptions?: any;
    reconnectInterval?: number;
    requireAckResponse?: boolean;
    ackResponseTimeout?: number;
    milliseconds?: number;
    flushInterval?: number;
    sendQueueSizeLimit?: number;
    security?: Security;
  }

  interface Security {
    clientHostname: string;
    sharedKey: string;
    username: string;
    password: string;
  }

  type Timestamp = number | Date;
  type Callback = (err?: Error) => void;
  
  class FluentSender<T> {
      constructor(tagPrefix: string, options: Options);
      
      emit(data: T, callback?: Callback): void;
      emit(data: T, timestamp: Timestamp, callback?: Callback): void;
      emit(label: string, data: T, callback?: Callback): void;
      emit(label: string, data: T, timestamp: Timestamp, callback?: Callback): void;
      end(label: string, data: T, callback: Callback): void;
  }

  class InnerEventTime {
    epoch: number;
    nano: string;

    constructor(epoch: number, nano: number);

    static pack(eventTime: InnerEventTime): Buffer;
    static unpack(buffer: Buffer): InnerEventTime;
    static now(): InnerEventTime;
    static fromDate(date: Date): InnerEventTime;
    static fromTimestamp(t: number): InnerEventTime;
  }

  interface Constructable<T, U> {
    new(options: U) : T;
  }

  let EventTime: InnerEventTime;
  
  function configure(tag: string, options: Options): void;
  function createFluentSender<T>(tag: string, options: Options): FluentSender<T>;
}

export = fluentLogger;
