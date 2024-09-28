/**
 * Interface for JWT environment variables.
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */
export interface JWTEnvInterface {
    /**
     * The secret key used for signing JWT tokens.
     * This should be kept confidential.
     */
    JWT_SECRET_KEY: string;

    /**
     * The expiration time for the JWT tokens, typically in a string format (e.g., '1h', '2d').
     */
    JWT_EXPIRE: string;

    /**
     * The expiration time for the JWT cookie, usually specified in a string format (e.g., '1h', '2d').
     */
    JWT_COOKIE_EXPIRE: string;
};
