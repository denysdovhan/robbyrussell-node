# Get root of theme
robbyrussell_root=$(cd $(dirname "$0") && pwd)

# ZSH-specific adapter
robbyrussell_zsh_atapter() {
  robbyrussell_previous_exit_code="$?"
  node $robbyrussell_root/index.js $robbyrussell_previous_exit_code 'zsh'
}

# set prompt
PROMPT='$(robbyrussell_zsh_atapter)'
