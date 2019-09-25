//Real Time Massages//
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);

//Web API//
const { WebClient } = require('@slack/web-api');
const web = new WebClient(token);

//Interactive Massages//
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);

//Port//
const port = process.env.PORT || 3000;
console.log(`Port: ${port}`);

//Mongo//
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url, { useNewUrlParser: true }, { useUnifiedTopology: true });
mongoClient.connect(function(err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db('usersdb').collection('users');
});

//Express//
const express = require('express');
const app = express();
const jsonParser = express.json();
app.listen(4000, function(req, res) {
    console.log('Сервер ожидает подключения...');
});

let dbClient;
app.use(express.static(__dirname + '/public'));

//Get Order//
app.get('/api/users', function(req, res) {
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users) {
        if (err) return console.log(err);
        res.send(users);
    });
});

app.get("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, user){
               
        if(err) return console.log(err);
        res.send(user);
    });
});

//Delete Order//
app.delete("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let user = result.value;
        res.send(user);
    });
});

//Listen To The Click (ctrl + c)//
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

//Catch Messages//
rtm.on('message', async (data) => {
    console.log(data);

//Any Text toUpper//
    data.text = data.text.toUpperCase();

//Responding To A User Message//
    if (data.text === 'ПИЦЦА' || data.text === 'ПИЦА') {
        await web.chat.postMessage({
            channel: 'CNC9ZUYBA',
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "Здравствуйте! Какую пиццу Вы хотите заказать?:pizza:",
                        "emoji": true
                    }
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "*Пицца Пепперони*\nМаленькая(25см): *500 рублей*\nСредняя(35см): *750 рублей*\nБольшая(45см): *1150 рублей*\n*Описание:*\nПицца на тонком тесте со свежими томатами и остренькой колбаской Пепперони."
                                },
                                "accessory": {
                                    "type": "image",
                                    "image_url": "https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg",
                                    "alt_text": "Пицца Пепперони"
                                }
                            },
                            {
                                "type": "actions",
                                "elements": [
                                    {
                                        "type": "button",
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Заказать",
                                            "emoji": true
                                        },
                                        "value": "pepperoni"
                                    }
                                ]
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "*Пицца Гавайская*\nМаленькая(25см): *500 рублей*\nСредняя(35см): *750 рублей*\nБольшая(45см): *1150 рублей*\n*Описание:*\nПицца на тонком тесте с сочными ананасами, нежной ветчиной и куриным филе."
                                },
                                "accessory": {
                                    "type": "image",
                                    "image_url": "https://nasha-pizza.by/upload/resize_cache/iblock/5c4/700_700_240cd750bba9870f18aada2478b24840a/5c44df76a0f0c3c0f21ab3cda908f75d.jpg",
                                    "alt_text": "Пицца Гавайская"
                                }
                            },
                            {
                                "type": "actions",
                                "elements": [
                                    {
                                        "type": "button",
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Заказать",
                                            "emoji": true
                                        },
                                        "value": "hawaiian"
                                    }
                                ]
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "*Пицца Цезарь*\nМаленькая(25см): *500 рублей*\nСредняя(35см): *750 рублей*\nБольшая(45см): *1150 рублей*\n*Описание:*\nПицца на тонком тесте с соусом Цезарь, куриным филе, свежими томатами и пекинской капустой."
                                },
                                "accessory": {
                                    "type": "image",
                                    "image_url": "http://che-cafe.ru/image/cache/data/picca-cezar-s-kuritcey-600x600.jpg",
                                    "alt_text": "Пицца Цезарь"
                                }
                            },
                            {
                                "type": "actions",
                                "elements": [
                                    {
                                        "type": "button",
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Заказать",
                                            "emoji": true
                                        },
                                        "value": "caesar"
                                    }
                                ]
                            },
                            {
                                "type": "divider"
                            }
                        ]
        });
    }
});

//Button Response//
let pizzaName;
slackInteractions.action({ type: 'button' }, (payload, respond) => {
    console.log(payload);

    openDialog(payload.trigger_id, payload.actions[0].value);

    pizzaName = payload.actions[0].value;
});

//Submitting A Dialogue//
slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
    console.log('PAYLOAD: ', payload);

    mongoClient.connect(function(err, client) {
        if (err) return console.log(err);
        const db = client.db('usersdb');
        const collection = db.collection('users');

        if (pizzaName === 'hawaiian') {
            pizzaName = 'Гавайская';
        }
        else if (pizzaName === 'pepperoni') {
            pizzaName = 'Пепперони';
        }
        else if (pizzaName === 'caesar') {
            pizzaName = 'Цезарь';
        }

        if (payload.submission.pizzaSize === 'small') {
            payload.submission.pizzaSize = 'Маленькая';
        }
        else if (payload.submission.pizzaSize === 'middle') {
            payload.submission.pizzaSize = 'Средняя';
        }
        else if (payload.submission.pizzaSize === 'big') {
            payload.submission.pizzaSize = 'Большая';
        }

//Writing An Order To The Database//
        let user = {pizzaName: pizzaName, size: payload.submission.pizzaSize, address: payload.submission.adress, phone: payload.submission.phone};
        collection.insertOne(user, function(err, results){
            client.close();
        });
    
//Search For Items In The Database//
        collection.find().toArray(function(err, results){
                 
            console.log(results);
            client.close();
        });
    });

//Message After Order Confirmation In The Dialog Box//
    const result = web.chat.postMessage({
        channel: 'CNC9ZUYBA',
        text: 'Заказ принят! <@' + payload.user.name + '>, ожидайте, скоро Вам позвонит наш оператор.'
    });
});

//Start RTM start Interactive//
(async () => {

//Start Interactive//
    const server = await slackInteractions.start(port);
    console.log(`Listening for events on ${server.address().port}`);

//Start RTM//
    await rtm.start();
    console.log('Bot Started');

//Message when the bot is turned on//
    await web.chat.postMessage({
        channel: 'CNC9ZUYBA',
        text: 'Здравствуйте! Чтобы заказать пиццу, напишите в чат "Пицца".'
    });
})();

//Dialog Open//
function openDialog(triggerId, pizzaName) {
    (async () => {
        if (pizzaName === 'pepperoni') {
            pizzaName = 'Пепперони';
        }
            
        else if (pizzaName === 'hawaiian') {
            pizzaName = 'Гавайской';
        }
            
        else if (pizzaName === 'caesar') {
            pizzaName = 'Цезарь';
        }
//Dialog Box//
        const result = await web.dialog.open({
            trigger_id: triggerId,
            dialog: {
                callback_id: 'getOrder',
                title: `Заказ пиццы ${pizzaName}`,
                submit_label: 'Request',
                elements: [
                    {
                        type: 'select',
                        label: 'Размер пиццы',
                        placeholder: 'Выберите размер пиццы',
                        name: 'pizzaSize',
                        options: [
                            {
                                label: 'Маленький(25см)',
                                value: 'small'
                            },
                            {
                                label: 'Средний(35см)',
                                value: 'middle'
                            },
                            {
                                label: 'Большая(45см)',
                                value: 'big'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        label: 'Адрес',
                        name: 'adress',
                        hint: 'Введите свой адрес'
                    },
                    {
                        type: 'text',
                        label: 'Номер телефона',
                        name: 'phone',
                        subtype: 'tel',
                        hint: 'Введите свой номер телефона'
                    }
                ]
            }
        });
    })();
}
