const Discord = require('discord.js');
const bot = new Discord.Client();
new Discord.RichEmbed();
const newUsers = new Discord.Collection();
const config = require("./config.json")
const fs = require('fs');
const modRole = 'Administrator';
const economy = require('discord-eco');


//Json files
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8' )); // Calls json


bot.on('ready', () => {
  console.log('Off to the animals!');
});


bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);
  
  let sender = message.author;


//Money commands

if(bot.user.id === message.author.id) { return } //makes bot not have an account.
  
 


    let msg = message.content.toUpperCase();
    // Lets also add some new variables

 

    if (command === "pay") {

        // Check if they have the modRole
        if (!message.member.roles.find("name", modRole)) { // Run if they dont have role...
            message.channel.send('**You need the role `' + modRole + '` to use this command...**');
            return;
        }

        // Check if they defined an amount
        if (!args[0]) {
            message.channel.send(`**You need to define an amount. Usage:prefix BALSET <amount> <user>**`);
            return;
        }

        // We should also make sure that args[0] is a number
        if (isNaN(args[0])) {
            message.channel.send(`**The amount has to be a number. Usage: prefix BALSET <amount> <user>**`);
            return; // Remember to return if you are sending an error message! So the rest of the code doesn't run.
        }

        // Check if they defined a user
        let defineduser = '';
        if (!args[1]) { // If they didn't define anyone, set it to their own.
            defineduser = message.author.id;
        } else { // Run this if they did define someone...
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }

        // Finally, run this.. REMEMBER IF you are doing the guild-unique method, make sure you add the guild ID to the end,
        economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => { // AND MAKE SURE YOU ALWAYS PARSE THE NUMBER YOU ARE ADDING AS AN INTEGER
            message.channel.send(`**User defined had ${args[0]} added/subtraction from their account.**`)
        });

    }

  
  

  let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8' )); // refreshes
  
if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000; //starter casg
  
fs.writeFile('Storage/userData.json' , JSON.stringify(userData), (err) => {
   if (err) console.error(err);
  
    })
 

if (command === "bank" || command === "balance" || command==="money") {
  message.channel.send ({"embed": {
    title: "Bank",
    color: 0xF1C40F,
    fields:[{
      name:"Account Holder",
      value:message.author.username,
      inline:true
    },
    {
       name:"Account Balance",
       value:userData[sender.id + message.guild.id].money,
       inline:true
    }]
    
    
  }})
}



if (command === "bankregister") {
    message.channel.send("you are registered!");
}    




//commands.



if (command === "ping") {
    message.channel.send("pong");
}    

if (command === "adminhelp") {
  message.channel.send("```Info: \n  Prefix= ! \n \n Regular Commands: \n  !cards: Prints all the cards \n !help: Prints this message \n !ping: Prints pong (More to test if the bot is up :) ) \n !money/!bank: Prints balance \n !pay ~~ amount (Still in works)  ```")
}  
  

if (command === "cards") {
    message.channel.send("Animal Cards: \n Asia: Red Panda, Bengal Tiger, Peafowl, Malayan tapir, Sunbear  \n Africa: Masai Giraffe, Hyena, Meerkat, Grevy's Zebra, African Savannah Elephant, Ostrich, Nile Crocodile, Lemur, Western Lowland Gorilla, Crested Porcupine.   \n Antarctica: N/a. \n Oceania: Red Kangaroo, Queensland Koala. \n North America: North American Cougar, Reindeer, Polar Bear, Galapagos Tortoise \n South America: Common Squirrelmonkey, Capybara, South American Coati, Humboldt Penguin, Giant Anteater, Guanaco  \n Europe: Polar Bear, Reindeer ");
}   


//cards
if (command === "polarbear") {
    message.channel.send("https://imgur.com/a/aY2O0");
}    


if (command === "space memes") {
    message.channel.send("memes?");
}




  
});

bot.login(config.token);
