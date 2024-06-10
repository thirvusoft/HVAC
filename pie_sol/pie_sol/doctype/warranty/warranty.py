# Copyright (c) 2024, pie-sol and contributors
# For license information, please see license.txt
import frappe

# import frappe
from frappe.model.document import Document


class Warranty(Document):
    def before_insert(self):
        temp=frappe.db.get_list("Warranty",{'machine':self.machine})
        
        if len(temp)>1:
            return 	frappe.throw("Machine Id already linked with another Warranty")



    def before_save(self):
        previous_actual_date = None 
        for i, row in enumerate(self.table_hsoa):
            current_date = row.get('actual_service_date')   
            if current_date and previous_actual_date:
                if previous_actual_date > current_date:
                    frappe.throw(f"Date in row {i+1} cannot be less than the date in the previous row")
            
            previous_actual_date = current_date  


    def before_submit(self):
        mac = frappe.get_doc("Machine", self.machine)
        mac.reload()
        if self.docstatus==1:
            mac.append("table_rvqo", {
                'warranty_id': self.name,
                'start_date': self.start_date,
                'end_date': self.end_date,
                'service_count': self.service_count,
                'period_of_month': self.period_in_month,
                'contract_date': self.contract_date,
                'serviced_by': self.serviced_by,
                'enrolment': self.enrolment,
            })
            mac.save()

        else:
            print()
            for row in mac.table_rvqo:
                if row.warranty_id == self.name :
                        row.start_date=self.start_date,
                        row.end_date= self.end_date,
                        row.service_count= self.service_count,
                        row.period_of_month= self.period_in_month,
                        row.contract_date= self.contract_date,
                        row.serviced_by= self.serviced_by,
                        row.enrolment= self.enrolment,
            mac.save()
            


        cus = frappe.get_doc("Customer", self.customer_name)
        cus.reload()
        if self.docstatus==1:

            cus.append("custom_warranty_records", {
                'warranty_id': self.name,
                'start_date': self.start_date,
                'end_date': self.end_date,
                'service_count': self.service_count,
                'period_of_month': self.period_in_month,
                'contract_date': self.contract_date,
                'serviced_by': self.serviced_by,
                'enrolment': self.enrolment,
            })
            cus.save()

        else:
            for row in cus.custom_warranty_records:
                if row.warranty_id == self.name :
                        row.start_date=self.start_date,
                        row.end_date= self.end_date,
                        row.service_count= self.service_count,
                        row.period_of_month= self.period_in_month,
                        row.contract_date= self.contract_date,
                        row.serviced_by= self.serviced_by,
                        row.enrolment= self.enrolment,
            cus.save()




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



    def on_cancel(self):
        machine = frappe.get_doc("Machine", self.machine)
        index = 0
        
        rows_to_remove = []
        
        for row in machine.table_rvqo:
            if row.warranty_id == self.name:
                rows_to_remove.append(row)
        
        for row in rows_to_remove:
            machine.table_rvqo.remove(row)
        
        for row in machine.table_rvqo:
            row.idx = index
            index += 1

        machine.save()


        cus = frappe.get_doc("Customer", self.customer_name)
        index = 0
        
        rows_to_remove = []
        
        for row in cus.custom_warranty_records:
            if row.warranty_id == self.name:
                rows_to_remove.append(row)
        
        for row in rows_to_remove:
            cus.custom_warranty_records.remove(row)
        
        for row in cus.custom_warranty_records:
            row.idx = index
            index += 1

        cus.save()


        maintenance_visit=frappe.db.get_list("Maintenance Visit",{'custom_machine_id':self.machine})
        for doc in maintenance_visit:
            frappe.delete_doc("Maintenance Visit",doc['name'])
