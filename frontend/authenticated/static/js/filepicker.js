    var client = filestack.init('AJ5agFb1BQxy24vHeY7Blz');
    function showPicker() {
        client.pick({
        }).then(function(result) {
            console.log(JSON.stringify(result.filesUploaded))
        });
    }