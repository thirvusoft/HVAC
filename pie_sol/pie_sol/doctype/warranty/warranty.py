# Copyright (c) 2024, pie-sol and contributors
# For license information, please see license.txt
import frappe

# import frappe
from frappe.model.document import Document


class Warranty(Document):
    def before_insert(self):
        temp=frappe.db.get_list("Warranty",{'machine':self.machine})
        if len(temp)>=1:
            return 	frappe.throw("Machine Id already linked with another Warranty")



    def before_save(self):
        previous_actual_date = None 
        for i, row in enumerate(self.table_hsoa):
            current_date = row.get('actual_service_date')   
            if current_date and previous_actual_date:
                if previous_actual_date > current_date:
                    frappe.throw(f"Date in row {i+1} cannot be less than the date in the previous row")
            
            previous_actual_date = current_date  
            
    def validate(self):
        if self.machine:
            machine = frappe.get_doc("Machine", self.machine)
            machine.has_warranty = 1
            machine.save()

    def on_trash(self):
        if self.machine:
            machine = frappe.get_doc("Machine", self.machine)
            machine.has_warranty = 0
            machine.save()