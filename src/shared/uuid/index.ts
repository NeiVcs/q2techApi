import { randomUUID } from 'node:crypto';
import { v7 } from 'uuid';

/**
 * Generates a UUID v4 (Universally Unique Identifier version 4).
 *
 * - **Characteristics:** Based on random numbers.
 * - **Benefits:**
 *   - High randomness.
 *   - Ideal for unique identifiers without a specific order.
 * - **Ideal use cases:**
 *   - Primary keys in distributed databases.
 *   - Unique identification for users, sessions, or transactions.
 *   - Unique file naming.
 *
 * @returns {string} Generated UUID v4.
 */
export const generateUuidV4 = (): string => randomUUID();

/**
 * Generates a UUID v7 (Universally Unique Identifier version 7).
 *
 * - **Characteristics:** Based on timestamps and random values.
 * - **Benefits:**
 *   - Maintains uniqueness like UUID v4.
 *   - Chronologically sortable, enabling efficient indexing and searches.
 * - **Ideal use cases:**
 *   - Ordered identifiers for logs, events, and messages.
 *   - Distributed systems that require sorted keys.
 *   - Better performance in databases indexed by increasing primary keys.
 *
 * @returns {string} Generated UUID v7.
 */
export const generateUuidV7 = (): string => v7();
