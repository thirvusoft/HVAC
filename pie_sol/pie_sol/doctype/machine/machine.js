// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt

frappe.ui.form.on("Machine", {


	refresh(frm) {
        frm.set_query("brand_name", function () {
          return {
            filters: {
      				is_group:1,
              parent_item_group:'All Item Groups',
            },
          };
        });


        frm.set_query("mc_type", function () {
          return {
            filters: {
      				is_group:1,
              parent_item_group:frm.doc.brand_name,
            },
          };
        });




        frm.set_query("item.model_name", function () {
          return {
            filters: {
      				is_group:1,
            },
          };
        });


        if(frm.is_new()) {
          var child=frm.add_child('item')
          

          


          
          for(var i = 0; i < 9; i++) {
              if (i==0){

                child.model_type='Indoor Serial No'
              }
              if (i==1){

                child.model_type = 'Outdoor Serial No';
              }

              var child=frm.add_child('item')
              child.model_type='Indoor Serial No';
          }
          frm.refresh_field('item');
        }
      },


  mc_type:function(frm) {
    frm.set_query("model_name", function () {
      return {
        filters: {
            parent_item_group:frm.doc.mc_type,
            is_group:0,

        },
      };
    });
  


  },




  


  indoor_serial_no: function(frm) {
    frm.events.indoor_update(frm);
  },



      indoor_update: function(frm) {
        if (frm.doc.item && frm.doc.item.length > 0) {
              frm.doc.item[0].serial_no = frm.doc.indoor_serial_no;
              frm.refresh_field('item');
          }
      },


    indoor_model: function(frm) {
      frm.events.indoor_model_update(frm);
    },



    indoor_model_update: function(frm) {
    if (frm.doc.item && frm.doc.item.length > 0) {
          frm.doc.item[0].model_name = frm.doc.indoor_model;
          frm.refresh_field('item');
      }
    },






    outdoor_serial_no: function(frm) {
      frm.events.outdoor_update(frm);
    },
    outdoor_update: function(frm) {
      if (frm.doc.item && frm.doc.item.length > 0) {
          frm.doc.item[1].serial_no = frm.doc.outdoor_serial_no;
          frm.refresh_field('item'); 
      }
    },



    outdoor_model: function(frm) {
      frm.events.outdoor_model_update(frm);
    },



    outdoor_model_update: function(frm) {
    if (frm.doc.item && frm.doc.item.length > 0) {
          frm.doc.item[1].model_name = frm.doc.outdoor_model;
          frm.refresh_field('item');
      }
    },


    tonnes: function(frm) {
      frm.events.tonnes_update(frm);
    },

    tonnes_update: function(frm) {
      if (frm.doc.item && frm.doc.item.length > 0) {
          frm.doc.item[0].tonnes = frm.doc.tonnes;
          frm.doc.item[1].tonnes = frm.doc.tonnes;
          frm.refresh_field('item');
      }
    },





  model_name: function(frm) {
    frm.set_query("outdoor_model", function () {
        return {
            filters: {

                item_group: frm.doc.brand_name,
                custom_mc_type:frm.doc.mc_type,
                custom_model: frm.doc.model_name,
            },
        };
    });

    frm.set_query("indoor_model", function () {
        return {
            filters: {
                item_group: frm.doc.brand_name,
                custom_mc_type:frm.doc.mc_type,
                custom_model: frm.doc.model_name,
            },
        };
    });
  },
  
  custom_add_warranty:function(frm){
    let d = new frappe.ui.Dialog({
        title: 'Enter Machine Warranty details',
        fields: [
            {
                label: 'Service Count',
                fieldname: 'warranty_service_count',
                fieldtype: 'Data',
                options: '', 
                reqd: true,
            },
            {
                label: 'Period in Month',
                fieldname: 'warranty_period_in_month',
                fieldtype: 'Data',
                options: '',
                reqd: true, 
                
            },
            {
                label: 'Start Date',
                fieldname: 'warranty_start_date',
                fieldtype: 'Date',
                options: '',
                reqd: true, 
            },
            {
                label: 'Contract Date',
                fieldname: 'warranty_contract_date',
                fieldtype: 'Date',
                options:'',
                reqd: true
            },
            {
                label: 'Serviced By',
                fieldname: 'warranty_serviced_by',
                fieldtype: 'Select',
                options: ['OZONE VAC','ACCSYS'],
                reqd: true, 
                
            },
            {
                label: 'Enrolment',
                fieldname: 'Warranty_enrolment',
                fieldtype: 'Select',
                options: ['DIRECT','DEALER'],
                reqd: true, 
                
            },
        ],
        size: 'small', // small, large, extra-large 
        primary_action_label: 'Submit',
        primary_action(values) {


            

        // Create a new Machine document
                frappe.call({
                    method: 'pie_sol.pie_sol.utils.py.warranty.create_warranty',
                    args: {
                
                    customer_name:frm.doc.customer_name,
                    machine_name:frm.doc.name,
                    warranty_period_in_month:values.warranty_period_in_month,
                    warranty_service_count:values.warranty_service_count,
                    warranty_start_date:values.warranty_start_date,
                    warranty_contract_date:values.warranty_contract_date,
                    warranty_serviced_by:values.warranty_serviced_by,
                    Warranty_enrolment:values.Warranty_enrolment
                    },
                callback: function(response) {
                    frm.refresh_fields('table_rvqo')
                
               
            }
        }); 
   
            d.hide();
        }
    });
    
    d.show();
    
}
});


















































frappe.ui.form.on("Item table", {


refresh(frm) {
  frm.set_query("model_name", function () {
      return {
          filters: {
              is_group: 1,
          },
      };
  });
},

	


  serial_no: function(frm, cdt, cdn) {
    // Triggered when serial_no field changes in the Item doctype (child table)
    var child_doc = locals[cdt][cdn];
    
    // Get the parent document (Machine)
    var machine_doc = frm.doc;
    if (child_doc.idx === 1){
    // Update the indoor_serial_no field in the Machine document

    machine_doc.indoor_serial_no = child_doc.serial_no;
    }
    if (child_doc.idx === 2){
      // Update the indoor_serial_no field in the Machine document
      machine_doc.outdoor_serial_no = child_doc.serial_no;
      }
    // Refresh the indoor_serial_no field in the Machine document
    frm.refresh_field('indoor_serial_no');
    frm.refresh_field('outdoor_serial_no');
  },
        


  // model_name: function(frm, cdt, cdn) {
  //   //Triggered when serial_no field changes in the Item doctype (child table)
  //   var child_doc = locals[cdt][cdn];
    
  //   //Get the parent document (Machine)
  //   var machine_doc = frm.doc;
  //   if (child_doc.idx === 1){
  //   //Update the indoor_serial_no field in the Machine document

  //   machine_doc.indoor_model = child_doc.model_name;
  //   }
  //   if (child_doc.idx === 2){
  //     //Update the indoor_serial_no field in the Machine document
  //     machine_doc.outdoor_model = child_doc.model_name;
  //     }
  //   //Refresh the indoor_serial_no field in the Machine document
  //   frm.refresh_field('indoor_model');
  //   frm.refresh_field('outdoor_model');
  // },
});