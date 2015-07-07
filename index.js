var request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var redis = require('redis');
var md5 = require('MD5');
var http = require('http');



// only for preventing from sleep
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('alive');
  res.end();
}).listen(process.env.PORT||80);

//put your redis port
var client = redis.createClient(your port here, 'your host here');

client.auth('password', function (err) {
    
    //if (err) then throw err;
    
    //console.log(err);
});

//pub-redis-10606.us-east-1-1.1.ec2.garantiadata.com

var learn = {};


var token = 'bot token here';
// Setup polling way 
var bot = new TelegramBot(token, {polling: true});
bot.on('message', function (msg) {
    if(msg.text)
        msg.text=msg.text.toLowerCase();

    console.log(msg);
    
   var chatId = msg.chat.id;
console.log(chatId);
    if(learn.hasOwnProperty(chatId))
    {
    
        if(learn[chatId].stat == 1)
        {
    if(msg.text)
    {
        learn[chatId].command= msg.text;
        bot.sendMessage(chatId,'if someone says '+msg.text+' what should be my reply?');
    learn[chatId].stat = 2;
    }
    
            
    
    }
        else if(learn[chatId].stat == 2) {
        
        if(msg.photo) {
            console.log(msg);
            console.log(learn[chatId].command);
        
             
            console.log(msg.photo[0].file_id);
            
                client.set(md5(learn[chatId].command), JSON.stringify({photo:msg.photo[0].file_id.trim()}), function(err,reply){
                
                    console.log(err,reply);
                    bot.sendMessage(chatId,'Learned');
                
                });
        
        }
            
            else if(msg.document || msg.audio)
            {
                
                var dat = msg.document || msg.audio;
            
            console.log('here is docu:',dat.mime_type.search('audio/'));            
            if(dat.mime_type.search('audio/')>-1)
            {
            console.log('here is doc');
                console.log(dat);
                
                client.set(md5(learn[chatId].command), JSON.stringify({audio:dat.file_id}), function(err,reply){
                
                    console.log(err,reply);
                
                    if(!err)
                    {
                    
                        bot.sendMessage(chatId,'Learned');
                    
                    }
                    
                });
            }
            }
            
            else if(msg.text) {
            
            
            
            
                client.set(md5(learn[chatId].command), JSON.stringify({text:msg.text}), function(err,reply){
                
                    console.log(err,reply);
            
                                        if(!err)
                    {
                    
                        bot.sendMessage(chatId,'Learned');
                    
                    }

                    
                });
            
            
            }
            
            delete learn[chatId];   
    }
        
        return ;
    }
    

try {    
    switch((msg.text.toLowerCase()).replace('@liasonbot','').trim())
    {
            
            //remove this and teach him some nlp
            case 'than arua':
            case 'than arua ?':
            case 'than arua?':
            case 'than ara ?':
            case 'than ara?':
            case 'than ara':
            case 'who are you':
            case 'who are you ?':
            case 'who are you?':     sendimg('AgADBQADtKcxG1k20gaPLqhiJ4N4D9vlsTIABPjMlnZ9_x0aoBcBAAEC',chatId);
            break;
            
            case 'vatt':
            case 'vattanale ?':
            case 'vattanale?':
            case 'vattanaley?':
            case 'vattanaley':
    //        sendimg('AgADBQADs6cxG1k20gYwjVT-60zSW0HKsTIABIPp4r3NXKZTihkBAAEC',chatId);
            sendimg('AgADBQAD6qcxG78g6QNZ7DZQIQtOSUfJsTIABOimV7WYWIVB3xsBAAEC',chatId);
            break;  
            
            case '/learn':
            console.log('|');
            learn[msg.from.id]= {stat:1};
              bot.sendMessage(chatId,'Tell me the word or sentance to learn');

   
                        break;
            default:
                            
console.log((msg.text.toLowerCase()).replace('@liasonbot',''));
            if(msg.text) {
                console.log('here');
            client.get(md5(msg.text),function (err,reply) {
            
                if(err)
                {
                
                    console.log(error);
                
                }
                
                else if(reply)
                {
                
                    
                    var type = JSON.parse(reply);
                    console.log(type.text);
                    if(type.text) {
                    
                        
        bot.sendMessage(chatId,type.text);
                    
                    }
                    
                    else if(type.photo)
                    {
                    
                        bot.sendPhoto(chatId, type.photo);
                    //sendimg(chatId,type.photo);
                        
                    }
                    
                    else
                    {
                    
                        bot.sendAudio(chatId,type.audio)
                    
                    }
                    
                }
            
            });
                
            }
            
    }
}
    catch (e)
    {
    
        console.log(msg);
    
    }
    
//  // photo can be: a file path, a stream or a Telegram file_id 
  
    
});


function sendimg(photo,chatId){
bot.sendPhoto(chatId, photo).then(
function (err,reply){

    console.log(err);
}
);
}

