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

        var abbreviation = abbreviation.toUpperCase();
        frm.set_value('custom_abbreviation', abbreviation);
    },


    custom_abbreviation: function(frm) {
        var abbreviation = frm.doc.custom_abbreviation;
        if (abbreviation) {                                                  
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Customer',
                    filters: {
                        'custom_abbreviation': frm.doc.custom_abbreviation
                    },
                    fields: ['name']
                },
                callback: function(response) {
                    console.log(response.message)
                    if (response.message && response.message.length >=1) {
                        frm.fields_dict.custom_abbreviation.set_description('<span style="color:red;">' +__('User abbreviation already exists')+'</span>');
                    } else {
                        frm.fields_dict.custom_abbreviation.set_description('');
                    }
                }
            });
        }
    }

                
            
        
    
});

    