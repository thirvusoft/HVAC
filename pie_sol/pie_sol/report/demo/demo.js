// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt



frappe.query_reports["demo"] = {
    filters: [
        {
            fieldname: "company",
            label: __("Company"),
            fieldtype: "Link",
            options: "Company",
            default: frappe.defaults.get_user_default('Company'), // Set default company
            reqd: 1
        },
		{
            fieldname: "party_type",
            label: __("Party Type"),
            fieldtype: "Select",
            options: "Customer\nSupplier",
            reqd: 1,
            onchange: function() {
                const partyType = frappe.query_report.get_filter_value('party_type');
                if (partyType) {
                    frappe.query_report.set_filter_property('party', 'options', partyType);
                    frappe.query_report.set_filter_value('party', null); // Clear the party field value when party_type changes
                }
            }
        },







		{
			fieldname: "party",
			label: __("Party"),
			fieldtype: "MultiSelectList",
			get_data: function (txt) {
				if (!frappe.query_report.filters) return;

				let party_type = frappe.query_report.get_filter_value("party_type");
				if (!party_type) return;

				return frappe.db.get_link_options(party_type, txt);
			},
			on_change: function () {
				var party_type = frappe.query_report.get_filter_value("party_type");
				var parties = frappe.query_report.get_filter_value("party");

				if (!party_type || parties.length === 0 || parties.length > 1) {
					frappe.query_report.set_filter_value("party_name", "");
					frappe.query_report.set_filter_value("tax_id", "");
					return;
				} else {
					var party = parties[0];
					var fieldname = erpnext.utils.get_party_name(party_type) || "name";
					frappe.db.get_value(party_type, party, fieldname, function (value) {
						frappe.query_report.set_filter_value("party_name", value[fieldname]);
					});

					if (party_type === "Customer" || party_type === "Supplier") {
						frappe.db.get_value(party_type, party, "tax_id", function (value) {
							frappe.query_report.set_filter_value("tax_id", value["tax_id"]);
						});
					}
				}
			},
		},
        {
            fieldname: "from_date",
            label: __("From Date"),
            fieldtype: "Date",
            reqd: 1
        },
        {
            fieldname: "to_date",
            label: __("To Date"),
            fieldtype: "Date",
            reqd: 1
        },
       
        // {
        //     fieldname: "party",
        //     label: __("Party"),
        //     fieldtype: "Dynamic Link",
        //     options: frappe.query_report.get_filter_value('party_type')
        // },
		







		// {
		// 	fieldname: "party_type",
		// 	label: __("Party Type"),
		// 	fieldtype: "Autocomplete",
		// 	options:  "Customer\nSupplier",
		// 	on_change: function () {
		// 		frappe.query_report.set_filter_value("party", "");
		// 	},
		// },
		
    ]
};