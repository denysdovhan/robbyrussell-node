# FISH-specific adapter
function robbyrussell_fish_atapter -d "a robbyrussell theme adapter for fish"
  set robbyrussell_previous_exit_code "$status"
  robbyrussell $robbyrussell_previous_exit_code 'fish'
end

# set prompt
function fish_prompt
  # fish splits command substitutions on newlines
  # need to temporarily reset IFS to empty
  #   @see: http://stackoverflow.com/a/34186172/5508862
  set -l IFS
  robbyrussell_fish_atapter
end
