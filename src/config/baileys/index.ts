import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';

let sock: ReturnType<typeof makeWASocket> | null = null;

export async function initWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('whatsapp_session');

  sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    syncFullHistory: false,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`;

      console.log('\n================================================--');
      console.log('📲 ESCANEIE O QR CODE NO LINK ABAIXO:');
      console.log(qrImageUrl);
      console.log('================================================--\n');
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
      const isLoggedOut = statusCode === DisconnectReason.loggedOut;
      const shouldReconnect = !isLoggedOut;

      console.log('Conexão do WhatsApp fechada. Tentando reconectar...', shouldReconnect);

      if (shouldReconnect) {
        initWhatsApp();
      } else {
        console.log('❌ Sessão encerrada no celular. Faça um novo escaneamento.');
        fs.rmSync('whatsapp_session', { recursive: true, force: true });
        initWhatsApp();
      }
    }
  });
}

export async function sendWhatsAppMessage({ number, message }: {
  number: string;
  message: string;
}) {
  if (!sock) {
    throw new Error('O WhatsApp ainda não foi inicializado.');
  }

  const cleanNumber = number.replace(/\D/g, '');
  const isGroup = false;
  const suffix = isGroup ? '@g.us' : '@s.whatsapp.net';
  const jid = cleanNumber.includes('@') ? cleanNumber : `${cleanNumber}${suffix}`;

  return await sock.sendMessage(jid, { text: message });
}
