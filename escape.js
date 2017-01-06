/**
 * Escape non-printable characters
 * Otherwise readline cannot keep track of the cursor position correctly
 * 
 * Related issues:
 *  @link: http://stackoverflow.com/a/19501528/5508862
 *  @link: http://stackoverflow.com/a/30581694/5508862
 *
 * @param  {String} shell    [description]
 * @param  {String} ansiCode [description]
 * @return {String}          [description]
 */
function escapeNonPrintable(shell, ansiCode) {
  switch (shell) {
    case 'sh'  :
    case 'bash': return '\001' + ansiCode + '\002';
    case 'zsh' : return   '%{' + ansiCode + '%}'  ;
    case 'fish': return          ansiCode         ;
    default    : return          ansiCode         ;
  }
}

module.exports = escapeNonPrintable;
