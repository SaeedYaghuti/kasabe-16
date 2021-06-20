//#region  Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormText = $messageForm.querySelector('#message-form_text');
const $messageFormTo = $messageForm.querySelector('#message-form_to');
const $messageFormButton = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');
//#endregion

//#region  Buttons
const $statusButton = document.querySelector('#sendStatus');
const $initButton = document.querySelector('#initiateDB');
const $ServerButton = document.querySelector('#sendToServer');
const $OneButton = document.querySelector('#sendToOne');
const $GroupButton = document.querySelector('#sendToGroup');
const $locationButton = document.querySelector('#send-location');
//#endregion

//#region  Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
//#endregion

//#region Local Storage
// save to local storage
$messageFormText.addEventListener('input', e => {
    localStorage.setItem('messageText', e.target.value);
});
$messageFormTo.addEventListener('input', e => {
    localStorage.setItem('messageTo', e.target.value);
});

// get from local storage
$messageFormText.value = localStorage.getItem('messageText');
$messageFormTo.value = localStorage.getItem('messageTo');


// console.log('local storage Text: ', localStorage.getItem('messageText'));
// console.log('local storage To: ', localStorage.getItem('messageTo'));

//#endregion

//#region  Options
const { username, token, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
//#endregion

//#region  Auto Scroll
const autoscroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild;

    // height of new message
    const newMessageStyle = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyle.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // visible height
    const visibleHeight = $messages.offsetHeight;
    
    // height message container
    const containerHeight = $messages.scrollHeight;

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if( containerHeight - newMessageHeight <= scrollOffset ) {
        $messages.scrollTop = $messages.scrollHeight;
    }

    // console.log(scrollOffset);
}
//#endregion

//#region  General
window.socket = io('http://localhost:3000', {
    query: {
        token: token,
    },
});

// show sidebar info
const html = Mustache.render( sidebarTemplate,
    {
        username,
        token,
        room,
    }
);
$sidebar.innerHTML = html;
//#endregion

//#region socket.on() Depricated
socket.on('connect', function() {
    // socket.emit('online', { test: 'I am online' });
    // socket.emit('msgToServer', { test: 'message to server' });
    // socket.emit('identity', 0, response =>
    //     console.log('Identity:', response),
    // );
});

socket.on('users', function(data) {
    console.log('users', data);
});

socket.on('chat', function(data) {
    console.log('chat', data);
});

socket.on('exception', function(data) {
    console.log('exception', data);
});

socket.on('disconnect', function() {
    console.log('Disconnected');
});

socket.on('events', (response) => {
    console.log(response);
});
//#endregion

//#region   Server Button
$ServerButton.addEventListener('click', () => {
    console.log('clicked on server');

    // disable
    $ServerButton.setAttribute('disabled', 'disabled')
    const message = $messageFormText.value;
    const toUserId = $messageFormTo.value;
    // $messageFormText.value = '';
    $messageFormText.focus();

    // data = {
    //     text: message,
    //     toUserId: toUserId
    // }

    data = {
        reciver_client_id: parseInt(toUserId),
        // reciver_room_id: 1,
        text: message,
        extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
    }
    
    socket.emit('chatToServer', data, (result, error) => {
        console.log('\"chatToServer\" callback executed!')
        // enable
        if ( error ) {
            console.log('Server:  DB result: ' + JSON.stringify(error));
        }
        console.log('Server:  DB result: ' + JSON.stringify(result));
        $ServerButton.removeAttribute('disabled');
    })
})
//#endregion

//#region Is Typing...
//setup before functions
let lastTyped = new Date().getTime() - 2000;


//on keyup, start the countdown
$messageFormText.addEventListener('keyup', () => {
    // return null;

    if ($messageFormText.value && new Date().getTime() > lastTyped + 2000) {
        emitIsTyping ();
        lastTyped = new Date().getTime();
    }
});

function emitIsTyping () {
    /*
        ISONLINE,
        ISTYPING,
        ISRECAUDIO,
        ISRECVIDEO
    */

    const emitClientStatusDto = {
        status: 'ISTYPING',
        emitted_at: new Date().getTime(),
    }

    socket.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
        if ( error ) {
            console.log('Server error> ', error);
        } else {
            console.log('Server result> ', result)
        }
        $statusButton.removeAttribute('disabled')
    })
}
// #endregion

//#region Is Online...
var onlineInterval;

window.onfocus = function() {
    // console.log('window is focused');
    // emitIsOnline ();
    // onlineInterval = setInterval( emitIsOnline , 5000);
};

window.onblur = function() {
    // console.log('window is blured');
    clearInterval(onlineInterval);
};

// emitClientStatus ();
// onlineInterval = setInterval( emitClientStatus , 5000);

 


function emitClientStatus () {
    /*
        ISONLINE,
        ISTYPING,
        ISRECAUDIO,
        ISRECVIDEO
    */
    const emitClientStatusDto = {
        status: 'ISONLINE',
        emitted_at: new Date().getTime(),
    }

    console.log('emitClientStatus is emitted!');
    //do something
    socket.emit('emitClientStatus', emitClientStatusDto , (error) => {
        // enable
        if ( error ) {
            console.log('emitClientStatus: An Error Occoured! ', error);
        } else {
            console.log('emitClientStatus: Messaged Delevered!');
        }
    })
}

