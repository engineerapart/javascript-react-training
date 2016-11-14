var path = require('path');
var fs = require('fs');
var prompt = require('readline-sync');
var chalk = require('chalk');
var dotenv = require('dotenv');

var envFile = path.join(__dirname, '..', '.env');
var requiredVals = {
  'REDDIT_USERNAME': {
    prompt: chalk.yellow.bold.underline('Enter your Reddit username') + ': ',
    limit: /[0-9a-zA-Z\-]+$/i,
    limitMessage: 'Username must be only letters, numbers, or dashes',
  }
};

module.exports = function ensureUserData() {
  var userData = {};
  var absentVals = requiredVals;
  var config = {};
  try {
    var envString = fs.readFileSync(envFile);
    config = dotenv.parse(envString);

    absentVals = {};
    Object.keys(requiredVals).forEach(function(key) {
      if(!config[key]) {
        absentVals[key] = requiredVals[key];
      }
    });

    if(absentVals.length) {
      throw new Error('Please complete your env file');
    }
  } catch (err) {
    Object.keys(absentVals).forEach(function(promptKey) {
      var promptItem = absentVals[promptKey];
      var value = prompt.question(promptItem.prompt, {
        limit: promptItem.limit,
        limitMessage: promptItem.limitMessage,
        hideEchoBack: promptItem.hideEchoBack,
        mask: promptItem.mask,
      });

      absentVals[promptKey].value = value;
      config[promptKey] = value;
    });
    config.REDDIT_NONCE = 'STUDENT-' + randomString(8);

    var envStrings = [];
    Object.keys(config).forEach(function(key) {
      envStrings.push(`${key}=${config[key]}`);
    });
    var envString = envStrings.join('\n');

    try {
      fs.writeFileSync(envFile, envString);
    } catch (err) {
      console.warn(`Your unique user data could not be written to ${envFile} because ${err.message}. You will have to repeat this prompt each time you run until the problem is resolved and the results can be saved.`);
    }
  }

  // Inject the missing env values into process.env
  Object.keys(absentVals).forEach(function(key) {
    process.env[key.toUpperCase()] = absentVals[key].value;
  })
  process.env.REDDIT_NONCE = config.REDDIT_NONCE;

  return config;
}

function randomString(length) {
  return Math.random().toString(36).slice(1).substr(2, length).toUpperCase();
}