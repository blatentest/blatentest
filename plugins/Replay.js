export async function all(m) {
    // when someone sends a group link to the bot's DM
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('open this link')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(
            m.chat, 
            `*Invite bot to a group*`, 
            null, 
            [['Rent', '/buyprem']], 
            m, 
            { mentions: [m.sender] }
        );
        m.react('💎');
        return;
    }
    
    // when someone greets the bot in its DM
    if ((m.mtype === 'hi' || m.text.startsWith('blaten bot') || m.text.startsWith('hello')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(
            m.chat, 
            `*I am blaten Bot. How can I help you? Reply with .list to see the bot's list, .owner to see the bot's owner, .menu to see the bot's menu.*
            
Hello @${m.sender.split('@')[0]},
You can rent the bot to join a group or contact the owner.
More info, click on the button.`, 
            null, 
            [['Rent', '/buyprem']], 
            m, 
            { mentions: [m.sender] }
        );
        m.react('💎');
        return;
    }
    
    return !0;
}
