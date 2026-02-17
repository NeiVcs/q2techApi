import { FastifyReply, FastifyRequest } from 'fastify';
import { AppContext, AsyncHooksContext } from '@shared/asyncHooks';
import { generateUuidV7 } from '@shared/uuid';

export function initContextMiddleware(request: FastifyRequest, _: FastifyReply, done: () => void) {
  const xApiKey = request.headers['x-api-key'] as string | undefined;
  const requestId = request.headers['x-request-id'] as string | undefined;
  const context: AppContext = {
    requestId: requestId || generateUuidV7(),
    applicationId: xApiKey
  };

  AsyncHooksContext.runWithContext(context, () => {
    request.requestId = context.requestId;
    done();
  });
}
