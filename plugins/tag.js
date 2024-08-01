let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}//platinum
let pesan = args.join` `
let oi = `*👾~الرساله:* ${pesan}`
let teks = `*منش👾 🌸 جماعي* \n\n ${oi}\n\n*🌿┇الجروب :⇣*\n`
for (let mem of participants) {
teks += `*👾↫* @${mem.id.split('@')[0]}\n`}
teks += `*p l a t i n u m  BOT*\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(tag|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
export default handler