// #endregion

//#region Button Status
$statusButton.addEventListener('click', () => {
    console.log('clicked on Status');

    // disable
    $statusButton.setAttribute('disabled', 'disabled')
    const message = $messageFormText.value;
    const toUserId = parseInt($messageFormTo.value);
    // $messageFormText.value = '';
    $messageFormText.focus();

    /*
        ISONLINE,
        ISTYPING,
        ISRECAUDIO,
        ISRECVIDEO
    */

    const emitClientStatusDto = {
        status: 'ISONLINE',
        emitted_at: new Date().getTime(),
    }
    
    socket.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
        if ( error ) {
            console.log('Server error> ', error);
        } else {
            console.log('Server result> ', result)
        }
        $statusButton.removeAttribute('disabled')
    })
})
//#endregion

//#region Button init
$initButton.addEventListener('click', () => {
    console.log('clicked on Init');

    // disable
    $initButton.setAttribute('disabled', 'disabled')
    const message = $messageFormText.value;
    const toUserId = parseInt($messageFormTo.value);
    // $messageFormText.value = '';
    $messageFormText.focus();

    // watching userID = 2
    const watchClientStatusDto = {
        followed_client_ids: [2, 3],
        emitted_at: new Date().getTime(),// milisecond
    }
    
    socket.emit('watchClientStatus', watchClientStatusDto, (result, error) => {
        if ( error ) {
            console.log('Server error> ', error);
        } else {
            console.log('Server result> ', result)
        }
        $initButton.removeAttribute('disabled')
    });

    // socket.emit('initDB', null, (result, error) => {
    //     if ( error ) {
    //         console.log('Server error> ', error);
    //     } else {
    //         console.log('Server result> ', result)
    //     }
    //     $initButton.removeAttribute('disabled')
    // })
})
//#endregion

//#region Button One
$OneButton.addEventListener('click', () => {
    console.log('clicked on ONE');

    // disable
    $OneButton.setAttribute('disabled', 'disabled')
    const message = $messageFormText.value;
    const toUserId = parseInt($messageFormTo.value);
    // $messageFormText.value = '';
    $messageFormText.focus();

    data = {
        reciver_client_id: toUserId,
        // reciver_room_id: 1,
        text: message,
        extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
    }
    
    socket.emit('chatToOne', data, (result, error) => {
        // enable
        if ( error ) {
            console.log('Server error> ', error);
        } else {
            console.log('Server result> ', result)
        }
        $OneButton.removeAttribute('disabled')
    })
})
//#endregion

//#region Button Group
$GroupButton.addEventListener('click', () => {
    console.log('clicked on group');

    // disable
    $GroupButton.setAttribute('disabled', 'disabled')
    const message = $messageFormText.value;
    const toGroupId = parseInt($messageFormTo.value);
    // $messageFormText.value = '';
    $messageFormText.focus();

    data = {
        // reciver_client_id: toUserId,
        reciver_room_id: toGroupId,
        text: message,
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
    }
    
    socket.emit('chatToGroup', data, (result, error) => {
        if ( error ) {
            console.log('Server error> ', error);
        } else {
            console.log('Server result> ', result)
        }
        $GroupButton.removeAttribute('disabled')
    })
})
//#endregion


socket.on('msgToClient', (msg) => {
    console.log('msgToClient '+ JSON.stringify(msg));
    const html = Mustache.render( 
        messageTemplate,
        {
            sender_userid: msg?.sender?.userid,
            sender_socketid: msg?.sender?.socketid,

            reciver_userid: msg?.reciver?.userid,
            reciver_socketid: msg?.reciver?.socketid,

            // message: msg?.message,
            message: JSON.stringify(msg, null, '\t'),
            createdAt: moment(msg?.createdAt).format("h:mm:ss  ms")
            // createdAt: moment(msg?.createdAt).format("h:mm:ss:ms a")
        }
    );
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
})

socket.on('chatToOne', (msg) => {
    console.log('chatToOne '+ JSON.stringify(msg));
    const html = Mustache.render( 
        messageTemplate,
        {
            sender_userid: msg.sender.userid,
            sender_socketid: msg.sender.socketid,

            reciver_userid: msg.reciver.userid,
            reciver_socketid: msg.reciver.socketid,

            message: msg.message,
            createdAt: moment(msg.createdAt).format("h:mm a")
        }
    );
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
})


// AA
socket.on('locationMessage', (url) => {
    console.log('AA '+ url);
    const html = Mustache.render( 
        locationMessageTemplate,
        {
            username: url.username,
            url: url.text
        }
    );
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
})


socket.on('roomData', ({ room, users }) => {
    console.log(room);
    console.log(users);
    const html = Mustache.render( sidebarTemplate,
        {
            username,
            token,
            room,
            users,
        }
    );
    $sidebar.innerHTML = html;
})



// E
$locationButton.addEventListener('click', () => {
    if ( !navigator.geolocation ) {
        return alert('Geolocation is not supported by your Browser!');
    }

    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('E Geolocation=> ', position);
            
            socket.emit(
                'sendLocation', 
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                // Acknoledgement
                () => {
                    console.log('Shared location');
                    $locationButton.removeAttribute('disabled');
                }
            )
        },
        error => {
        console.log('Error while found your location ',error) 
        })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});




