import frappe

# def machine_verify(doc,events):
#     temp=frappe.db.get_list("AMC",{'machine':doc.machine})
#     if len(temp)>=1:
#         frappe.throw("Machine Id already linked with another AMC")