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
			print(current_date,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			print(previous_actual_date,"**********************************")
			if current_date and previous_actual_date:
				if previous_actual_date > current_date:
					frappe.throw(f"Date in row {i+1} cannot be less than the date in the previous row")
			if current_date:
				previous_actual_date = current_date  
			print(previous_actual_date,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@")