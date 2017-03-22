window.onload= function() {
    window.cloudilly= new Cloudilly();
    cloudilly.initialize("SOEN341", "73ef8dcf-26c6-4b98-b130-3b5976b3128e", function() {
        cloudilly.connect();	
    });

    cloudilly.socketConnected(function(err, res) {
        if(err) { console.log("ERROR: Oops. Something wrong"); return; }
        console.log("@@@@@@ CONNECTED");
        console.log(res); 
    });

    cloudilly.socketDisconnected(function() {
        console.log("@@@@@@ CLOSED");
    });

    cloudilly.socketReceivedDevice(function(res) {
        console.log("@@@@@@ RECEIVED DEVICE");
        console.log(res);
    });

    cloudilly.socketReceivedPost(function(res) {
        console.log("@@@@@@ RECEIVED POST");
        console.log(res);
    });
};