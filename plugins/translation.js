import translate from '@vitalets/google-translate-api'
const defaultLang = 'en'
const tld = 'cn'

let handler = async (m, { args, usedPrefix, command }) => {
    let err = `
📌 *Example:*

*${usedPrefix + command}* ar hi
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text

    try {
       // React before starting the translation
       await m.react('🔄')

       let result = await translate(text, { to: lang, tld: tld, autoCorrect: true }).catch(_ => null) 
       if (result) {
           m.reply(result.text)
           // React after successful translation
           await m.react('✅')
       } else {
           m.reply('Translation failed. Please try again.')
           // React if the translation failed
           await m.react('❌')
       }
    } catch (e) {
        m.reply(err)
        // React in case of an unexpected error
        await m.react('⚠️')
    } 
}
handler.help = ['trad <lang> <text>']
handler.tags = ['tools']
handler.command = ['translate', 'tr']

export default handler
