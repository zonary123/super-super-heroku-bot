const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");
const servernombres = client.guilds.map(g => g.name).join("\n");
const tags  =  client.users.map(u =>  `${u.username}#${u.discriminator}`).join(", ");
const serverpequeños = client.guilds.filter(g => g.memberCount < 10).map(g => g.name).join("\n");
const ytdl = require('ytdl-core');
const bot = new Discord.Client({disableEveryone: true});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("ready", () => {
   console.log(`Estoy listo!, conectado en ${client.guilds.size} servidores y  ${client.users.size} usuarios.`);
   client.user.setPresence( {
       status: "online",
       game: {
           name: `/help | Estoy en mc.darkpixel.com y en ${client.guilds.size} servidores.`,
           type: "PLAYING"
       }
    });
});
var prefix = config.prefix;

client.on("guildMemberAdd", (member) => {
   console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
   var canal = client.channels.get('528994432557776899');
   canal.send(`${member.user}, Bienvenido al servidor darkpixel`);
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "hola")) {
    message.channel.send("Hola que tal?");
  }
  if (message.content.startsWith(prefix +"links")){
      message.channel.send({embed: {
        color: 3447003,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: "Enlace De nuestro server de discord",
        url: "https://discord.gg/d9Ukrf8",
        description: "Hola aqui tienes la lista de links del server y sus paginas",
        fields: [{
            name: "Buycraft",
            value: "Este es el link de nuestra tienda del server de dinero real: https://darkpixeloficial.buycraft.net/"
          },
          {
            name: "Pagina",
            value: "Esta es nuestra pagina darkpixeloficial: https://darkpixelmon.wixsite.com/darkpixel"
          },
          {
            name: "Nuesta ip",
            value: "Ip: mc.darkpixel.com"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "github.com/CraterMaik"
        }
      }
  });
  }
  if(message.content.startsWith(prefix + 'help')){

    message.channel.send('**COMANDOS DE Darkpixel**\n```\n'+
                        '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                        '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                        '-> '+prefix+'decir          :: Hace que el bot diga un mensaje.\n'+
                        '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                        '-> '+prefix+'server         :: Muestra información de un servidor determinado.\n'+
                        '-> '+prefix+'8ball          :: El bot respondera a tus preguntas.\n'+
                        '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n'+
                        '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n'+
                        '-> '+prefix+'pong           :: Comprueba la latencia del bot y de tus mensajes.\n```\n\n'+
                        '**Darkpixel - Server de darkpixel: https://discord.gg/Jnf4TwN');

  }
  if (message.content.startsWith(prefix +"richembed" )){
      const embed = new Discord.RichEmbed()
      .setTitle("Este es su título, puede contener 256 caracteres")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(0x00AE86)
      .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
      .setFooter("Pie de página, puede contener 2048 caracteres", client.user.avatarURL)
      .setImage(message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setURL("https://github.com/CraterMaik")
      .addField("Este es un título de campo, puede contener 256 caracteres",
        "Este es un valor de campo, puede contener 2048 caracteres.")
      .addField("Campo en línea", "Debajo del campo en línea", true)
      .addBlankField(true)
      .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);

      message.channel.send({embed});
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let texto = args.join(" ");

  if(command === 'decir'){
      if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
      message.channel.send(texto);

  }
  if(command === 'server'){

    var server = message.guild;

    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)

   message.channel.send({ embed });

  }
  if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;

        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)

       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)

     message.channel.send({ embed });
    }

  }
  if(command === '8ball'){
      var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];
      if (!texto) return message.reply(`Escriba una pregunta.`);
      message.channel.send(message.member.user+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');

  }

  if(command === `${prefix}report`){

  //!report @ned this is the reason

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#15f153")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", rreason);

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

  return;
}
  if(message.content.startsWith(prefix + 'avatar')){

        let img = message.mentions.users.first()
        if (!img) {

            const embed = new Discord.RichEmbed()
            .setTitle(`Este es el precioso avatar de ${message.author.username}`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x00AE86)
            .setImage(`${message.author.avatarURL}`)
            .setColor(0x66b3ff)
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
    if(message.content.startsWith(prefix + 'bot')){

      message.channel.sendMessage('**COMANDOS DE Darkpixel**\n```\n'+
                          '-> '+prefix+'Creador: zonary123.\n'+
                          '-> '+prefix+'Fecha de creacion del bot: 30/12/2018 20:00.\n'+
                          '-> '+prefix+'Motivo de creacion:Crear un bot para discord español para el server darkpixel.\n```\n\n'+
                          '**Creador del bot: zonary123#4181** http://pm1.narvii.com/6546/2050ad9d3d1b59d1b02720111a93215621b0529a_00.jpg');
    }
    if (command === 'ping') {

        let ping = Math.floor(message.client.ping);

        message.channel.send(":ping_pong: Pong!")
          .then(m => {

              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);

          });

      }
      if(command === 'rol'){

          if(!args) return message.channel.send('Ingrese nombre del rol.');
          let mirol = message.guild.roles.find("name", args.join(" "));
          if(!mirol) return message.channel.send('Rol no encontrado en el servidor.');

          if(message.member.roles.has(mirol.id)) {
            message.channel.send('Si tienes el rol: `'+mirol.name+'`.');
          } else {
            message.channel.send('No tienes el rol: `'+mirol.name+'`.');
          }

        }
        if(command === 'addrol'){

            let miembro = message.mentions.members.first();
            let nombrerol = args.slice(1).join(' ');
            let mirol =  message.guild.roles.get("123456789987456321");

            let role = message.guild.roles.find("name", nombrerol);
            let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

            if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

            if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
            if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `-addrol @username [rol]`');
            if(!role) return message.channel.send('Rol no encontrado en el servidor.');

            miembro.addRole(role).catch(console.error);
            message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);

          }
if (command === 'play') {
    if (!message.guild.voiceConnection) return message.channel.send('¡No estoy en un canal de voz!, use `-join` para unirme a un canal.').catch(error => message.channel.send(error));
    const dispatcher = message.guild.voiceConnection.playFile('C:\Users\alvar_d6o2ub6\Desktop\musica\zon\1.mp3');
}
if (command === 'ytplay') {
   const ytdl = require('ytdl-core');

   let voiceChannel = message.member.voiceChannel;
   if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
   if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
   voiceChannel.join()
     .then(connection => {
       const url = ytdl(args, { filter : 'audioonly' });
       const dispatcher = connection.playStream(url);
       message.channel.send('Reproduciendo ahora: '+ args);
       message.delete();
     })
     .catch(console.error);
 }
if (command === 'join') {
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');
    } else {
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
    }
}
});
client.login("NTI4NjM2ODIzNDE3NjUxMjA1.DwrcPQ.lI3OVf2du03Y3ioQRAE7fN9DMq4");
