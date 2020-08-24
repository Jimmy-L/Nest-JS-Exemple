import { LoggerService as LoggerNest, Logger } from '@nestjs/common';

/**
 * Logger service for all the nest js system
 */
export class LoggerService extends Logger implements LoggerNest {
    /**
     * Console log a normal log message
     *
     * @param message
     */
    log(message: string) {
        super.log(message);
    }

    /**
     * Console log an error message
     *
     * @param message
     * @param trace
     */
    error(message: string, trace: string) {
        super.error(message, trace);
    }

    /**
     * Console log a warn message
     *
     * @param message
     */
    warn(message: string) {
        super.warn(message);
    }

    /**
     * Console log a debug message
     *
     * @param message
     */
    debug(message: string) {
        super.debug(message);
    }

    /**
     * Console log a verbose message
     *
     * @param message
     */
    verbose(message: string) {
        super.verbose(message);
    }
}
