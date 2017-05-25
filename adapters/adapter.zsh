# ZSH-specific adapter
robbyrussell_zsh_atapter() {
  robbyrussell_previous_exit_code="$?"
  robbyrussell $robbyrussell_previous_exit_code 'zsh'
}

# set prompt
PROMPT='$(robbyrussell_zsh_atapter)'
