const test = require('tape');
const exec = require('child_process').execSync;
const hasAnsi = require('has-ansi');
const git = require('git-state');
const styles = require('chalk').styles;
const robbyrussell = require('./');

// Styles
const BOLD   = styles.bold.open;
const RESET  = styles.reset.close;
// Colors
const GREEN  = styles.green.open;
const RED    = styles.red.open;
const CYAN   = styles.cyan.open;
const BLUE   = styles.blue.open;
const YELLOW = styles.yellow.open;

/**
 * Status tests
 */
test('status', (t) => {
  const good = robbyrussell.status(0);
  const bad  = robbyrussell.status(1);

  t.plan(4);

  console.log('good:', good);
  t.true(hasAnsi(good), 'should contain ANSI');
  t.equal(good, `${GREEN}➜ `, 'should write character');

  console.log('bad:', bad);
  t.true(hasAnsi(bad), 'should contain ANSI');
  t.equal(bad, `${RED}➜ `, 'should write character');
});

/**
 * Directory case
 */
test('directory', (t) => {
  const dir = robbyrussell.directory('/path/to/dir');

  t.plan(2);

  console.log('directory:', dir);
  t.true(hasAnsi(dir), 'should contain ANSI')
  t.equal(dir, ` ${CYAN}dir`, 'should write only directory name');
});

/**
 * Git repo status
 */
test('git repo', (t) => {
  const branch = git.branchSync(__dirname);
  const tmpFile = `test-${(new Date()).valueOf()}.tmp`;

  t.plan(4);

  const clean = robbyrussell.gitRepo(__dirname);
  console.log('clean:', clean);
  t.true(hasAnsi(clean), 'clean should contain ANSI');
  t.equal(
    clean,
    ` ${BLUE}git:(${RED}${branch}${BLUE})`,
    'should be clean'
  );

  // Make repo dirty
  exec(`touch ${tmpFile}`);

  const dirty = robbyrussell.gitRepo(__dirname);
  console.log('dirty:', dirty);
  t.true(hasAnsi(clean), 'dirty should contain ANSI');
  t.equal(
    dirty,
    ` ${BLUE}git:(${RED}${branch}${BLUE})${YELLOW} ✗`,
    'should be dirty'
  );

  // Clean repo
  exec(`rm ${tmpFile}`);
});

/**
 * Whole composed prompt
 */
test('prompt', (t) => {
  const prompt = robbyrussell.prompt(0, __dirname);
  const status = robbyrussell.status(0);
  const directory =robbyrussell.directory(__dirname);
  const gitRepo = robbyrussell.gitRepo(__dirname);

  t.plan(2);

  console.log('prompt:', prompt);
  t.true(hasAnsi(prompt), 'contains ANSI');
  t.equal(
    prompt,
    `${BOLD}${status}${directory}${gitRepo}${RESET} `,
    'should use function'
  );
});
