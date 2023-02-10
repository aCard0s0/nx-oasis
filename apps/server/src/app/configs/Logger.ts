import pino from "pino";

const Logger = pino(
  {
    transport : {
      target : 'pino-pretty',
      options : {
        translateTime : 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname'
      }
    }
  }
);
export default Logger;
