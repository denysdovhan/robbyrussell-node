const git = require('git-state');
const pify = require('pify');

module.exports = {
  /**
   * Promisified git methods
   */
  isGit: cwd => new Promise(resolve => git.isGit(cwd, resolve)),
  dirty: pify(git.dirty),
  branch: pify(git.branch),
  untracked: pify(git.untracked),
  /**
   * Synchronous git methods
   */
  isGitSync: git.isGitSync,
  branchSync: git.branchSync,
  dirtySync: git.dirtySync,
  untrackedSync: git.untrackedSync,
};
