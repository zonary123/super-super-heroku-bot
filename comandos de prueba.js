if(message.content.startsWith(prefix + 'help')){

  message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
  message.author.send('**COMANDOS DE Darkpixel**\n```\n'+
                      '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                      '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                      '-> '+prefix+'decir          :: Hace que el bot diga un mensaje.\n'+
                      '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                      '-> '+prefix+'server         :: Muestra información de un servidor determinado.\n'+
                      '-> '+prefix+'8ball          :: El bot respondera a tus preguntas.\n'+
                      '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
                      '-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
                      '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n'+
                      '-> '+prefix+'pong           :: Comprueba la latencia del bot y de tus mensajes.\n```\n\n'+
                      '**Darkpixel - Server de darkpixel: https://discord.gg/Jnf4TwN');

}
if(message.content.startsWith(prefix + 'bot')){

        let img = message.mentions.users.first()
        if (!img) {

            const embed = new Discord.RichEmbed()
            .setTitle(`Este es el Creador del bot: Zonary123`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x00AE86)
            .setImage(`${message.author.avatarURL}`)
            .setColor(0x66b3ff)
            .setTitle(`Este es el Creador del bot: Zonary123`)
            .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
            message.channel.send({ embed });

        } else if (img.avatarURL === null) {

            message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

        } else {

            const embed = new Discord.RichEmbed()
            .setTitle("asd")
            .setImage(`${img.avatarURL}`)
            .setColor(0x66b3ff)
            .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
            message.channel.send({ embed });

        };

    }
