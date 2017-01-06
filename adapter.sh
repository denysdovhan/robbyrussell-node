# Get root of theme
robbyrussell_root=$(cd $(dirname "$0") && pwd)

# SH-specific adapter
robbyrussell_sh_atapter() {
  robbyrussell_previous_exit_code="$?"
  node $robbyrussell_root/index.js $robbyrussell_previous_exit_code 'sh'
}

# set prompt
PS1='$(robbyrussell_sh_atapter)'
