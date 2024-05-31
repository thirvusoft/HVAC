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


		if self.is_new():
			machine_id=frappe.get_doc('Machine',self.machine)
			machine_id.append('table_toxv',{
				'amc_id':self.name,
				'start_date':self.start_date,
				'end_date':self.end_date,
				'service_count':self.service_count,
				'period_of_month':self.period_in_month,
				'contract_date':self.contract_date,
				'serviced_by':self.serviced_by,
				'enrolment':self.enrolment,
			})
			machine_id.save()

			print(self.name,self.service_count,self.start_date,self.end_date,'**************************')