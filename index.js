/**
 * Robby Russell's theme written in JavaScript
 *
 * @author: Denys Dovhan, denysdovhan.com
 * @license: MIT
 * @link: https://github.com/denysdovhan/robbyrussell
 */

const path   = require('path');
const git    = require('git-state');
const styles = require('ansi-styles');
const escape = require('./escape');

/**
 * Get current parent shell from adapter
 */
const shell = process.argv[3];

/**
 * Bind escape to the shell
 * We need that to escape non-printable characters properly
 * @see: ./escape.js
 */
const e = escape.bind(null, shell);

/**
 * Decorate ANSI-colors with shell-specific escapes
 */

// Styles
const BOLD   = e(styles.bold.open);
const RESET  = e(styles.reset.close);
// Colors
const GREEN  = e(styles.green.open);
const RED    = e(styles.red.open);
const CYAN   = e(styles.cyan.open);
const BLUE   = e(styles.blue.open);
const YELLOW = e(styles.yellow.open);

/**
 * Paint arrow in green and red depending on status code of
 * the last executed command
 * @param  {Number} exitCode Exit code of previous command
 * @return {String}          Propmpt character with color
 */
function status(exitCode) {
  return `${exitCode === 0 ? GREEN : RED}➜ `;
}

/**
 * Current working directory
 * @param  {String} cwd Full path to the current working directory
 * @return {String}     Formated string with current folder
 */
function directory(cwd) {
  const dir = path.basename(cwd);
  return `${CYAN}${dir}`;
}

/**
 * Get current branch and check if repo is dirty
 * @param  {String} cwd Full path to the current working directory
 * @return {String}     Fromated string with git status
 */
function gitRepo(cwd) {
  let gitStatus = [];

  if (git.isGitSync(cwd)) {
    gitStatus.push(`${BLUE}git:(`);
    gitStatus.push(`${RED}${git.branchSync()}`);
    gitStatus.push(`${BLUE})`);

    if (git.dirtySync(cwd)) {
      gitStatus.push(`${YELLOW} ✗`);
    }
  }

  return gitStatus.join('');
}

/**
 * Compose whole promptk
 * @return {String}
 */
function prompt() {
  const code = process.argv[2];
  const cwd  = process.cwd();
  return `${BOLD}${status(code)} ${directory(cwd)} ${gitRepo(cwd)} ${RESET}`
}

/**
 * Write prompt to stdout and exit with zero-code
 */
process.stdout.write(prompt());
process.exit(0);
