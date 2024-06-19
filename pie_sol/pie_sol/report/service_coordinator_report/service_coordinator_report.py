import frappe
from frappe import _
from datetime import datetime

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    frappe.log_error('Columns:', columns)
    frappe.log_error('Data:', data)
    frappe.log_error('Filters:', filters)
    return columns, data

def get_columns(filters):
	columns = [
		{
			'fieldname': 'maintenance_visit_id',
			'label': _('Maintenance Visit'),
			'fieldtype': 'Link',
			'options': 'Maintenance Visit'
		},
		{
			'fieldname': 'planned_date',
			'label': _('Planned Date'),
			'fieldtype': 'Date'
		},
		{
			'fieldname': 'replanned_date',
			'label': _('Replanned Date'),
			'fieldtype': 'Date'
		},
		{
			'fieldname': 'machine_id',
			'label': _('Machine ID'),
			'fieldtype': 'Link',
			'options': 'Machine'
		},
		{
			'fieldname': 'warranty_amc_id',
			'label': _('Warranty / AMC ID'),
			'fieldtype': 'Link',
			'options': 'Warranty'
		},
		{
			'fieldname': 'brand',
			'label': _('Brand'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'model_name',
			'label': _('Model Name'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'indoor_outdoor_model',
			'label': _('Indoor/Outdoor Model'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'indoor_outdoor_serial',
			'label': _('Indoor/Outdoor Serial'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'customer',
			'label': _('Customer Name'),
			'fieldtype': 'Link',
			'options': 'Customer'
		},
		{
			'fieldname': 'phone',
			'label': _('Phone Number'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'pincode',
			'label': _('Pincode'),
			'fieldtype': 'Data'
		},
		{
			'fieldname': 'maintenance_visit_type',
			'label': _('Maintenance Visit Type'),
			'fieldtype': 'Data'
		},
	]
	return columns


def get_data(filters):

    conditions = []

    query = """

    SELECT

        mv.name AS maintenance_visit_id,

        mv.mntc_date AS planned_date,

        mv.custom_replanned_service_date AS replanned_date,

        mv.custom_machine_id AS machine_id,

        mv.custom_warrantyamc AS warranty_amc_id,

        mv.customer AS customer,

        mv.contact_mobile AS phone,

        mv.custom_pincodes AS pincode,

        mv.maintenance_type AS maintenance_visit_type,

        m.brand_name AS brand,

        m.model_name AS model_name,

        mp1.item_name AS indoor_outdoor_model,

        mp2.custom_serial_number AS indoor_outdoor_serial

    FROM

        `tabMaintenance Visit` mv

    LEFT JOIN

        `tabCustomer` c ON mv.customer = c.name

    LEFT JOIN

        `tabMachine` m ON mv.custom_machine_id = m.name

    LEFT JOIN

        (

            SELECT 

                parent,

                GROUP_CONCAT(item_name) AS item_name

            FROM

                `tabMaintenance Visit Purpose`

            WHERE

                item_name IS NOT NULL

            GROUP BY

                parent

        ) mp1 ON mv.name = mp1.parent

    LEFT JOIN

        (

            SELECT 

                parent,

                GROUP_CONCAT(custom_serial_number) AS custom_serial_number

            FROM

                `tabMaintenance Visit Purpose`

            WHERE

                custom_serial_number IS NOT NULL

            GROUP BY

                parent

        ) mp2 ON mv.name = mp2.parent

    """



    # Applying filters

    if filters:

        if filters.get('from_date') and filters.get('to_date'):

            from_date = filters.get('from_date')

            to_date = filters.get('to_date')

            if to_date < from_date:

                frappe.throw("To Date cannot be less than From Date")

            conditions.append(f"mv.mntc_date BETWEEN '{from_date}' AND '{to_date}'")


        if filters.get('maintenance_visit_type'):

            conditions.append(f"mv.maintenance_type = '{filters.get('maintenance_visit_type')}'")


        if filters.get('technician_name'):

            conditions.append(f"mv.custom_technician = '{filters.get('technician_name')}'")



        if filters.get('customer_name'):

            conditions.append(f"mv.customer = '{filters.get('customer_name')}'")



        if filters.get('pincode'):

            conditions.append(f"mv.custom_pincodes = '{filters.get('pincode')}'")





    # Adding conditions to the query

    if conditions:

        query += " WHERE " + " AND ".join(conditions)



    try:
        print(query,"**************")

        frappe.log_error('Final Query', query)

        data = frappe.db.sql(query, as_dict=True)

        frappe.log_error('Data Length', len(data))

        return data



    except Exception as e:

        frappe.log_error(f"Error fetching data: {str(e)}")

        return []

