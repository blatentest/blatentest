import { performance } from 'perf_hooks';

// Handler function
const handler = async (m, { conn, args }) => {
  const inviteCode = await conn.groupInviteCode(m.chat);
  const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
  
  conn.reply(m.chat, inviteLink, m);
};

// Handler properties
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^link(gro?up)?$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;

handler.admin = false;
handler.botAdmin = true;

handler.fail = null;

// Export handler
export default handler;
