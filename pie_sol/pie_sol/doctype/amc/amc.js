// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt


frappe.ui.form.on("AMC", {
    refresh(frm) {
        cur_frm.fields_dict['table_ibgb'].$wrapper.find(".grid-add-row")[0].style.display="none";


        



        var button = frm.get_field('create_maintenance_visit').$wrapper.find('button');
        button.css('display', 'none');
        console.log("refresh")


        if (frm.doc.docstatus == 1 && frm.doc.custom_created==0 ) {

          var button = frm.get_field('create_maintenance_visit').$wrapper.find('button');
          button.css('display', 'block');
          console.log("after save")


      }

     





        frm.set_query("machine_field", function () {
            return {
              filters: {
                customer_name:frm.doc.customer_name
              },
            };
            
          }
        );
    },





    
    

    service_count: function(frm) {
      var n = frm.doc.service_count;
      var start_date = frm.doc.start_date;
      var period_in_month = frm.doc.period_in_month;
      var interval = Math.ceil(period_in_month / n);
      var default_period_in_month = frm.doc.period_in_month;
      var start_date_update = frappe.datetime.add_months(start_date, months=interval);
      var temp = "";
      
      frm.clear_table('table_ibgb');
  
      if (period_in_month % n == 0) {
          for (var i = 0; i < n; i++) {
              var child = frm.add_child('table_ibgb');
              child.planned_service_date = frappe.datetime.add_months(start_date, i * interval);
              temp = child.planned_service_date;
              console.log(temp)
          }
  
          frm.doc.end_date = temp;
  
          frm.refresh_field('table_ibgb');
          frm.refresh_field('end_date');
  
          period_in_month = default_period_in_month;
      }
      else {
        var start_date = frm.doc.start_date;
        var service_count = frm.doc.service_count;
        var period_in_month = frm.doc.period_in_month;
        var default_period_in_month = frm.doc.period_in_month;

        var month=frappe.datetime.add_months(start_date,period_in_month)

        var difference_in_days = frappe.datetime.get_day_diff(month, start_date);


        var days_interval = Math.floor(difference_in_days / service_count); // Use floor to exclude the start_date
        frm.clear_table('table_ibgb');
    
        for (var i = 1; i <= service_count; i++) { // Start from 1 to exclude start_date
          console.log(days_interval)
            var child = frm.add_child('table_ibgb');
            child.planned_service_date = frappe.datetime.add_days(start_date, i * days_interval);
            temp = child.planned_service_date;
        }
    
        frm.doc.end_date = temp;
        frm.refresh_field('table_ibgb');
        frm.refresh_field('end_date');

        period_in_month = default_period_in_month;
    }
  },
  
    // create_schedule:function(frm) {

    //   var n = frm.doc.service_count;
    //   var start_date = frm.doc.start_date;
    //   var period_in_month = frm.doc.period_in_month;
    //   var default_period_in_month = frm.doc.period_in_month;
    //   var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
    //   var temp = "";


    //   frm.clear_table('table_ibgb');

    //   for (var i = 0; i < n; i++) {
    //       var child = frm.add_child('table_ibgb');
    //       child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
    //       temp = child.planned_service_date;
    //   }

    //   frm.doc.end_date = temp;

    //   frm.refresh_field('table_ibgb');
    //   frm.refresh_field('end_date');

    //   period_in_month = default_period_in_month;
        

    // },

 
 

//     period_in_month:function(frm) {

//       var n = frm.doc.service_count;
//       var start_date = frm.doc.start_date;
//       var period_in_month = frm.doc.period_in_month;
//       var default_period_in_month = frm.doc.period_in_month;
//       var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
//       var temp = "";


//       frm.clear_table('table_ibgb');

//       for (var i = 0; i < n; i++) {
//           var child = frm.add_child('table_ibgb');
//           child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
//           temp = child.planned_service_date;
//       }

//       frm.doc.end_date = temp;

//       frm.refresh_field('table_ibgb');
//       frm.refresh_field('end_date');

//       period_in_month = default_period_in_month;
        

//     },

    start_date:function(frm) {

      var n = frm.doc.service_count;
      var start_date = frm.doc.start_date;
      var period_in_month = frm.doc.period_in_month;
      var interval = Math.ceil(period_in_month / n);
      var default_period_in_month = frm.doc.period_in_month;
      var start_date_update = frappe.datetime.add_months(start_date, months=interval);
      var temp = "";
      
      frm.clear_table('table_ibgb');
  
      if (period_in_month % n == 0) {
          for (var i = 0; i < n; i++) {
              var child = frm.add_child('table_ibgb');
              child.planned_service_date = frappe.datetime.add_months(start_date_update, i * interval);
              temp = child.planned_service_date;
              console.log(temp)
          }
  
          frm.doc.end_date = temp;
  
          frm.refresh_field('table_ibgb');
          frm.refresh_field('end_date');
  
          period_in_month = default_period_in_month;
      }
      else {
        var start_date = frm.doc.start_date;
        var end_date = frm.doc.end_date;
        var service_count = frm.doc.service_count;
        var difference_in_days = frappe.datetime.get_day_diff(end_date, start_date);
        var days_interval = Math.floor(difference_in_days / service_count); // Use floor to exclude the start_date
    
        frm.clear_table('table_ibgb');
    
        for (var i = 1; i <= service_count; i++) { // Start from 1 to exclude start_date
            var child = frm.add_child('table_ibgb');
            child.planned_service_date = frappe.datetime.add_days(start_date, i * days_interval);
        }
    
        frm.refresh_field('table_ibgb');
    }
        
  

},



create_maintenance_visit: function(frm) {
  var button = frm.get_field('create_maintenance_visit').$wrapper.find('button');
  if (frm.doc.docstatus == 1) {
    console.log("working")

      frappe.call({
          method: 'pie_sol.pie_sol.utils.py.maintenance_visit.amc_maintenance',
          args: {
              machine: frm.doc.machine_field,
              warranty_name: frm.doc.name,
              customer_name: frm.doc.customer_name,
              table_hsoa: frm.doc.table_ibgb,
          },
          callback: function(response) {
              frm.refresh_fields('table_ibgb');
        //       frm.set_value('custom_created', 1);

        // var button = frm.get_field('create_maintenance_visit').$wrapper.find('button');
        // button.css('display', 'none');
            
              // frm.save(function() {
                // Refresh the form after saving
                frm.refresh();
            // });


              // // Display the button after 5 seconds
              // // setTimeout(function() {      
              // button.css('display', 'block');
              // }, 5000);
              // frm.toggle(['create_maintenance_visit'])
          },
          // error: function(err) {
          //     console.error('Error:', err);
          //     frappe.msgprint('An error occurred while creating maintenance visits.');
          //     button.css('display', 'block'); // Ensure button is displayed in case of error
          // }
      });
  } else {
      console.log("Document not submitted.");
  }

},





// service_count:function(frm) {

//   var n = frm.doc.service_count;
//   var start_date = frm.doc.start_date;
//   var period_in_month = frm.doc.period_in_month;
//   var default_period_in_month = frm.doc.period_in_month;
//   var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
//   var temp = "";


//   frm.clear_table('table_ibgb');

//   for (var i = 0; i < n; i++) {
//       var child = frm.add_child('table_ibgb');
//       child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
//       temp = child.planned_service_date;
//   }

//   frm.doc.end_date = temp;

//   frm.refresh_field('table_ibgb');
//   frm.refresh_field('end_date');

//   period_in_month = default_period_in_month;
    


// },


    customer_name : function(frm){

    frm.fields_dict['machine'].grid.get_field('machine').get_query = function(doc, cdt, cdn) {
      return {
          filters: [
              ['Machine', 'customer_name', '=', frm.doc.customer_name],
              
          ]
      };
  };
    }
});
