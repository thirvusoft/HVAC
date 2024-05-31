// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt


frappe.ui.form.on("AMC", {
    refresh(frm) {
        cur_frm.fields_dict['table_ibgb'].$wrapper.find(".grid-add-row")[0].style.display="none";
        
        frm.set_query("machine", function () {
            return {
              filters: {
                customer_name:frm.doc.customer_name
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


      frm.clear_table('table_ibgb');

      for (var i = 0; i < n; i++) {
          var child = frm.add_child('table_ibgb');
          child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
          temp = child.planned_service_date;
      }

      frm.doc.end_date = temp;

      frm.refresh_field('table_ibgb');
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


      frm.clear_table('table_ibgb');

      for (var i = 0; i < n; i++) {
          var child = frm.add_child('table_ibgb');
          child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
          temp = child.planned_service_date;
      }

      frm.doc.end_date = temp;

      frm.refresh_field('table_ibgb');
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


  frm.clear_table('table_ibgb');

  for (var i = 0; i < n; i++) {
      var child = frm.add_child('table_ibgb');
      child.planned_service_date = frappe.datetime.add_months(start_date_update, i * period_in_month);
      temp = child.planned_service_date;
  }

  frm.doc.end_date = temp;

  frm.refresh_field('table_ibgb');
  frm.refresh_field('end_date');

  period_in_month = default_period_in_month;
    


},


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
