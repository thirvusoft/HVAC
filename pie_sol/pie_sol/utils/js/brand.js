frappe.ui.form.on("Item", {
	refresh(frm) {
        frm.set_query("item_group", function () {
          return {
            filters: {
				is_group:1,
            },
          };
          
        }
      );

      frm.set_query("custom_model", function () {
        return {
          filters: {
      is_group:0,
          },
        };
        
      }
    );
  
      

    
	},
    item_group:function(frm) {
        frm.set_query("custom_model", function () {
          return {
            filters: {
                parent_item_group:frm.doc.item_group,
				is_group:0,

            },
          };
        });
 
	},

});



