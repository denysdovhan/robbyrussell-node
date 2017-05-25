const styles = require('./utils/colors');

/**
 * Default prompt config
 * Could be owerriden with .prompt-config.js
 */
module.exports = {
  async: false,
  prompt: {
    open: styles.bold.open,
    close: styles.bold.close + styles.reset.close
  },
  status: {
    char: '➜',
    success: styles.green.open,
    failure: styles.red.open,
  },
  dir: {
    color: styles.cyan.open
  },
  git: {
    indicator: styles.blue.open,
    branch: styles.red.open,
    dirty: styles.yellow.open,
    dirtyChar: '✗'
  }
};