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

        if (!frm.doc.mc_type) {
            frm.set_value('model_name', '');
        }
        frm.fields_dict['item'].grid.get_field('model_name').get_query = function(doc, cdt, cdn) {
          return {
              filters: [
                  ['Item', 'item_group', '=', frm.doc.brand_name],
                  ['Item', 'custom_mc_type', '=', frm.doc.mc_type],
                  ['Item', 'custom_model', '=', frm.doc.model_name]
              ]
          };
      };
      


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
  if (!frm.doc.indoor_model) {
      frm.set_value('indoor_serial_no', '');
  }
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
  if (!frm.doc.outdoor_model) {
    frm.set_value('outdoor_serial_no', '');
}
},



outdoor_model_update: function(frm) {
 if (frm.doc.item && frm.doc.item.length > 0) {
      frm.doc.item[1].model_name = frm.doc.outdoor_model;
      frm.refresh_field('item');
  }
},


tonnes: function(frm) {if (!frm.doc.model_name) {
  frm.set_value('indoor_model', '');
  frm.events.tonnes_update(frm);
}
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
    if (!frm.doc.model_name) {
      frm.set_value('indoor_model', '');
      frm.set_value('outdoor_model', '');
      frm.set_value('indoor_serial_no', '');
      frm.set_value('outdoor_serial_no', '');
  }
  

  },
  brand_name: function(frm) {
    if (!frm.doc.brand_name) {
        frm.set_value('mc_type', '');
    }
},




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
    var child_doc = locals[cdt][cdn];

    var machine_doc = frm.doc;
    if (child_doc.idx === 1){

    machine_doc.indoor_serial_no = child_doc.serial_no;
    }
    if (child_doc.idx === 2){
      machine_doc.outdoor_serial_no = child_doc.serial_no;
      }
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
  
})

