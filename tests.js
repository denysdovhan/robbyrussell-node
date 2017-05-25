const test = require('tape');
const exec = require('child_process').execSync;
const hasAnsi = require('has-ansi');
const gitUtils = require('./utils/git');
const robbyrussell = require('.');
const colors = require('./utils/colors');

/**
 * Status tests
 */
test('status', (t) => {
  const status = {
    char: '->',
    success: colors.green.open,
    failure: colors.red.open,
  }

  const good = robbyrussell.status({ code: 0, status });
  const bad  = robbyrussell.status({ code: 1, status });

  t.plan(4);

  console.log('good:', good);
  t.true(hasAnsi(good), 'should contain ANSI');
  t.equal(good, `${status.success}${status.char} `, 'should write character');

  console.log('bad:', bad);
  t.true(hasAnsi(bad), 'should contain ANSI');
  t.equal(bad, `${status.failure}${status.char} `, 'should write character');
});

/**
 * Directory case
 */
test('directory', (t) => {
  const dir = {
    color: colors.cyan.open,
  };

  const directory = robbyrussell.directory({ cwd: '/path/to/dir', dir });
  const home = robbyrussell.directory({ cwd: `/home/${process.env.USER}`, dir });

  t.plan(3);

  console.log('directory:', directory);
  t.true(hasAnsi(directory), 'should contain ANSI')
  t.equal(directory, `${dir.color}dir`, 'should write only directory name');
  console.log('at home:', home);
  t.equal(home, `${dir.color}~`, 'should write ~ when in home');
});

/**
 * Git repo status. Sync.
 */
test('git', (t) => {
  const branch = gitUtils.branchSync(__dirname);
  const tmpFile = `test-${(new Date()).valueOf()}.tmp`;

  const git = {
    indicator: colors.blue.open,
    branch: colors.red.open,
    dirty: colors.yellow.open,
    dirtyChar: 'x',
  };

  if (!gitUtils.dirtySync(__dirname) && !gitUtils.untrackedSync(__dirname)) {
    const clean = robbyrussell.gitRepo({ cwd: __dirname, git });
    console.log('clean:', clean);

    t.true(hasAnsi(clean), 'clean should contain ANSI');
    t.equal(
      clean,
      ` ${git.indicator}git:(${git.branch}${branch}${git.indicator})`,
      'should be clean'
    );
  }

  // Make repo dirty
  exec(`touch ${tmpFile}`);

  const dirty = robbyrussell.gitRepo({ cwd: __dirname, git });
  console.log('dirty:', dirty);
  t.true(hasAnsi(dirty), 'dirty should contain ANSI');
  t.equal(
    dirty,
    ` ${git.indicator}git:(${git.branch}${branch}${git.indicator})${git.dirty} ${git.dirtyChar}`,
    'should be dirty'
  );

  // Clean repo
  exec(`rm ${tmpFile}`);

  t.end();
});

/**
 * Whole composed prompt
 */
test('prompt', (t) => {
  const config = {
    cwd: 'path/to/dir',
    code: 0,
    prompt: {
      open: colors.bold.open,
      close: colors.bold.close + colors.reset.close
    },
    status: {
      char: '➜',
      success: colors.green.open,
      failure: colors.red.open,
    },
    dir: {
      color: colors.cyan.open
    },
    git: {
      indicator: colors.blue.open,
      branch: colors.red.open,
      dirty: colors.yellow.open,
      dirtyChar: '✗'
    },
  }

  const prompt = robbyrussell.prompt(config);
  const status = robbyrussell.status(config);
  const directory =robbyrussell.directory(config);
  const gitRepo = robbyrussell.gitRepo(config);

  t.plan(2);

  console.log('prompt:', prompt);
  t.true(hasAnsi(prompt), 'contains ANSI');
  t.equal(
    prompt,
    `${colors.bold.open}${status}${directory}${gitRepo}${colors.bold.close + colors.reset.close} `,
    'should use function'
  );
});
