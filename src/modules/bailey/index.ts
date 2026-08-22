import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { sendWhatsAppMessage } from '@config/baileys';

interface SendMessageBody {
  number: string;
  message: string;
  isGroup?: boolean;
}

export const privateWhatsAppRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post<{ Body: SendMessageBody }>('/v1/send-message', async (request, reply) => {
    const { number, message, isGroup = false } = request.body || {};

    if (!number || !message) {
      return reply.status(400).send({
        error: 'Os campos "number" e "message" são obrigatórios.'
      });
    }

    try {
      await sendWhatsAppMessage({ number, message, isGroup });
      return { success: true, message: 'Mensagem enviada!' };
    } catch (error) {
      const err = error as Error;
      request.log.error(err);
      return reply.status(500).send({ error: err.message || 'Falha ao enviar mensagem.' });
    }
  });
};
