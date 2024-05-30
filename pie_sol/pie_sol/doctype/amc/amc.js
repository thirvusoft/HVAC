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

    service_count:function(frm){
      frm.set_df_property('service_count', 'read_only', 1);
    },

    start_date:function(frm){
      frm.set_df_property('start_date', 'read_only', 1);
    },

    period_in_month:function(frm) {

        if(frm.is_new()) {
            var n = frm.doc.service_count
            start_date=frm.doc.start_date
            period_in_month=frm.doc.period_in_month
            service_count=frm.doc.service_count
            start_date=frappe.datetime.add_months(start_date,months=period_in_month);
            temp=""
            for (var i = 0; i < n; i++) {

                var child = frm.add_child('table_ibgb');
                console.log("786")
                child.planned_service_date = frappe.datetime.add_months(start_date,months=i*period_in_month);
                temp=child.planned_service_date
                console.log(temp)
            }
            console.log(temp)
            frm.doc.end_date=temp;
            console.log(frm.doc.end_date)
        frm.refresh_field('table_ibgb');
        frm.refresh_field('end_date');
        }

      frm.set_df_property('period_in_month', 'read_only', 1);
    },




});
