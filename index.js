/**
 * Cross-shell robbyrussell theme written in JavaScript
 *
 * @author: Denys Dovhan, denysdovhan.com
 * @license: MIT
 * @link: https://github.com/denysdovhan/robbyrussell
 */

const path   = require('path');
const colors = require('./utils/colors');
const git    = require('./utils/git');

/**
 * Paint arrow in success or failure colors depending on
 * status code of the last executed command
 * @param  {object} config Configuration of prompt
 * @return {string}        Propmpt character with color
 */
function status(config) {
  const { char, success, failure } = config.status;
  return `${config.code === 0 ? success : failure}${char} `;
}

/**
 * Current working directory
 * @param  {object} config Configuration of prompt
 * @return {string}        Formated string with current folder
 */
function directory(config) {
  const { color } = config.dir;
  const dir = path.basename(config.cwd);
  return `${color}${dir}`;
}

/**
 * Synchronous method
 * Get current branch and check if repo is dirty
 * @param  {object} config Configuration of prompt
 * @return {string}        Fromated string with git status
 */
function gitRepo(config) {
  const { indicator, branch, dirty, dirtyChar } = config.git;

  let gitStatus = '';

  if (git.isGitSync(config.cwd)) {
    gitStatus += ` ${indicator}git:(${branch}${git.branchSync()}${indicator})`;

    if (git.dirtySync(config.cwd) || git.untrackedSync(config.cwd)) {
      gitStatus += `${dirty} ${dirtyChar}`;
    }
  }

  return gitStatus;
}

/**
 * Asynchronous method
 * Get current branch and check if repo is dirty
 * @param {object} config Configuration of prompt
 * @return {string}       Formated string with git status
 */
async function gitRepoAsync(config) {
  const { indicator, branch, dirty, dirtyChar } = config.git;

  let gitStatus = '';

  if (await git.isGit(config.cwd)) {
    gitStatus += ` ${indicator}git:(${branch}${await git.branch()}${indicator})`;

    if (await git.dirty(config.cwd) || await git.untracked(config.cwd)) {
      gitStatus += `${dirty} ${dirtyChar}`;
    }
  }

  return gitStatus;
}

/**
 * Compose whole prompt
 * @param {object} config Configuration of prompt
 * @return {string}
 */
function prompt(config) {
  const { open, close } = config.prompt;
  return `${open}${status(config)}${directory(config)}${gitRepo(config)}${close} `;
}

/**
 * Compose whole prompt
 * @param {object} config Configuration of prompt
 * @return {string}
 */
async function promptAsync(config) {
  const { open, close } = config.prompt;
  return `${open}${status(config)}${directory(config)}${await gitRepo(config)}${close} `;
}

/**
 * Export all parts for prompt
 */
module.exports = {
  status,
  directory,
  gitRepo,
  gitRepoAsync,
  prompt,
  promptAsync,
};
