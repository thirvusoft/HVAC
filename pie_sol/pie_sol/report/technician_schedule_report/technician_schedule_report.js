// Copyright (c) 2024, pie-sol and contributors
// For license information, please see license.txt

frappe.query_reports["Technician Schedule Report"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": "80"
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": "80"
		},
		{
			"fieldname": "technician_name",
			"label": __("Technician Name"),
			"fieldtype": "Link",
			"options":"Employee",
			"width": "80"
		},
		{
			"fieldname": "machine_id",
			"label": __("Machine ID"),
			"fieldtype": "Link",
			"options":"Machine",
			"width": "80"
		},
		{
			"fieldname": "maintenance_visit_type",
			"label": __("Maintenance Visit Type"),
			"fieldtype": "Select",
			"reqd": 1,
			"options":(["Warranty", "AMC", "Unplanned"]),
			"width": "80"
		},
	]
};
