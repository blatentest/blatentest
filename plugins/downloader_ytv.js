import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`));
  const tradutor = _translate.plugins.downloader_ytv;

  if (!args[0]) throw tradutor.texto8;

  let enviando;
  if (enviando) return;
  enviando = true;

  let youtubeLink = '';
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find((item) => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            throw `${tradutor.texto1} ${matchingItem.urls.length}*`;
          }
        } else {
          throw `${tradutor.texto2[0]} (${usedPrefix + command} ${tradutor.texto2[1]} ${usedPrefix}playlist <texto>*`;
        }
      } else {
        throw `${tradutor.texto3[0]} (${usedPrefix + command} ${tradutor.texto3[1]} ${usedPrefix}playlist <texto>*`;
      }
    }
  }

  const { key } = await conn.sendMessage(m.chat, { text: tradutor.texto4 }, { quoted: m });

  try {
    const yt_play = await yts(youtubeLink);
    const videoUrl = `${global.MyApiRestBaseUrl}/api/v1/ytvideo?url=${yt_play.all[0].url}&apikey=${global.MyApiRestApikey}`;
    const buff_vid = await getBuffer(videoUrl);
    const fileSizeInBytes = buff_vid.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
    const title = yt_play.all[0].title;

    if (fileSizeInMB > 50) {
      await conn.sendMessage(m.chat, { document: buff_vid, caption: `${tradutor.texto5[0]} ${title}\n${tradutor.texto5[1]} ${roundedFileSizeInMB} MB`, fileName: title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `${tradutor.texto5[2]} ${roundedFileSizeInMB} ${tradutor.texto5[3]} ${title}`, edit: key }, { quoted: m });
      enviando = false;
    } else {
      await conn.sendMessage(m.chat, { video: buff_vid, caption: `${tradutor.texto5[0]} ${title}\n${tradutor.texto5[1]} ${roundedFileSizeInMB} MB`, fileName: title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `${tradutor.texto5[4]}`, edit: key }, { quoted: m });
      enviando = false;
    }
  } catch (error) {
    console.log('Primera API falló, intentando con la segunda...');
    try {
      const yt_play = await yts(youtubeLink);
      const videoUrl = `${global.MyApiRestBaseUrl}/api/v2/ytvideo?url=${yt_play.all[0].url}&apikey=${global.MyApiRestApikey}`;
      const buff_vid = await getBuffer(videoUrl);
      const fileSizeInBytes = buff_vid.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
      const title = yt_play.all[0].title;

      if (fileSizeInMB > 50) {
        await conn.sendMessage(m.chat, { document: buff_vid, caption: `${tradutor.texto5[0]} ${title}\n${tradutor.texto5[1]} ${roundedFileSizeInMB} MB`, fileName: title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
        await conn.sendMessage(m.chat, { text: `${tradutor.texto5[2]} ${roundedFileSizeInMB} ${tradutor.texto5[3]} ${title}`, edit: key }, { quoted: m });
        enviando = false;
      } else {
        await conn.sendMessage(m.chat, { video: buff_vid, caption: `${tradutor.texto5[0]} ${title}\n${tradutor.texto5[1]} ${roundedFileSizeInMB} MB`, fileName: title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
        await conn.sendMessage(m.chat, { text: `${tradutor.texto5[4]}`, edit: key }, { quoted: m });
        enviando = false;
      }
    } catch (error) {
      await conn.sendMessage(m.chat, { text: tradutor.texto6, edit: key }, { quoted: m });
      throw tradutor.texto7;
    }
  }
};

handler.command = /^(video|fgmp4|dlmp4|getvid|yt(v|mp4))$/i;
export default handler;

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });

    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
