// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt


frappe.ui.form.on("Warranty", {
    refresh(frm) {
        cur_frm.fields_dict['table_hsoa'].$wrapper.find(".grid-add-row")[0].style.display="none";
        
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


    period_in_month:function(frm) {

          var n = frm.doc.service_count;
          var start_date = frm.doc.start_date;
          var period_in_month = frm.doc.period_in_month;
          var default_period_in_month = frm.doc.period_in_month;
          var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
          var temp = "";


          frm.clear_table('table_hsoa');

          for (var i = 0; i < n; i++) {
              var child = frm.add_child('table_hsoa');
              child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
              temp = child.planned_service_date;
          }

          frm.doc.end_date = temp;

          frm.refresh_field('table_hsoa');
          frm.refresh_field('end_date');

          period_in_month = default_period_in_month;
      },



      start_date:function(frm) {

      var n = frm.doc.service_count;
      var start_date = frm.doc.start_date;
      var period_in_month = frm.doc.period_in_month;
      var default_period_in_month = frm.doc.period_in_month;
      var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
      var temp = "";


      frm.clear_table('table_hsoa');

      for (var i = 0; i < n; i++) {
          var child = frm.add_child('table_hsoa');
          child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
          temp = child.planned_service_date;
      }

      frm.doc.end_date = temp;

      frm.refresh_field('table_hsoa');
      frm.refresh_field('end_date');

      period_in_month = default_period_in_month;
  },




  service_count:function(frm) {

    var n = frm.doc.service_count;
    var start_date = frm.doc.start_date;
    var period_in_month = frm.doc.period_in_month;
    var default_period_in_month = frm.doc.period_in_month;
    var start_date_update=frappe.datetime.add_months(start_date,months=period_in_month);
    var temp = "";


    frm.clear_table('table_hsoa');

    for (var i = 0; i < n; i++) {
        var child = frm.add_child('table_hsoa');
        child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
        temp = child.planned_service_date;
    }

    frm.doc.end_date = temp;

    frm.refresh_field('table_hsoa');
    frm.refresh_field('end_date');

    period_in_month = default_period_in_month;
}



  }



);
