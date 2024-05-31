frappe.ui.form.on("Customer", {
    refresh:function(frm){
                if (cur_frm.fields_dict.custom_records) {
            // Hide the "Add Multiple Rows" button
                    cur_frm.fields_dict['custom_records'].$wrapper.find(".grid-add-row").hide();
                };
            

            frm.fields_dict['custom_records'].grid.get_field('brand_name').get_query = function(doc, cdt, cdn) {
                return {
                    filters: [
                        ['Item Group', 'is_group', '=', 1],
                        ['Item Group', 'parent_item_group', '=', 'All Item Groups'],
                     
                    ]
                };
            };
            frm.fields_dict['custom_records'].grid.get_field('mc_type').get_query = function(doc, cdt, cdn) {
                let row = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item Group', 'is_group', '=', 1],
                        ['Item Group', 'parent_item_group', '=', row.brand_name],
                     
                    ]
                };
            };
            frm.fields_dict['custom_records'].grid.get_field('model_name').get_query = function(doc, cdt, cdn) {
                let row = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item Group', 'is_group', '=', 0],
                        ['Item Group', 'parent_item_group', '=', row.mc_type],
                     
                    ]
                };
            };
            frm.fields_dict['custom_records'].grid.get_field('indoor_model').get_query = function(doc, cdt, cdn) {
                let row = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item', 'item_group', '=', row.brand_name],
                        ['Item', 'custom_mc_type', '=', row.mc_type],
                        ['Item', 'custom_model', '=', row.model_name],
                    ]
                };
            };
            frm.fields_dict['custom_records'].grid.get_field('outdoor_model').get_query = function(doc, cdt, cdn) {
                let row = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item', 'item_group', '=', row.brand_name],
                        ['Item', 'custom_mc_type', '=', row.mc_type],
                        ['Item', 'custom_model', '=', row.model_name],
                    ]
                };
            };
        } ,








    // customer_name: function(frm) {
    //     var abbrev_name = function(str1) {
    //         var split_names = str1.trim().split(" ");

    //         if (split_names.length > 1) {
    //             return (split_names[0].charAt(0) + (split_names.length > 2 ? split_names[1].charAt(0) + split_names[2].charAt(0) : split_names[1].charAt(0) + split_names[1].charAt(1)));
    //         }
    //         return split_names[0].charAt(0) + split_names[0].charAt(1) + split_names[0].charAt(2);
    //     };

    //     var customer_name = frm.doc.customer_name;

    //     var abbreviation = abbrev_name(customer_name);

    //     var abbreviation = abbreviation.toUpperCase();
    //     frm.set_value('custom_abbreviation', abbreviation);
    // },


    // custom_abbreviation: function(frm) {
    //     var abbreviation = frm.doc.custom_abbreviation;
    //     if (abbreviation) {                                                  
    //         frappe.call({
    //             method: 'frappe.client.get_list',
    //             args: {
    //                 doctype: 'Customer',
    //                 filters: {
    //                     'custom_abbreviation': frm.doc.custom_abbreviation
    //                 },
    //                 fields: ['name']
    //             },
    //             callback: function(response) {
    //                 console.log(response.message)
    //                 if (response.message && response.message.length >=1) {
    //                     frm.fields_dict.custom_abbreviation.set_description('<span style="color:red;">' +__('User abbreviation already exists kindly change customer name')+'</span>');
    //                 } else {
    //                     frm.fields_dict.custom_abbreviation.set_description('');
    //                 }
    //             }
    //         });
    //     }
    // },



    
    custom_add_record:function(frm){
        let d = new frappe.ui.Dialog({
            title: 'Enter Machine details',
            fields: [
                {
                    label: 'Brand Name',
                    fieldname: 'add_brand_name',
                    fieldtype: 'Link',
                    options: 'Item Group', 
                    reqd: true,
                    get_query: function() {
                        return {
                        filters: {


      				            is_group:1,
                                parent_item_group:'All Item Groups',
                            }
                        };
                    }
                },
                {
                    label: 'MC Type',
                    fieldname: 'add_mc_type',
                    fieldtype: 'Link',
                    options: 'Item Group',
                    reqd: true, 
                    get_query: function() {
                        return {

                        filters: {


                                parent_item_group:d.get_value('add_brand_name'),
      				            is_group:1,
                            }
                        };
                    }
                },
                {
                    label: 'Model Name',
                    fieldname: 'add_model_name',
                    fieldtype: 'Link',
                    options: 'Item Group',
                    reqd: true, 
                    get_query: function() {
                        
                        return {
                            
                        filters: {


      				            is_group:0,
                                parent_item_group:d.get_value('add_mc_type'),
                            }
                        };
                    }
                },
                {
                    label: 'Tonnes',
                    fieldname: 'add_tonnes',
                    fieldtype: 'Select',
                    options:['1','1.5','2','2.5','3','3.5','4','4.5','5','5.5'],
                    reqd: true
                },
                {
                    label: 'Indoor model',
                    fieldname: 'add_indoor_model',
                    fieldtype: 'Link',
                    options: 'Item',
                    reqd: true, 
                    get_query: function() {
                        
                        return {
                            
                        filters: {
                                item_group:d.get_value('add_brand_name'),
                                custom_mc_type:d.get_value('add_mc_type'),
                                custom_model:d.get_value('add_model_name')
                            }
                        };
                    }
                },
                {
                    label: 'Outdoor model',
                    fieldname: 'add_outdoor_model',
                    fieldtype: 'Link',
                    options: 'Item',
                    reqd: true, 
                    get_query: function() {
                        
                        return {
                            
                        filters: {
                            item_group:d.get_value('add_brand_name'),
                            custom_mc_type:d.get_value('add_mc_type'),
                            custom_model:d.get_value('add_model_name')
                            }
                        };
                    }
                },
                {
                    label: 'Date',
                    fieldname: 'add_date',
                    fieldtype: 'Date',
                    reqd: true
                }
            ],
            size: 'small', // small, large, extra-large 
            primary_action_label: 'Submit',
            primary_action(values) {


                

            // Create a new Machine document
                    frappe.call({
                        method: 'pie_sol.pie_sol.utils.py.machine.create_machine',
                        args: {
                    
                        customer_name:frm.doc.customer_name,
                        brand_name: values.add_brand_name,
                        mc_type: values.add_mc_type,
                        model_name: values.add_model_name,
                        indoor_model: values.add_indoor_model,
                        outdoor_model: values.add_outdoor_model,
                        tonnes: values.add_tonnes,
                        date:values.add_date
                        },
                    callback: function(response) {
                        frm.refresh_fields('custom_records')
                    
                   
                }
            }); 
       
                d.hide();
            }
        });
        
        d.show();
        
    },
                

});











frappe.ui.form.on("Service Records", {


    refresh(frm) {
      frm.set_query("brand_name", function () {
          return {
              filters: {
                  is_group: 1,
              },
          };
      });
    },

});