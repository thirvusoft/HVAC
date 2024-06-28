frappe.ui.form.on("Item", {
	refresh(frm) {
        frm.set_query("item_group", function () {
          return {
            filters: {
				      is_group:1,
              parent_item_group:'All Item Groups',

            },
          };
          
        }
      );
    },

    item_group:function(frm){

      frm.set_query("custom_mc_type", function () {
        return {
          filters: {
            is_group:1,
            parent_item_group:frm.doc.item_group,
          },
        };
        
      }
    );
    frm.set_value('custom_mc_type', '');
    frm.set_value('custom_model', '');



    
  
      

    
	},
  custom_mc_type:function(frm) {
        frm.set_query("custom_model", function () {
          return {
            filters: {
              parent_item_group:frm.doc.custom_mc_type,
				      is_group:0,

            },
          };
        });

        frm.set_value('custom_model', '');
 
	},

});



