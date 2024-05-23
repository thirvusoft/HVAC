frappe.ui.form.on("Service Records", {
	refresh(frm) {
        console.log("###################################################");
        frm.set_query("brand_name", function () {
          return {
            filters: {
				      is_group:1,
              parent_item_group:'All Item Groups',

            },
          };
          
        }
      );
    },
    
    // brand_name:function(frm){
    //   frm.set_query("mc_type", function () {
    //     return {
    //       filters: {
    //         is_group:1,
    //         parent_item_group:frm.doc.brand_name,
    //             },
    //         };
        
    //     }
    //     );
    // },


    // model_name:function(frm){
    //     frm.set_query("mc_type", function () {
    //         return {
    //           filters: {
    //             is_group:0,
    //             parent_item_group:frm.doc.mc_type,
    //                 },
    //             };
            
    //         }
    //         );
    // }
}
);