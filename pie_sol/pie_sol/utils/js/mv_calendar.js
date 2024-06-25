frappe.provide('frappe.ui');

frappe.ui.CalendarView = Class.extend({
    init: function() {
        var me = this;

        // Ensure DOM is ready before accessing elements
        $(function() {
            me.$calendar = $('.main-section'); // Adjust selector as per your calendar component
            me.setupEventListeners();
        });
    },

    setupEventListeners: function() {
        var me = this;

        // me.$calendar.on('mouseenter', '.fc-day-number', function(event) {
        //     var $event1 = $(this).closest('.fc-day-number');
        //     var date = $event1.text();
        //     // console.log($event);
        //     console.log($event1);
        //     console.log(date);
            

        // Example: Hover event on calendar elements
        me.$calendar.on('mouseenter', '.fc-title', function(event) {
            var $event = $(this).closest('.fc-content');
            var data = $event.text();
            // var $event1 = $(this).closest('.fc-day-top fc-sun fc-other-month fc-past');
            // var date = $event1.attr('data-date');
            // console.log($event);
            // console.log($event1);
            // console.log(date);
            


            // var $event1 = $(this).closest('.fc-day-number');
            // var date = $event1.text()
            // console.log($event)
            // console.log(date)
            // Calculate position for the cyan box
            var posX = event.pageX;
            var posY = event.pageY + 20; // Adjust vertical offset as needed
            
            // Show the cyan box with data
            me.show_message(data, posX, posY);
        }).on('mouseleave', '.fc-title', function() {
            me.hide_message();
        });
    },
    show_message: function(data, posX, posY) {
        // Create the cyan box dynamically
        var cyanBox = $('<div class="cyan-box">');
        cyanBox.css({
            'background-color': '#D7B38C',
            'width': '200px',
            'height': '250px',
            'position': 'absolute', // Use fixed position for a fixed location on screen
            'left': posX + 'px',
            'top': posY + 'px',
            'padding': '10px',
            'box-sizing': 'border-box',
            'border-radius': '10px',
            'border': '2px solid #ccc',
            'z-index': '1000' // Ensure it's on top of other content
        });
    
        // Make an AJAX call to fetch additional data
        frappe.call({
            method: 'pie_sol.pie_sol.utils.py.mvcalendar.mvcalendarget',
            args: {
                custom_warrantyamc: data
            },
            callback: function(response) {
                var documents = response.message; // Array of documents fetched
                var name = documents.name;
                var machineid = documents.custom_machine_id;
                var planneddate = documents.mntc_date;
                var replanneddate = documents.custom_replanned_service_date;
                var customer = documents.customer;
                var mobile=documents.contact_mobile
    
                // Create content for the cyan box
                var content = $('<div>').html(`
                    <p style="font-size:12px"><strong>Name:</strong> ${name}</p>
                    <p style="font-size:12px"><strong>Machine ID:</strong> ${machineid}</p>
                    <p style="font-size:12px"><strong>Planned Date:</strong> ${planneddate}</p>
                    <p style="font-size:12px"><strong>Replanned Date:</strong> ${replanneddate}</p>
                    <p style="font-size:12px"><strong>Customer:</strong> ${customer}</p>
                    <p style="font-size:12px"><strong>Mobile Number:</strong> ${mobile}</p>
                `);
                cyanBox.append(content);
            }
        });
    
        // Append the cyan box to the body or another appropriate container
        $('body').append(cyanBox);
    },
    

    hide_message: function() {
        $('.cyan-box').remove(); // Remove any existing cyan boxes
    }
});

// Initialize CalendarView instance
$(function() {
    var calendarView = new frappe.ui.CalendarView();
});
