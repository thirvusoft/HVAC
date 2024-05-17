// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt

frappe.ui.form.on("Machine", {
	refresh(frm) {
        frm.set_query("brand_name", function () {
          return {
            filters: {
      				is_group:1,
            },
          };
        });
        frm.set_query("model_name", function () {
          return {
            filters: {
      				is_group:0,
            },
          };
        });
        if(frm.is_new()) {
          var child=frm.add_child('item')
          child.model_type='Indoor Serial No'
          for(var i = 0; i < 9; i++) {
              var child=frm.add_child('item')
              child.model_type = 'Outdoor Serial No';
          }
          frm.refresh_field('item');
        }
      
  
      
    
	},


  brand_name:function(frm) {
    frm.set_query("model_name", function () {
      return {
        filters: {
            parent_item_group:frm.doc.brand_name,
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

outdoor_serial_no: function(frm) {
  frm.events.outdoor_update(frm);
},
outdoor_update: function(frm) {
  if (frm.doc.item && frm.doc.item.length > 0) {
      frm.doc.item[1].serial_no = frm.doc.outdoor_serial_no;
      frm.refresh_field('item'); 
  }
},



  model_name: function(frm) {
    frm.set_query("outdoor_model", function () {
        return {
            filters: {
                item_group: frm.doc.brand_name,
                custom_model: frm.doc.model_name,
            },
        };
    });

    frm.set_query("indoor_model", function () {
        return {
            filters: {
                item_group: frm.doc.brand_name,
                custom_model: frm.doc.model_name,
            },
        };
    });
  }
});

frappe.ui.form.on("Item table", {
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

}

})

