// code to control user opt-in / opt-out for Google Analytics
let gaProperty = 'UA-58923240-3',  disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
    console.log('GA Disable Cookie detected. Opting out.');
}
else if (document.cookie.indexOf(disableStr + '=false') > -1) {
    window[disableStr] = true;
    console.log('Google Analytics Enabled. If you want to change your mind, you can either run gaOptout() in the console or delete the cookies for this domain.');
}
else {
    $('#cookie-toast').toast('show');
}
function gaOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
    $('#cookie-toast').toast('hide');
    return 'Succesfully opted you out of Google Analytics';
}
function gaOptin() {
    document.cookie = disableStr + '=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    $('#cookie-toast').toast('hide');
    return 'Succesfully opted you into Google Analytics';
}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', gaProperty);