# Copyright (c) 2024, pie-sol and contributors
# For license information, please see license.txt

import frappe

from frappe import _
from datetime import datetime

def execute(filters=None):
	columns, data = [], []
	columns=get_columns(filters)
	data=get_data(filters)
	html_button = '<button onclick="myFunction()">Replan Date</button>'
	return columns,data


def get_columns(filters):
	columns = [
			{	
				'fieldname': 'customer',
				'label': _('Customer Name'),
				'fieldtype': 'Link',
				'options': 'Customer'
			},
			{
				'fieldname': 'name',
				'label': _('Maintenance Visit'),
				'fieldtype': 'link',
				'options': 'Maintenance Visit'
			},
			{
				'fieldname': 'custom_machine_id',
				'label': _('Machine ID'),
				'fieldtype': 'link',
				'options': 'Machine'
			},
			{
				'fieldname': 'mntc_date',
				'label': _('Planned Date'),
				'fieldtype': 'Date',
				'options': ''
			},
			{
				'fieldname': 'custom_replanned_service_date',
				'label': _('Replanned Date'),
				'fieldtype': 'Date',
				'options': ''
			},
			{	
				'fieldname': 'custom_actual_service_date',
				'label': _('Actual Service Date'),
				'fieldtype': 'Date',
				'options': ''
			},
			{
				'fieldname': 'custom_warrantyamc',
				'label': _('Warranty / AMC ID'),
				'fieldtype': 'link',
				'options': 'Warranty'
			},
			{	
				'fieldname': 'model_name',
				'label': _('Model Name'),
				'fieldtype': 'Date',
				'options': ''
			},
			{
				'fieldname': 'serial_no',
				'label': _('Serial Number'),
				'fieldtype': 'Data',
				'options': ''
			},

	]
	return columns




		

def get_data(filters):
		

		conditions = ""
		if filters.get("customer_name"):
			conditions += f"AND customer_name = '{filters.get('customer_name')}'"
		if filters.get("machine_id"):  
			conditions += f"AND custom_machine_id = '{filters.get('machine_id')}'"
		if filters.get("maintenance_visit_type"):
			conditions += f"AND maintenance_type = '{filters.get('maintenance_visit_type')}'"
		print({filters.get('from_date')}, "^^^^^^^^^^^^^^^^^^^^^^^^")
		print({filters.get('to_date')},"&&&&&&&&&&&&&&&&&&&&&&&&")
		# from_date={filters.get('from_date')}
		# to_date={filters.get('to_date')}

		# from_date = datetime.strptime(filters.get("from_date"), "%d-%m-%Y").strftime("%Y-%m-%d")
		# to_date = datetime.strptime(filters.get("to_date"), "%d-%m-%Y").strftime("%Y-%m-%d")

		if  {filters.get('from_date')} and {filters.get('to_date')}:
			conditions += f" AND  mntc_date BETWEEN '{filters.get('from_date')}' AND '{filters.get('to_date')}'"
		# Add more conditions as needed

		sql_query = f"""
			SELECT customer,name, custom_machine_id, mntc_date, custom_replanned_service_date, custom_actual_service_date, maintenance_type,custom_warrantyamc
			FROM `tabMaintenance Visit`
			WHERE (docstatus=0 OR docstatus=1) {conditions}
		"""
		data=frappe.db.sql(sql_query, as_dict=True)

		for d in data:
			print(d['mntc_date'])


		
		return data


