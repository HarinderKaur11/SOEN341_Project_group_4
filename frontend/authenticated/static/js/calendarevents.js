$(document).ready(function () {
    $('#calendar').eCalendar({

 weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Events',
        url: '',
        events: [
            {title: 'Event 1', description: 'Description 1', datetime: new Date(2016, 7, 15, 17)},
            {title: 'Event 2', description: 'Description 2', datetime: new Date(2016, 7, 14, 16)},
            {title: 'Event 3', description: 'Description 3', datetime: new Date(2016, 7, 10, 16)},
            {title: 'Event 1', description: 'Description 1', datetime: new Date(2017, 2, 7, 16)},
            {title: 'Event 2', description: 'Description 2', datetime: new Date(2017, 2, 8, 14)},
            {title: 'Event 3', description: 'Description 3', datetime: new Date(2017, 2, 8, 16)},
            {title: 'Event 4', description: 'Description 4', datetime: new Date(2017, 2, 9, 16)}     ]});
});
