import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key,
});

const openaiii = new OpenAIApi(configuration);

const sistema1 = 'سوف تعمل بمثابة WhatsApp Bot الذي أنشأه كاࢪيكا .';
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${global.openai_key}`,
};
const lolkeysapi = 'your-lolhuman-api-key'; // Replace with actual key

async function getOpenAIChatCompletion(texto, chgptdb) {
  const data = {
    "model": "gpt-3.5-turbo",
    "messages": [
      { "role": "system", "content": sistema1 },
      ...chgptdb,
      { "role": "user", "content": texto }
    ]
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return result.choices[0].message.content;
}

async function translateText(text, toLang) {
  const result = await translate(text, { to: toLang, autoCorrect: true });
  return result.text;
}

async function fetchAndTranslate(url, text, toLang) {
  const response = await fetch(url);
  const data = await response.json();
  return await translateText(data.result || data.respon || data.data, toLang);
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!text) throw `مرحبا اصبح بلاتين يدعم ChatGPT عندك اسئلة او استفسار اي شي قول\n\n❏ على سبيل المثال\n❏ ${usedPrefix + command} افضل انمي\n❏ ${usedPrefix + command} عايز نصيحه\n❏ ${usedPrefix + command} قول نكته`;

  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const chgptdb = global.chatgpt.data.users[m.sender];
    chgptdb.push({ role: 'user', content: text });
    const respuesta = await getOpenAIChatCompletion(text, chgptdb);
    m.reply(`${respuesta}`.trim());
  } catch {
    try {
      conn.sendPresenceUpdate('composing', m.chat);
      const botIA222 = await openaiii.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        temperature: 0.3,
        max_tokens: 4097,
        stop: ['Ai:', 'Human:'],
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0
      });
      m.reply(botIA222.data.choices[0].text.trim());
    } catch {
      try {
        const fgapi1 = await fetchAndTranslate(`https://api-fgmods.ddns.net/api/info/openai?text=${text}&symsg=${sistema1}&apikey=XlwAnX8d`, text, 'ar');
        m.reply(fgapi1);
      } catch {
        try {
          const vihangayt1 = await fetchAndTranslate(`https://vihangayt.me/tools/chatgpt?q=${text}`, text, 'ar');
          m.reply(vihangayt1);
        } catch {
          try {
            const vihangayt2 = await fetchAndTranslate(`https://vihangayt.me/tools/chatgpt2?q=${text}`, text, 'ar');
            m.reply(vihangayt2);
          } catch {
            try {
              const vihangayt3 = await fetchAndTranslate(`https://vihangayt.me/tools/chatgpt3?q=${text}`, text, 'ar');
              m.reply(vihangayt3);
            } catch {
              try {
                const tioress22 = await fetchAndTranslate(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=${m.sender}`, text, 'ar');
                m.reply(tioress22);
              } catch {
                try {
                  const rres = await fetchAndTranslate(`https://api.ibeng.tech/api/others/chatgpt?q=Hola&apikey=eMlBNRzUXv`, text, 'ar');
                  m.reply(rres.replace(' Indonesia ', ' español '));
                } catch {
                  try {
                    const akuariapi2 = await fetchAndTranslate(`https://api.akuari.my.id/ai/gpt?chat=${text}`, text, 'ar');
                    m.reply(akuariapi2);
                  } catch {
                    try {
                      const akuariapi1 = await fetchAndTranslate(`https://api.akuari.my.id/ai/gbard?chat=${text}`, text, 'ar');
                      m.reply(akuariapi1);
                    } catch {
                      throw `*[❗] خطأ*`;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

handler.command = /^(gpt|بوت)$/i;
export default handler;
