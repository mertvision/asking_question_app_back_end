/**
 * Environment variables interface
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// An interface for process environment variables
export interface ProcessEnvInterface {
    /**
     * The protocol used by the server (e.g., 'http', 'https').
     * This is an optional field.
     */
    SERVER_PROTOCOL?: string;

    /**
     * The host address for the server (e.g., 'localhost').
     * This is an optional field.
     */
    SERVER_HOST?: string;

    /**
     * The primary port number on which the server listens.
     * This is an optional field.
     */
    SERVER_PRIMAL_PORT?: string;
}
