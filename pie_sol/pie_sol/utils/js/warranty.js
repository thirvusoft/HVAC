
// frappe.ui.form.on("Warranty", {
//     refresh(frm) {
//         cur_frm.fields_dict['table_hsoa'].$wrapper.find(".grid-add-row")[0].style.display="none";
        
//         frm.set_query("machine", function () {
//             return {
//               filters: {
//                 customer_name:frm.doc.customer_name
//               },
//             };
            
//           }
//         );
//     },

//     period_in_month:function(frm) {
//         console.log("1")
//         if(frm.is_new()) {
//             var n = frm.doc.service_count
//             start_date=frm.doc.start_date
//             period_in_month=frm.doc.period_in_month
//             service_count=frm.doc.service_count
//             start_date=frappe.datetime.add_months(start_date,months=period_in_month);
//             temp=""
//             for (var i = 0; i < n; i++) {

//                 var child = frm.add_child('table_hsoa');
//                 console.log("786")
//                 child.planned_service_date = frappe.datetime.add_months(start_date,months=i*period_in_month);
//                 temp=child.planned_service_date
//                 console.log(temp)
//             }
//             console.log(temp)
//             frm.doc.end_date=temp;
//             console.log(frm.doc.end_date)
//         frm.refresh_field('table_hsoa');
//         frm.refresh_field('end_date');
//         }
//     },




// });
