import frappe

def date_validate(doc, events):
    previous_actual_date = None  # Initialize previous actual service date outside the loop

    for i, row in enumerate(doc.table_hsoa):
        current_date = row.get('actual_service_date')   
        print(current_date,'@@@@@@@@@@@@@@@@@@@@@@@')
        print(previous_actual_date,'$$$$$$$$$$$$$$$$$$$$$$$$$$')
        if current_date and previous_actual_date:
            if previous_actual_date > current_date:
                frappe.throw(f"Date in row {i+1} cannot be less than the date in the previous row")
        
        previous_actual_date = current_date  # Update previous actual service date for next iteration
        print(previous_actual_date,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')



def machine_id_verify(doc,events):

    temp=frappe.db.get_list("Warranty",{'machine':doc.machine})
    if len(temp)>=1:
        
        frappe.throw("Machine Id already linked with another Warranty")



@frappe.whitelist()
def create_warranty(customer_name,machine_name,warranty_period_in_month,warranty_service_count,warranty_start_date,warranty_contract_date,warranty_serviced_by,Warranty_enrolment):
    print('*********************')
    warranty = frappe.new_doc("Warranty")
    warranty.customer_name=customer_name
    warranty.machine = machine_name
    warranty.service_count = warranty_service_count
    warranty.period_in_month = warranty_period_in_month
    warranty.start_date = warranty_start_date
    warranty.contract_date = warranty_contract_date
    warranty.serviced_by = warranty_serviced_by
    warranty.enrolment = Warranty_enrolment
    # Set more fields here as needed
    warranty.save()