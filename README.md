## How to install

`git clone https://github.com/frkyldrm/discord-vocabulary-bot.git`

`cd discord-vocabulary-bot`

`npm i --save discord.js && npm i --save lodash && npm i --save axios`

After completing the installation, visit this website for api key. You will need it.  https://tech.yandex.com/dictionary/

####config.json　
Edit it yourself how you want.
```javascript
{
	"prefix": "!",
	"token": "YOUR-DİSCORD-TOKEN",
	"yandex_api_key": "YOUR-APİ-KEY",
	"lang": "en-tr",
	"command_vocabulary": "define",
	"wrong_format": "Oops. Wrong format. Try { !define vocable }",
	"embed_color":"#EFFF00",
	"not_found": "Nothing match...",
	"field_definition": "Definitions",
	"field_example": "Examples"
}
```
> !define world

![](https://raw.githubusercontent.com/frkyldrm/discord-vocabulary-bot/master/picture.png)

if you want remove **Source** line in bot. Open bot.js and delete line 76
