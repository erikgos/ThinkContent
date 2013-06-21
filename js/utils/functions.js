function isPhonegap() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)
}

function notify(message, type, options) {
    if(type === undefined) type = "info";
    if(options === undefined) options = {};

    // alert(message);
    // $.notify.error("Please connect to the Internet in order to send you results!", { autoClose: 2000 });
    if(isPhonegap())
        navigator.notification.alert(message);
    else
        alert(message);
}

function confirmRequest(message, confirmCallback) {
    var onConfirm = function (button) {
        if (button === 1) {
            confirmCallback();
        }
    };
    
    if (isPhonegap())
        navigator.notification.confirm(
       message,  // message
       onConfirm,              // callback to invoke with index of button pressed
       'Think Content',            // title
       'Ok,Cancel'          // buttonLabels
   );
    else
    {
        var r = window.confirm(message);
        if (r == true) {
            confirmCallback();
        }
    }
}

