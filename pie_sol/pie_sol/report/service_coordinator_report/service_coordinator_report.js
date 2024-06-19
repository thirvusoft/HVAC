frappe.query_reports["Service Coordinator Report"] = {
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
            "fieldname": "maintenance_visit_type",
            "label": __("Maintenance Visit Type"),
            "fieldtype": "Select",
            "options": [" " , "Warranty", "AMC", "Unplanned"],
            "reqd": 1,
            "width": "80"
        },
        {
            "fieldname": "technician_name",
            "label": __("Technician Name"),
            "fieldtype": "Link",
            "options": "Employee",  
            "width": "80"
        },
        {
            "fieldname": "customer_name",
            "label": __("Customer Name"),
            "fieldtype": "Link",
            "options": "Customer",  
            "width": "80"
        },
        {
            "fieldname": "pincode",
            "label": __("Pincode"),
            "fieldtype": "Link",
            "options": "Territory",  
            "width": "80"
        },

    ]
};
