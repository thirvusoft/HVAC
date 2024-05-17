frappe.ui.form.on("Item table", {


    refresh(frm) {
      frm.set_query("model_name", function () {
          return {
              filters: {
                  is_group: 0,
              },
          };
      });
    },

});