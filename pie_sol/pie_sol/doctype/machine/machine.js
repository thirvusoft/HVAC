// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt

frappe.ui.form.on("Machine", {


	refresh(frm) {



    // cur_frm.fields_dict['table_rvqo'].$wrapper.find(".grid-add-row")[0].style.display="none";


    // cur_frm.fields_dict['table_rvqo'].$wrapper.find(".grid-add-row")[0].style.display="none";

        frm.set_query("brand_name", function () {
          return {
            filters: {
      				is_group:1,
              parent_item_group:'All Item Groups',
            },
          };
        });

        // if (cur_frm.fields_dict.table_toxv) {
        //   // Hide the "Add Multiple Rows" button
        //           cur_frm.fields_dict['table_toxv'].$wrapper.find(".grid-add-row").hide();
        //       };

        // if (cur_frm.fields_dict.table_rvqo) {
        //         // Hide the "Add Multiple Rows" button
        //           cur_frm.fields_dict['table_rvqo'].$wrapper.find(".grid-add-row").hide();
        //     };

        


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


      },


      onload:function(frm){
        console.log("######")
        if(frm.is_new()) {
          frm.refresh_field();
          var child=frm.add_child('item')
          console.log("*****")

          


          
          for(var i = 0; i < 9; i++) {
              if (i==0){

                child.model_type='Indoor Model'
              }

              var child=frm.add_child('item')
              child.model_type='Indoor Model';
          }
          frm.refresh_field('item');
        }
       
      },


  mc_type:function(frm) {
    console.log("mctype")
    frm.set_query("model_name", function () {
      return {
        filters: {
            parent_item_group:frm.doc.mc_type,
            is_group:0,

        },
      };
      });

       
            frm.set_value('model_name', '');
        



        frm.fields_dict['item'].grid.get_field('model_name').get_query = function(doc, cdt, cdn) {
          console.log("364")
          return {
              filters: [
                  ['Item','custom_model_type','=','Indoor Model'],
                  ['Item', 'item_group', '=', frm.doc.brand_name],
                  ['Item', 'custom_mc_type', '=', frm.doc.mc_type],
                  ['Item', 'custom_model', '=', frm.doc.model_name]
              ]
          };
      };
      


  },

  


  // indoor_serial_no: function(frm) {
  //   frm.events.indoor_update(frm);
  // },



  //     indoor_update: function(frm) {
  //       if (frm.doc.item && frm.doc.item.length > 0) {
  //             frm.doc.item[0].serial_no = frm.doc.indoor_serial_no;
  //             frm.refresh_field('item');
  //         }
  //     },


// indoor_model: function(frm) {
//   frm.events.indoor_model_update(frm);
//       frm.set_value('indoor_serial_no', '');
// },



//     indoor_model_update: function(frm) {
//     if (frm.doc.item && frm.doc.item.length > 0) {
//           frm.doc.item[0].model_name = frm.doc.indoor_model;
//           frm.refresh_field('item');
//       }
//     },






    // outdoor_serial_no: function(frm) {
    //   frm.events.outdoor_update(frm);
    // },
    // outdoor_update: function(frm) {
    //   if (frm.doc.item && frm.doc.item.length > 0) {
    //       frm.doc.item[1].serial_no = frm.doc.outdoor_serial_no;
    //       frm.refresh_field('item'); 
    //   }
    // },



// outdoor_model: function(frm) {
//   frm.events.outdoor_model_update(frm);
//     frm.set_value('outdoor_serial_no', '');
// },



//     outdoor_model_update: function(frm) {
//     if (frm.doc.item && frm.doc.item.length > 0) {
//           frm.doc.item[1].model_name = frm.doc.outdoor_model;
//           frm.refresh_field('item');
//       }
//     },




// tonnes: function(frm) {
//   frm.events.tonnes_update(frm);

// },

//     tonnes_update: function(frm) {
//       if (frm.doc.item && frm.doc.item.length > 0) {
//           frm.doc.item[0].tonnes = frm.doc.tonnes;
//           frm.doc.item[1].tonnes = frm.doc.tonnes;
//           frm.refresh_field('item');
//       }
//     },





  model_name: function(frm) {
    frm.set_query("outdoor_model", function () {
        return {
            filters: {
                custom_model_type:'Outdoor Model',
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



    frm.set_value('indoor_model', '');
    frm.set_value('outdoor_model', '');
    frm.set_value('indoor_serial_no', '');
    frm.set_value('outdoor_serial_no', '');

  },
  





  

  brand_name: function(frm) {
 
        frm.set_value('mc_type', '');
    
},





custom_add_warranty:function(frm){
  frappe.route_options = {"doctype": "Warranty",
  "customer_name": frm.doc.customer_name,
  "machine":frm.doc.name
  };
  frappe.new_doc("Warranty");
},




custom_add_amc: function(frm) {

frappe.route_options = {"doctype": "AMC",
"customer_name": frm.doc.customer_name,

"machine_field":frm.doc.name

};
frappe.new_doc("AMC");
},


});
















































frappe.ui.form.on("Item table", {


  // model_name:function(frm) {
  //   console.log("working")
  // frm.set_query("model_name", function () {
  //     return {
  //         filters: {
  //           // custom_model_type:'Indoor Model',
  //           item_group: frm.doc.brand_name,
  //           custom_mc_type:frm.doc.mc_type,
  //           custom_model: frm.doc.model_name,
  //         },
  //     };
  // });
  // console.log("not working")
// },

	


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
});