![robbyrussell-img][robbyrussell-img]

# robbyrussell

[![NPM version][npm-image]][npm-url]
[![Node.js version][node-image]][node-url]
[![Dependency status][depstat-image]][depstat-url]
[![Build status][buildstat-image]][buildstat-url]
[![Donate][donate-image]][donate-url]

> Cross-shell [robbyrussell] theme written in JavaScript

## Motivation

I'm developing 🚀⭐️ [spaceship-zsh-theme] which is an extremely powerful and customizable prompt for ZSH. It supports a lot of environments and tools to make you enjoy using it. However, there are plenty issues I faced: zsh is hard, dependency management is difficult, testing is near to impossible and so on.

This project is just a proof of concept. Definitely, that's not the best implementation, nevertheless, it opens interesting possibilities:

* **high-level language** — ZSH is nice, but not for programming. JavaScript or Python seems more comfortable for these cases.
* **single code base** — Single source code for all shells. The core logic is written in a high-level language while the shell-specific code is located in special files called _adapters_.
* **cross-shell** — different shells are too specific. Single code base on high-level language with unified interface gives us an ability to use it with any shell(fish, zsh, bash, sh, etc).
* **cross-platform** — things like [`pkg`](https://github.com/zeit/pkg) allows us to package prompt into binary and use it wherever we want, even without installed language runtime.
* **testable** — high-level language and its infrastructure make it possible to test prompt components with tools like [Mocha](https://mochajs.org/), [Jest](https://facebook.github.io/jest/) or [tape](https://github.com/substack/tape) (unlike traditional prompts which are usually untested).
* **dependency management** — [NPM](https://www.npmjs.com/), [RubyGems](https://rubygems.org/) and [PyPI](https://pypi.python.org/pypi) store thousands of packages that could be used for special prompt's needs. It's also possible to install prompt itself with one of these package managers.
* **asynchronous checks** — the more synchronous checks you do, the slower prompt becomes. Things like [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) or [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) could perform environment checks concurrently, so we can achieve significant performance improvement.

Why JavaScript? Just because it's a high-level language which provides wide infrastructure with a good package manager, lots of packages and good community. It's quite fast and easy to make a simple working example.

## Installation

### [npm](https://www.npmjs.com)

```
npm install -g robbyrussell
```

Done. This command should source the corresponding adapter for your shell. Just reload your terminal.

### Binaries

If you don't have Node.js installed on your machine, you can download pre-built binaries with built-in Node.js version.

[**⬇️ Download binary ⬇️**](https://github.com/denysdovhan/robbyrussell/releases)

Use them in your shell configuration with [adapters](https://github.com/denysdovhan/robbyrussell/tree/master/adapters).

**bash:**

```bash
# BASH-specific adapter
robbyrussell_bash_adapter() {
  robbyrussell_previous_exit_code="$?"
  /path/to/robbyrussell $robbyrussell_previous_exit_code 'bash'
}

# set prompt
PS1='$(robbyrussell_bash_adapter)'
```

**zsh:**

```zsh
# ZSH-specific adapter
robbyrussell_zsh_adapter() {
  robbyrussell_previous_exit_code="$?"
  /path/to/robbyrussell $robbyrussell_previous_exit_code 'zsh'
}

# set prompt
PROMPT='$(robbyrussell_zsh_adapter)'
```

**fish:**

```fish
# FISH-specific adapter
function robbyrussell_fish_adapter -d "a robbyrussell theme adapter for fish"
  set robbyrussell_previous_exit_code "$status"
  /path/to/robbyrussell $robbyrussell_previous_exit_code 'fish'
end

# set prompt
function fish_prompt
  # fish splits command substitutions on newlines
  # need to temporarily reset IFS to empty
  #   @see: http://stackoverflow.com/a/34186172/5508862
  set -l IFS
  robbyrussell_fish_adapter
end

```

## Configuration

Exposing the pormpt settings as environment variables is a known problem. This prompt reads a special configuration file from your home directory, which allows you to define more complex configs. A prompt automatically looks for `~/.prompt-config.js` or `~/.prompt-config.json` files. These files should export configuration object.

> **Important:** A prompt needs to escape colors codes, otherwise it would behave incorrectly. This prompt includes patched [`chalk`](https://github.com/chalk/chalk) package with escape codes for current `process.env.SHELL`.

Default config looks like this:

```js
// Patched for current shell chalk/chalk colors
const styles = require('robbyrussell/utils/colors');

module.exports = {
  /**
   * Check git status asynchronously
   */
  async: false,
  /**
   * Prompt prefix and suffix
   */
  prompt: {
    open: styles.bold.open,
    close: styles.bold.close + styles.reset.close
  },
  /**
   * Status code
   */
  status: {
    char: '➜',
    success: styles.green.open,
    failure: styles.red.open,
  },
  /**
   * Directory style
   */
  dir: {
    color: styles.cyan.open
  },
  /**
   * Git status styles
   */
  git: {
    indicator: styles.blue.open,
    branch: styles.red.open,
    dirty: styles.yellow.open,
    dirtyChar: '✗'
  }
};
```

## License

MIT © [Denys Dovhan](https://denysdovhan.com)

<!-- Badges -->

[npm-url]: https://npmjs.org/package/robbyrussell
[npm-image]: https://img.shields.io/npm/v/robbyrussell.svg?style=flat-square

[node-url]: https://nodejs.org/en/download/
[node-image]: https://img.shields.io/node/v/robbyrussell.svg?style=flat-square

[depstat-url]: https://david-dm.org/denysdovhan/robbyrussell
[depstat-image]: https://david-dm.org/denysdovhan/robbyrussell.svg?style=flat-square

[buildstat-url]: https://travis-ci.org/denysdovhan/robbyrussell
[buildstat-image]: https://img.shields.io/travis/denysdovhan/robbyrussell.svg?style=flat-square

[donate-url]: https://www.liqpay.com/en/checkout/380951100392
[donate-image]: https://img.shields.io/badge/support-donate-yellow.svg?style=flat-square

<!-- References -->

[robbyrussell]: https://github.com/robbyrussell/oh-my-zsh/wiki/Themes#robbyrussell
[robbyrussell-img]: https://cloud.githubusercontent.com/assets/3459374/26444261/5cc584ea-4144-11e7-8951-2648bc993980.png
[spaceship-zsh-theme]: https://github.com/denysdovhan/spaceship-zsh-theme
