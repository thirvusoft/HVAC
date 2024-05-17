frappe.ui.form.on("Item table", {
    refresh:function(frm){
            frm.set_query("model_name", function () {
                return {
                    filters: {
                        is_group: 1,
                    },
                };
            });
        }
    });
