const escape = require('./escape');
const styles = require('chalk').styles;

/**
 * Get current parent shell from adapter
 */
const shell = process.argv[3] || process.env.SHELL;

/**
 * Bind escape to the shell
 * We need that to escape non-printable characters properly
 * @see: ./escape.js
 */
const esc = escape(shell);

/**
 * Decorate ANSI-colors with shell-specific escapes
 */
Object.keys(styles).forEach((style) => {
  module.exports[style] = {
    open: esc(styles[style].open),
    close: esc(styles[style].close),
  };
});