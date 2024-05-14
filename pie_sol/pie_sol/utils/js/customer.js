frappe.ui.form.on("Customer", {


    customer_name: function(frm) {
        var abbrev_name = function(str1) {
            var split_names = str1.trim().split(" ");
            if (split_names.length > 1) {
                return (split_names[0].charAt(0) + (split_names.length > 2 ? split_names[1].charAt(0) + split_names[2].charAt(0) : split_names[1].charAt(0) + split_names[1].charAt(1)));
            }
            return split_names[0].charAt(0) + split_names[0].charAt(1) + split_names[0].charAt(2);
        };

        var customer_name = frm.doc.customer_name;

        var abbreviation = abbrev_name(customer_name);

        frm.set_value('custom_abbreviation', abbreviation);
    }
});

    