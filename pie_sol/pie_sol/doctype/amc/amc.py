# Copyright (c) 2024, pie-sol and contributors
# For license information, please see license.txt

import frappe
# import frappe
from frappe.model.document import Document


class AMC(Document):
	# def before_insert(self):
	# 	temp=frappe.db.get_list("AMC",{'machine':self.machine})        
	# 	if len(temp)>=1:
	# 		frappe.throw("Machine Id already linked with another AMC")

	def before_save(self):
		previous_actual_date = None 
		for i, row in enumerate(self.table_ibgb):
			current_date = row.get('actual_service_date')   
			if current_date and previous_actual_date:
				if previous_actual_date > current_date:
					frappe.throw(f"Date in row {i+1} cannot be less than the date in the previous row")
			if current_date:
				previous_actual_date = current_date  



	def before_submit(self):


			print(self.custom_created,'##############################')
			mac=frappe.get_doc('Machine',self.machine_field)
			mac.reload()
			if self.docstatus==1:
				mac.append('table_toxv',{
					'amc_id':self.name,
					'start_date':self.start_date,
					'end_date':self.end_date,
					'service_count':self.service_count,
					'period_of_month':self.period_in_month,
					'contract_date':self.contract_date,
					'serviced_by':self.serviced_by,
					'enrolment':self.enrolment,
				})
				mac.save()
			else:
				for row in mac.table_toxv:
					if row.amc_id == self.name :
						row.start_date=self.start_date,
						row.end_date=self.end_date,
						row.service_count=self.service_count,
						row.period_of_month=self.period_in_month,
						row.contract_date=self.contract_date,
						row.serviced_by=self.serviced_by,
						row.enrolment=self.enrolment,
					
				mac.save()

				print("1*****************")

			cus=frappe.get_doc('Customer',self.customer_name)
			cus.reload()
			if self.docstatus==1:
				cus.append('custom_amc_records',{
					'amc_id':self.name,
					'start_date':self.start_date,
					'end_date':self.end_date,
					'service_count':self.service_count,
					'period_of_month':self.period_in_month,
					'contract_date':self.contract_date,
					'serviced_by':self.serviced_by,
					'enrolment':self.enrolment,
				})
				cus.save()
			else:
				for row in cus.custom_amc_records:
					if row.amc_id == self.name :
						row.start_date=self.start_date,
						row.end_date=self.end_date,
						row.service_count=self.service_count,
						row.period_of_month=self.period_in_month,
						row.contract_date=self.contract_date,
						row.serviced_by=self.serviced_by,
						row.enrolment=self.enrolment,
					
				cus.save()
            

	def on_cancel(self):
			machine=frappe.get_doc('Machine',self.machine_field)
			machine.reload()
			index = 0


			rows_to_remove = []
			for row in machine.table_toxv:
				if row.amc_id == self.name:
					rows_to_remove.append(row)
			
			for row in rows_to_remove:
				machine.table_toxv.remove(row)
			
			for row in machine.table_toxv:
				row.idx = index
				index += 1
			
			machine.save()


			customer=frappe.get_doc('Customer',self.customer_name)
			customer.reload()

			index=0
			row1=[]
			for row in customer.custom_amc_records:
				if row.amc_id==self.name:
					row1.append(row)

			for row in row1:
					customer.custom_amc_records.remove(row)
				
			for row in customer.custom_amc_records:
					row.idx = index
					index += 1
				
			customer.save()



			for row in self.custom_label:
				frappe.delete_doc('Maintenance Visit', row.link_wdce)
				