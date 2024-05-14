import frappe

# def customerservice(doc,events):
#     customer_name=doc.customer_name
#     cus=frappe.get_doc('Customer',customer_name)
#     for row in doc.item:
#         i=0
#         print("////////////////////////////////////////////////////////////??",row.model_type,row.serial_no,row.tonnes,row.model_name)
#         print(i+1)
#         cus.append("custom_entries",
#                {
#         'model_type': row.model_type,
#         'serial_no': row.serial_no,
#         'tonnes':row.tonnes,
#         'model_name': row.model_name,
#         })
#         cus.save()
#         cus.reload()
        


# def customerabb(doc,events):

#     existing_customer = frappe.db.exists('Customer', {'abbrevation':doc.custom_abbreviation})
#     frappe.errprint(existing_customer)
