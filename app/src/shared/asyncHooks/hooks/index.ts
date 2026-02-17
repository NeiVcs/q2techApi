import { AsyncLocalStorage } from 'node:async_hooks';
import type { AppContext } from '../types';

export const ASYNC_LOCAL_STORAGE = new AsyncLocalStorage<AppContext>();

/**
 * Manages the application's global execution context using `async_hooks`.
 *
 * Provides a way to store and retrieve contextual information during
 * asynchronous operations, such as request metadata or user authentication.
 */
export class AsyncHooksContext {
  /**
   * Runs a callback function within the provided execution context.
   *
   * The context is stored in an instance of `AsyncLocalStorage`, allowing
   * the callback and any nested asynchronous operations to access it.
   *
   * @param {AppContext} context - The context to set for this execution scope.
   * @param callback - The function to run within the context.
   * @returns A promise that resolves when the callback execution is complete.
   *
   * @example
   * ```ts
   *   await AsyncHooksContext.asyncRunWithContext(context, async () => {
   *     done();
   *   });
   * ```
   */
  public static async asyncRunWithContext<T>(context: AppContext, callback: () => Promise<T>): Promise<T> {
    return await ASYNC_LOCAL_STORAGE.run(context, async () => {
      try {
        return await callback();
      } catch (error) {
        throw error;
      }
    });
  }

  /**
   * Runs a callback function within the provided execution context.
   *
   * The context is stored in an instance of `AsyncLocalStorage`, allowing
   * the callback and any nested asynchronous operations to access it.
   *
   * @param {AppContext} context - The context to set for this execution scope.
   * @param callback - The function to run within the context.
   * @returns A promise that resolves when the callback execution is complete.
   *
   * @example
   * ```ts
   *   AsyncHooksContext.runWithContext(context, () => {
   *     request.requestId = context.requestId;
   *     done();
   *   });
   * ```
   */
  public static runWithContext<T>(context: AppContext, callback: () => T): T {
    return ASYNC_LOCAL_STORAGE.run(context, callback);
  }

  /**
   * Updates a specific value in the application context for the current request.
   *
   * This method uses the internal AsyncLocalStorage to store data
   * related to the current request in an asynchronous and isolated way.
   * If there is no active context, the call will be ignored.
   *
   * @template K - Key of the AppContext to be updated.
   * @param {K} key - The context key to update (e.g., 'userId', 'requestId').
   * @param {AppContext[K]} value - The value to assign to the specified key.
   *
   *
   * @example
   *     AsyncHooksContext.setContextValue('userId', payload.id);
   *     AsyncHooksContext.setContextValue('groupId', payload.groupId);
   *     AsyncHooksContext.setContextValue('personId', payload.personId);
   *     AsyncHooksContext.setContextValue('resources', payload.resources);
   */
  public static setContextValue<K extends keyof AppContext>(key: K, value: AppContext[K]): void {
    const appContext = this.getContext();
    if (appContext) {
      appContext[key] = value;
    }
  }

  /**
   * Retrieves the current execution context.
   *
   * @returns The stored execution context, or `undefined` if none is set.
   *
   * @example
   * ```ts
   *    const context = AsyncHooksContext.getContext();
   * ```
   */
  public static getContext(): AppContext | undefined {
    return ASYNC_LOCAL_STORAGE.getStore();
  }
}
