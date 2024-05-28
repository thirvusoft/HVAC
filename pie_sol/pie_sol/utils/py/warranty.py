import frappe

# def date_validate(doc, events):
#     for i, row in enumerate(doc.custom_service_date):
#         # # Skip validation for the first row
#         # if i == 0:
            
#         # Get the current row's date and the previous row's date
#         current_date = row.get('actual_service_date')  # Replace 'date_field_name' with the actual field name
#         planned_date = row.get('planned_service_date')  # Replace 'date_field_name' with the actual field name of the date field
#         print(current_date,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
#         print(planned_date,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
#         # Perform date validation

#         if current_date:
#             print(current_date,"************************************************")
#             if planned_date>current_date:
#                 frappe.throw(f"Date in row {i+1} cannot be less than the date in the planned date")

def machine_id_verify(doc,events):

    temp=frappe.db.get_list("Warranty",{'machine':doc.machine})
    if len(temp)>=1:
        
        frappe.throw("Machine Id already linked with another Warranty")