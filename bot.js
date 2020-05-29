const Discord = require("discord.js");
const {
  prefix,
  token,
  yandex_api_key,
  lang,
  command_vocabulary,
  wrong_format,
  embed_color,
  not_found,
  field_definition,
  field_example,
} = require("./config.json");

var _ = require("lodash");
const axios = require("axios");
const querystring = require("querystring");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === command_vocabulary) {
    if (!args.length) {
      return message.channel.send(wrong_format);
    }

    const query = querystring.stringify({ text: args.join(" ") });

    const { data } = await axios
      .get(
        `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${yandex_api_key}&lang=${lang}&${query}`
      )
      .catch((err) => console.log("WTF WTF WTF " + err));

    const def = _.reduce(data.def);

    if (!def) {
      return message.channel.send(`${not_found} **${args.join(" ")}**.`);
    }

    const botTexts = [];
    const botExamples = [];

    let i;
    for (i = 0; i < def.tr.length; i++) {
      botTexts.push(def.tr[i].text + " (*" + def.tr[i].pos + "*)");
      if (def.tr[i].ex) {
        def.tr[i].ex.forEach((element) => {
          botExamples.push(
            "**" + element.text + "**\n" + _.reduce(element.tr).text
          );
        });
      }
    }

    if (!botExamples.length) {
      botExamples.push(not_found);
    }

    const embed = new Discord.MessageEmbed()
      .setColor(embed_color)
      .setTitle(args)
      .addFields(
        { name: field_definition, value: botTexts, inline: true },
        { name: field_example, value: botExamples, inline: true }
      )
      .setFooter("Source: Yandex Dictionary API");

    message.channel.send(embed);
  }
});

client.login(token);
