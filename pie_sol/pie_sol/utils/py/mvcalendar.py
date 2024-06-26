import frappe

@frappe.whitelist()
def mvcalendarget(custom_warrantyamc):
    # Convert filter to string if necessary
    filter_str = str(custom_warrantyamc)

    filter_str=filter_str.strip()


    # Using frappe.get_all() with the same filter
    m = frappe.get_last_doc('Maintenance Visit', filters={'custom_machine_id': filter_str})
    return m


