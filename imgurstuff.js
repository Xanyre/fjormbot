if (m.content.startsWith(`-randomBird`)) {
    var birdArray = [];
    var birdObj = {};
    reequest.get({
        url: "https://api.imgur.com/3/gallery/r/birdpics",
        headers: {
            "Authorization": 'Client-ID ' + imgurClientID
        },
        json: true
    }, function(error, response, body) {
        if (!error) {
            birdObj = body;
            birdArray = birdObj["data"]
                /*.filter(function(a){
                  return !(a.is_album);
                }); */
            birdRandomImage = birdArray[Math.floor(Math.random() * birdArray.length)];
            if (birdRandomImage.is_album) {
                var image = "http://i.imgur.com/" + birdRandomImage.cover + ".jpg";
                var title = birdRandomImage.title || "/r/birdpics";
                var embed = new Discord.RichEmbed();
                embed.setColor("#c39582");
                embed.setAuthor(title, "http://s.imgur.com/images/favicon-96x96.png", "http://imgur.com/" + birdRandomImage.cover)
                embed.setImage(image);
                m.channel.sendEmbed(embed);
            } else {
                var image = birdRandomImage.link.replace(`\\/`, `/`);
                var title = birdRandomImage.title || "/r/birdpics";
                var embed = new Discord.RichEmbed();
                embed.setColor("#c39582");
                embed.setAuthor(title, "http://s.imgur.com/images/favicon-96x96.png", "http://imgur.com/" + birdRandomImage.id)
                embed.setImage(image);
                m.channel.sendEmbed(embed);
            }

        } else {
            console.log("An error!");
            console.log(error);
            m.reply(error);
        }
    });
    console.log("Finished");
}
