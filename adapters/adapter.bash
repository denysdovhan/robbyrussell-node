# BASH-specific adapter
robbyrussell_bash_atapter() {
  robbyrussell_previous_exit_code="$?"
  robbyrussell $robbyrussell_previous_exit_code 'bash'
}

# set prompt
PS1='$(robbyrussell_bash_atapter)'
