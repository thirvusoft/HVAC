frappe.ui.form.on("Maintenance Visit", {


    


    customer:function(frm) {
        frm.set_query("custom_machine_id", function () {
          return {
            filters: {
                customer_name:frm.doc.customer,
                
                
    
            },
          };
          });
    
        
                frm.set_value('custom_machine_id', '');
                
        }
                ,
    custom_machine_id: function(frm) {
        // console.log("executing")
        frappe.call({
            method: 'pie_sol.pie_sol.utils.py.maintenance_visit.mv',
            args: {
                machine: frm.doc.custom_machine_id,
            },
            callback: function(response) {
                var war_visit = response.message;
                // console.log(war_visit)
                if (war_visit) {
                    // Assuming 'purposes' is a child table field in 'Maintenance Visit'
                    frm.clear_table('purposes');
                    $.each(war_visit, function(i, row) {
                        frm.add_child('purposes', {
                            custom_model_type: row.custom_model_type,
                            custom_tonnes: row.custom_tonnes,
                            custom_model_name_2: row.custom_model_name_2,
                            custom_serial_number: row.custom_serial_number
                        });
                    });
                    frm.refresh_field('purposes');
                    // console.log("completed")
                }
            }
        });
    }
});
