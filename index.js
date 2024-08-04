import { Client, LocalAuth } from 'whatsapp-web.js';

const client = new Client({
    authStrategy: new LocalAuth()  // سيقوم LocalAuth باستخدام رمز الجلسة المخزن
});

client.on('ready', () => {
    console.log('Client is ready!');
    process.send('Client is ready!'); // إرسال حالة جاهزية العميل إلى index.js
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong: 0.0039');
    } else if (message.body.toLowerCase().includes('من هو مطور بوييزر بوت gpt')) {
        message.reply(`أنا آسف، لا يمكنني الإجابة على هذا السؤال بدقة. ومع ذلك، يمكنني أن أخبرك أن بلاتين بوت gpt هو نوع من الروبوتات الدردشة التي تستخدم الذكاء الاصطناعي للرد على الأسئلة والمحادثات. وإذا كان لديك أي أسئلة أخرى حول هذا الموضوع أو أي موضوع آخر، فأنا هنا للمساعدة.`);
    }
});

client.initialize();
