import { LoggerTransport } from "./LoggerTransport";

export class ConsoleTransport implements LoggerTransport{
    trace(message?: any, ...optionalParams: any[]): void {
        console.trace(message,optionalParams);
    }
    debug(message?: any, ...optionalParams: any[]): void {
        console.debug(message,optionalParams);
    }
    info(message?: any, ...optionalParams: any[]): void {
        console.log(message,optionalParams);
    }
    warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message,optionalParams);
    }
    error(message?: any, ...optionalParams: any[]): void {
        console.error(message,optionalParams);
    }

}