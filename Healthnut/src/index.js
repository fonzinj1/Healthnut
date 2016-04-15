/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [

    "Fruits and fruit juices have lots of vitamins and minerals that help the body to function. Eating fruits for a snack or as a side during a meal can help you to load up on vitamin A and C, as well as potassium. They are super low in fat and sodium, too.",
    "When you can, try and choose fresh fruit over fruit juices, frozen, canned, or dried fruit. Most of the time, these products have a lot of added sugars. You don’t want that. So, try and stick with the real thing.", 
    "Most people should be getting 2 to 4 servings of fruits a day. One serving of fruit could be a medium apple, banana, or orange.",
    "Fruits have a ton of fiber. Fiber can help you feel fuller for a longer period of time. So, whenever you feel hungry, snack on a handful of strawberries or blueberries to fill you up.",
    "Fruits have a lot of anti-oxidants, which help the body boost immunity and protect itself against stress, diseases, and certain cancers. An apple a day really does keep the doctor away.",
    "Some fruits sold at grocery stores have been treated with fertilizers and chemicals, so make sure that you wash them under running water before you eat them.",
    "How you can store your fruit can make a difference in how they taste. Almost any fruit can be stored in the refrigerator to be kept fresh, except for bananas, lemons, and limes. You should keep those in a cool, dry area.",
    "When you buy fruit at the grocery store, focus on color. The brighter and more vibrant the colors of the fruit, the better the fruit will taste.",
    "Add lemon juice to fruits after you cut them up. This way, they will last longer before your store them away again.",
    "Fruits are nature’s candy. Most fruits are high in glucose, or sugar, but this sugar is a lot better for you than the sugar that is in sweets. So, if you are looking for a healthy way to satisfy your sweet tooth, eat some fruit. Just make sure you are sticking to 2 to 4 servings of fruit a day.",
    "Try making a fruit smoothie with at least three different fruits, Greek yogurt or low-fat milk, and one vegetable. Trust me, you won’t even taste the veggies.", 
    "Vegetables, like fruit, are very low in calories and fats, but they contain a lot of essential vitamins and minerals that keep your body in tip top shape. Vegetables can have a lot of magnesium, potassium, iron, and vitamin A, C, and K.",
    "Most vegetables are made of water and fiber. Eating vegetables will help you to feel more full and prevent you from overeating. Plus, with all the water, vegetables will keep you hydrated throughout the day.",
    "Try to get at least 5 to 7 servings of vegetables per day. Try to fill half your plate with vegetables. Vegetables are great because you can eat as much as you want without packing on a lot of calories.",
    "Vegetables are best eaten when they are fresh from the grocery store. After a few days without being eaten, veggies will start to lose their health benefits. So, eat your vegetables as fast as you can so you can be as healthy as possible.",
    "Color is key. Make your plate as colorful as possible with your vegetables. The more colors you see, the more nutrients you are getting.",
    "Green vegetables typically have the least amount of calories, so go green and load up on celery, spinach, broccoli, cucumbers, and lettuce. Other vegetables, like potatoes and corn, have a ton of fiber, making them starchier. So, make sure you enjoy these vegetables in moderation.",
    "The most vitamins and nutrients are found within the vegetable’s skin. Some of these nutrients are lost when they are cooked or boiled, so try to enjoy your vegetables raw.",
    "Adults aren’t lying, you really do need to eat your vegetables to grow big and strong. Vegetables can provide benefits to our skin, teeth, nails, hair and even help to prevent signs of ageing.",
    "Want to help build your muscles? Well, you need protein to do that. If you want to get a lot of protein without eating meat, then try eating beans or lentils. These legumes are full of fiber and proteins that will help you stay energized and strong.",
    "Try eating celery and carrots with peanut butter or cream cheese as a healthy after school snack.",
    "Protein is a macronutrient, meaning that it is one of the main sources for energy in the body. The body uses proteins for energy and for creating reactions, like digesting your food and growing and repairing muscles.",
    "Some healthy sources of protein include eggs, milk, yogurt, tofu, lentils, meats, seeds, and, my personal favorite, nuts. Make sure you include a protein in every meal to help your body grow big and strong.",
    "Try to eat at least 2 to 3 servings of protein a day. One serving of meats should be the size and thickness of your palm.",
    "Although meats help your body get a lot of protein, they can also have a lot of fat. Try to swap out red meats for leaner ones, like chicken, turkey, or fish.",
    "Nuts are an excellent source of protein. They are my favorite. But, nuts are also high in fat and calories. So, make sure you are only eating nuts as a small snack.",
    "Cells are the building blocks of the body. You have zillions of them. Did you know that protein lives in every single one of your cells. No human could even live without protein.",
    "You may have heard a lot of athletes or bodybuilders drinking protein shakes to help build their muscles. Protein shakes are okay every now and then, but you want to make sure that you are eating whole, natural foods to be the healthiest that you can be.",
    "Eggs have the highest quality of protein out of any food. So, enjoy a filling, healthy breakfast of scrambled eggs. Not too many eggs though. The yolk of the egg also has a lot of cholesterol, which is not very good for your heart.",
    "Did you know that starting out your day with foods high in protein could help reduce your cravings for unhealthy foods all throughout the day. Start your day with yogurt, low fat milk, cottage cheese, or eggs to keep you on the right track for your next meals.",
    "For a protein-rich snack, have a handful of almonds, peanuts, or sunflower seeds. Or, try a hard-boiled egg.",
    "Milk, cheese, and yogurt provide protein, vitamins, and minerals to help your body stay strong. Dairy products are also a great source of calcium, which makes your bones and teeth stronger.",
    "Try and eat at least 2 to 3 servings of dairy a day. One serving looks like 1 cup of milk, a 1-ounce cube of cheese, or 1 cup of yogurt.",
    "Always try to choose skim milk products over whole milk ones so that you aren’t eating too much fat. Go for some nonfat yogurt or cottage cheese as a healthy breakfast or quick snack.",
    "Cows give an average of 6 to 7 gallons of milk per day. That is enough to fill a hundred glasses of milk. If you are in a class with 32 other kids, that is enough milk for each student to have 3 whole glasses to themselves.",
    "More than 1000 dairy products are introduced each year. That is a lot of dairy to choose from. To keep things simple, make sure that you are eating whole or organic dairy products. This way, you can avoid extra the sugars, artificial flavors, or fats that may be in these other products.",
    "Milk is the best sports drink out there. After running or playing for a long period of time, your body needs to replace any fluids and nutrients lost while you were sweating. Because milk has protein, vitamins, and minerals, it can help to reenergize your body after a game or a long day of play.",
    "Chocolate milk has all of the essential vitamins and minerals that regular milk does. Chocolate milk does have slightly more calories and sugar than regular milk, so be sure to enjoy it in moderation. And, no, chocolate milk does not come from brown cows.",
    "To keep milk or other dairy products as fresh as possible, store them in the refrigerator as soon as you get home from the grocery store. Never leave dairy products on the counter for a long period of time because they will go bad. Always give the milk a quick sniff if you are not sure if it is still good. If the milk smells sour, then you should toss it and buy a fresh replacement.",
    "There are so many different types of milk. There is whole milk, 2 percent milk, 1 percent milk, and fat free milk. Always try to shoot for the milks that have a lower percentage of fat. The same goes for yogurts and cheeses.",
    "Eat a small bowl of nonfat yogurt topped with any fruit of your choice. Try adding some honey or cinnamon for added sweetness.",
    "Grains like breads, cereals, rice, and pasta provide complex carbohydrates, which are an important source of energy and fiber for the body.",
    "There are two types of grains. Whole grains and refined grains. Whole grains have the entire grain kernel from the plant, while refine grains have been processed to remove the grain kernel. In simpler terms, whole grains are more natural than refined grains. Stick to whole wheat breads and pastas to make sure that you are eating the healthiest grains possible.",
    "Any food made from wheat, rice, oats, cornmeal, barley, or any other cereal grain is a grain product. There are tons of foods made from grains. Because grains provide an inane amount of energy and fiber, this food group is the largest.",
    "Try eating at least 6 to 11 servings of grain per day. A serving of grain looks like 1 slice of bread, a handful of cereal, or half a cup of cooked rice or pasta.",
    "People who eat whole grains as a part of a healthy diet have a reduced risk of chronic diseases, or illnesses that can last a very long time. Grains have a ton of dietary fiber that can help maintain a healthy heart.",
    "When you are looking to buy breads, pastas, or cereals, look at the nutrition labels on the bags and boxed. Beware of words like multi-grain, stone-ground, cracked wheat, enriched flour, or bran. These products try and get you to believe that you are buying whole grain products, when you really aren’t. Make sure you get products that have 100 percent Whole Wheat or, Whole, written somewhere on the package so that you are eating the most natural grains possible.",
    "Here is a list of healthy whole grains that you should be on the lookout for when you are grocery shopping. amaranth, barley, brown rice, buckwheat, corn, popcorn, millet, quinoa, rye, oats, wild rice, and bulgur wheat.",
    "When you are looking for whole grain breads or foods, color can be deceiving. Just because the product is brown, it doesn’t necessarily mean that it is whole wheat. The brown coloring could be from added sugars or flavoring. Remember to read your labels.",
    "Steer clear of sugary cereals in favor of whole grain cereals, like Cheerios or plain oatmeal. If you want more flavor or sweetness, add some fruit or honey.",
    "Have two handfuls of plain popcorn or a small bowl of oatmeal with fruit or raisins as a healthy and filling snack.",
    "Sweets make up the very tippy top of the food pyramid. It contains treats like candy, cakes, sugar, soft drinks, jams, jellies, butters, and more. This means that you should only be eating these foods in moderation.",
    "Fats, oils, and sweets can add a lot flavor to our diet. You don’t have to give them up, especially if you have a sweet tooth, but you have to make sure that you are only eating a small amount of these foods per day.",
    "Try to only consume about 6 to 18 teaspoons of sugar a day. Think about this: some fruit juices and sodas can contain over 10 teaspoons of sugar. That is a lot of sugar for just one drink. If you want to have something sweet, skip the sugary drink and have a small treat instead.",
    "Food with a lot of fat and sugar, known as junk food, have very little nutritional value and are high in calories. Eating too much of these foods keeps your body from running on the cleanest energy possible.",
    "Eating too many fats, oils, or sweets can often lead to various sickness and diseases, like obesity, heart disease, high blood pressure, tooth decay, and more. To be as healthy as possible, try to limit the number of sugary or fatty foods that you eat.",
    "Most sweets, fats, or oils are not considered natural. This means that they were made in a factory, rather than growth from the earth.",
    "A good tip to eat the healthiest foods possible is to avoid buying things in a box. If you walk up and down the isles of the grocery store, most cookies, crackers, cakes, or candies are wrapped in bags. Take a quick look at the nutrition label on the back of these packages. If you can’t pronounce the ingredients on the label, then they most likely are not natural and are made from chemicals.",
    "Some foods contain healthy fats, which are necessary to keep your body healthy and running efficiently. These fats come from whole, natural foods, such as nuts, olives, oily fish, dark chocolate, and avocados.",
    "The body quickly soaks up sugars from unhealthy foods and uses them for energy. The problem is that sugar is not a lasting source of energy for the body. Sugar may make you feel energized for a short period of time, but this energy can quickly run out, making you feel more tired and sluggish.",
    "If you want to treat yourself to a healthy dessert, try eating a few pieces of dark chocolate or a small cup of frozen yogurt."




];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SpaceGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SpaceGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SpaceGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Health Nut tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * SPACE_FACTS.length);
    var fact = SPACE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Hey there and welcome to Health Nut. I have plenty of fun food facts for you. Here is your food fact: " + fact;

    response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};

