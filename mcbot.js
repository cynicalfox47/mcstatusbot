//credit to vegeta897 for the request URL part from his 'Simple Minecraft server status bot'
const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./config.json');
var statustring = "No signal";

var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = settings.ip; // Your MC server IP

var url = 'https://api.mcsrvstat.us/2/' + mcIP;


function update() {
  request(url, function(err, response, body) {
    if(err) {
        console.log(err);
        //return message.reply('Error getting Minecraft server status...');
    }

    body = JSON.parse(body);
    var status = 'Server offline';
    console.log(body.motd);

    if(body.online) {
          //set status to online if True
          client.user.setStatus('online')
          //.then(console.log)
          .catch(console.error);

          if(body.players.online) {
              status = ' ' + body.players.online + '  of  ' + body.players.max;
            } else {
              status = ' 0  of  ' + body.players.max;
      }
    } else {
        client.user.setStatus('dnd')
        //.then(console.log)
        .catch(console.error);
      }

    client.user.setActivity(status, { type: 'PLAYING' })
    .then(presence => console.log(status))
    .catch(console.error);
  });
}

client.on("ready", () => {
  console.log("I am ready!");
  client.setInterval(update,30000);
});

client.login(settings.token);
