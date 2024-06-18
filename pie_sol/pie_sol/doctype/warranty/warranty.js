// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt


frappe.ui.form.on("Warranty", {
    refresh(frm) {
        cur_frm.fields_dict['table_hsoa'].$wrapper.find(".grid-add-row")[0].style.display="none";
        

        var button = frm.get_field('create_maintainenance').$wrapper.find('button');
        button.css('display', 'none');


        if (frm.doc.docstatus == 1 && frm.doc.custom_maintenance_visit_created==0 ) {

          var button = frm.get_field('create_maintainenance').$wrapper.find('button');
          button.css('display', 'block');

          
          

      }


        frm.set_query("machine", function () {
            return {
              filters: {
                customer_name:frm.doc.customer_name,
                has_warranty : 0
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
      
  
      frm.clear_table('table_hsoa');
  

      if (period_in_month % n == 0) {
          for (var i = 0; i < n; i++) {
              var child = frm.add_child('table_hsoa');
              child.planned_service_date = frappe.datetime.add_months(start_date_update, i * interval);
              
              temp = child.planned_service_date;
          }
  
          frm.doc.end_date = temp;
  
          frm.refresh_field('table_hsoa');
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


        var days_interval = Math.floor(difference_in_days / service_count); 
        frm.clear_table('table_hsoa');
    
        for (var i = 1; i <= service_count; i++) { 
            var child = frm.add_child('table_hsoa');
            child.planned_service_date = frappe.datetime.add_days(start_date, i * days_interval);
            temp = child.planned_service_date;
        }
    
        frm.doc.end_date = temp;
        frm.refresh_field('table_hsoa');
        frm.refresh_field('end_date');

        period_in_month = default_period_in_month;


    }
    

},

  



//   create_maintainenance: function(frm) {
//   //   frappe.route_options = {"doctype": "Maintenance Visit",
//   //   "customer": frm.doc.customer_name,
//   //   "custom_machine_id":frm.doc.machine,
//   //   "custom_warrantyamc":frm.doc.name
//   //   };
//   //   frappe.new_doc("Maintenance Visit");
//   // },



//     var button = frm.get_field('create_maintainenance').$wrapper.find('button');
//     button.css('display', 'none');
//     if (frm.doc.docstatus == 1) {
//         frappe.call({
//             method: 'pie_sol.pie_sol.utils.py.maintenance_visit.warranty_maintenance',
//             args: {
//                 machine:frm.doc.machine, 
//                 warranty_name:frm.doc.name,
//                 customer_name: frm.doc.customer_name,
//                 table_hsoa: frm.doc.table_hsoa,
//             },
//             callback: function(response) {
//                 frm.refresh_fields('table_hsoa');
                
                

//               //   setTimeout(function() {
//               //     button.css('display', 'block');
//               // }, 5000);
//             }
//         });
//     } else {
//         console.log("not executed");
//     }
// }


// gpt



create_maintainenance: function(frm) {
  var button = frm.get_field('create_maintainenance').$wrapper.find('button');
  button.css('display', 'none');

  if (frm.doc.docstatus == 1) {
      frappe.call({
          method: 'pie_sol.pie_sol.utils.py.maintenance_visit.warranty_maintenance',
          args: {
              machine: frm.doc.machine,
              warranty_name: frm.doc.name,
              customer_name: frm.doc.customer_name,
              table_hsoa: frm.doc.table_hsoa,
          },
          callback: function(response) {
              frm.refresh_fields('table_hsoa');

              // console.log(frm.doc.custom_maintenance_visit_created)

              
              // console.log(frm.doc.custom_maintenance_visit_created)
              // // Save the form
             

              // // frm.set_value('custom_maintenance_visit_created', 1);
              // // frm.save()
              // // frm.refresh_fields('custom_maintenance_visit_created')

              // console.log(frm.doc.custom_maintenance_visit_created)



              // console.log("Saving the form");
              // frm.save(function(r) {
              //     console.log("Form saved successfully:", r);
              // }, function(err) {
              //     console.error("Error saving the form:", err);
              // });


              // console.log("not saved")
              // frm.save()
              // console.log("&&&&&&&&&&&&&&&")
                    
              // // Display the button after 5 seconds
              // setTimeout(function() {      
              //     button.css('display', 'block');
              // }, 5000);
          // },
          // error: function(err) {
          //     console.error('Error:', err);
          //     frappe.msgprint('An error occurred while creating maintenance visits.');
          //     button.css('display', 'block'); // Ensure button is displayed in case of error
          }
      });
  } else {
      console.log("Document not submitted.");
  }
}










//     period_in_month:function(frm) {

//           var n = frm.doc.service_count;
//           var start_date = frm.doc.start_date;
//           var period_in_month = frm.doc.period_in_month;
//           var default_period_in_month = frm.doc.period_in_month;
//           var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
//           var temp = "";


//           frm.clear_table('table_hsoa');

//           for (var i = 0; i < n; i++) {
//               var child = frm.add_child('table_hsoa');
//               child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
//               temp = child.planned_service_date;
//           }

//           frm.doc.end_date = temp;

//           frm.refresh_field('table_hsoa');
//           frm.refresh_field('end_date');

//           period_in_month = default_period_in_month;
//       },



//       start_date:function(frm) {

//       var n = frm.doc.service_count;
//       var start_date = frm.doc.start_date;
//       var period_in_month = frm.doc.period_in_month;
//       var default_period_in_month = frm.doc.period_in_month;
//       var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
//       var temp = "";


//       frm.clear_table('table_hsoa');

//       for (var i = 0; i < n; i++) {
//           var child = frm.add_child('table_hsoa');
//           child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
//           temp = child.planned_service_date;
//       }

//       frm.doc.end_date = temp;

//       frm.refresh_field('table_hsoa');
//       frm.refresh_field('end_date');

//       period_in_month = default_period_in_month;
//   },




//   service_count:function(frm) {

//     var n = frm.doc.service_count;
//     var start_date = frm.doc.start_date;
//     var period_in_month = frm.doc.period_in_month;
//     var default_period_in_month = frm.doc.period_in_month;
//     var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
//     var temp = "";


//     frm.clear_table('table_hsoa');

//     for (var i = 0; i < n; i++) {
//         var child = frm.add_child('table_hsoa');
//         child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
//         temp = child.planned_service_date;
//     }

//     frm.doc.end_date = temp;

//     frm.refresh_field('table_hsoa');
//     frm.refresh_field('end_date');

//     period_in_month = default_period_in_month;
// }



  }



);
