/**
 * Copy the given text to the client clipboard
 * https://komsciguy.com/js/a-better-way-to-copy-text-to-clipboard-in-javascript/
 * @param {string} text - the text to copy
 */
function copyToClipboard(text) {
    const listener = function(ev) {
        ev.preventDefault();
        ev.clipboardData.setData('text/plain', text);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
}
