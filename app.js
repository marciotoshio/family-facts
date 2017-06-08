/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = process.env['app_id'];

const languageStrings = {
    'en': {
        translation: {
            GIGI_FACTS: [
                'She likes a lot to eat.',
                'She\'s so boring.',
                'At least do the dishes',
            ],
            MATEUS_FACTS: [
                'He is skinny, but he is so beatiful.',
                'He is a smart boy.',
            ],
            DUDU_FACTS: [
                'Loves to watch youtube.',
                'If he can, he only eats pizza and hamburguers.',
            ],
            ARTHUR_FACTS: [
                'The king of mess.',
                'Despite the size, makes a lot of mess.',
                'The cutest kid in the town',
            ],
            LIZ_FACTS: [
                'The little princess.',
                'The newest on the family.',
            ],
            PAULA_FACTS: [
                'Makes delicious food.',
                'The best mom in the universe.',
            ],
            TOSHIO_FACTS: [
                'My master, my lorde, the greatest, I love him!',
                'The lorde of the universe.',
                'The greatest of all time.',
                'No one as smart as him.',
            ],
            SKILL_NAME: 'Family Facts',
            GET_FACT_MESSAGE: "Here's your fact about ",
            HELP_MESSAGE: 'You can say tell me a family fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            SORRY_MESSAGE: "Sorry but I don't know what to do.",
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        const util = require('util');

        console.log('## REQUEST ##');
        console.log(util.inspect(this.event.request, false, null))


        if(this.event.request.intent && Object.keys(this.event.request.intent).length !== 0) {
            console.log('## INTENT ##');
            console.log(util.inspect(this.event.request.intent, false, null))

            if(this.event.request.intent.slots && Object.keys(this.event.request.intent.slots).length !== 0) {
                console.log('## SLOTS ##');
                console.log(util.inspect(this.event.request.intent.slots, false, null))

                let name = this.event.request.intent.slots.Name.value.toUpperCase();

                var facts_about = '';
                var real_name = '';

                if(name.indexOf('GI') !== -1) {
                    facts_about = 'GIGI_FACTS';
                    real_name = 'Gigi';
                } else if (name.indexOf('TEU') !== -1) {
                    facts_about = 'MATEUS_FACTS';
                    real_name = 'Mateus';
                } else if (name.indexOf('DU') !== -1) {
                    facts_about = 'DUDU_FACTS';
                    real_name = 'Dudu';
                } else if (name.indexOf('AR') !== -1 || name.indexOf('TU') !== -1) {
                    facts_about = 'ARTHUR_FACTS';
                    real_name = 'Arthur';
                } else if (name.indexOf('LI') !== -1) {
                    facts_about = 'LIZ_FACTS';
                    real_name = 'Liz';
                } else if (name.indexOf('PA') !== -1) {
                    facts_about = 'PAULA_FACTS';
                    real_name = 'Paula';
                } else if (name.indexOf('TO') !== -1 || name.indexOf('MA') !== -1) {
                    facts_about = 'TOSHIO_FACTS';
                    real_name = 'Toshio';
                } else {
                    facts_about = 'TOSHIO_FACTS';
                    real_name = 'Toshio';
                }

                const factArr = this.t(facts_about);
                const factIndex = Math.floor(Math.random() * factArr.length);
                const randomFact = factArr[factIndex];

                // Create speech output
                const speechOutput = this.t('GET_FACT_MESSAGE') + real_name + ': ' + randomFact;
                this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
            }
            else {
                console.log('Empty slots.')
                this.emit(':tell', this.t('SORRY_MESSAGE'));
            }
        } else {
            console.log('Empty intent.')
            this.emit(':tell', this.t('SORRY_MESSAGE'));
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
