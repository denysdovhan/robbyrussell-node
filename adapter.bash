# Get root of theme
robbyrussell_root=$(cd $(dirname "$0") && pwd)

# BASH-specific adapter
robbyrussell_bash_atapter() {
  robbyrussell_previous_exit_code="$?"
  node $robbyrussell_root/index.js $robbyrussell_previous_exit_code 'bash'
}

# set prompt
PS1='$(robbyrussell_bash_atapter)'
