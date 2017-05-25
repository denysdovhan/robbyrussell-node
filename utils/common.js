const chalk = require('chalk');

/**
 * Simple logger
 * @param {string}   text  Log message (cyan)
 * @param {string} params  Other information
 */
function log(text, ...params) {
  // eslint-disable-next-line
  console.log(chalk.cyan(text), ...params);
}

/**
 * Simple success logger
 * @param {string} text Successful message
 */
function success(...text) {
  // eslint-disable-next-line
  console.log(chalk.green(...text));
}

/**
 * Simple error logger
 * @param {string} text Error message
 */
function error(...text) {
  // eslint-disable-next-line
  console.log(chalk.red(...text));
}

/**
 * Attempt to load config
 * Otherwise return an empty object
 * @param {string} configPath Path to config
 * @return {object}
 */
function loadConfig(configPath) {
  try {
    return require(configPath);
  } catch (e) {
    // Skip errors related to .prompt-config.js
    if (!e.message.includes('.prompt-config')) {
      console.log(e); // eslint-disable-line
    }
    return {};
  }
}

/**
 * Print string to stdout and close process
 * @param {string} str String to be print to the stdout
 */
function processPrint(str) {
  process.stdout.write(str);
  process.exit(0);
}

/**
 * Export all utils
 */
module.exports = {
  log,
  success,
  error,
  loadConfig,
  processPrint,
};