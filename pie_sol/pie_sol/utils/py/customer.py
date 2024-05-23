import frappe
import time
from frappe import _

def validate_customer_abbreviation(doc, events):
    if doc.is_new():
        if doc.custom_abbreviation:
            count=frappe.db.get_list('Customer',filters={
                'custom_abbreviation':doc.custom_abbreviation
            })
            if len(count)!=0:
                existing_customer = frappe.db.exists('Customer', {'custom_abbreviation': doc.custom_abbreviation})

                frappe.throw(_("Abbreviation '{}' already exists for customer '{}'").format(doc.custom_abbreviation, existing_customer), title=_('Duplicate Abbreviation'))



def mobile_number_validation1(doc,events):
    num=doc.custom_mobile_number1
    if num.isdigit():
        if len(num)!=10:
            frappe.throw(_("Mobile must have 10 digit"))
    else:
        frappe.throw(_("Invalid mobile format"))

        
def mobile_number_validation2(doc,events):
    if doc.custom_mobilenumber2:
        num=doc.custom_mobilenumber2
        if num.isdigit():
            if len(num)!=10:
                frappe.throw(_("Mobile must have 10 digit"))
        else:
            frappe.throw(_("Invalid mobile format"))



def validate_customer_emails(doc, method):
    for row in doc.get("custom_information"):
        if row.email:
            frappe.utils.validate_email_address(row.email, True)
#############

def customerservice(doc,events):
    customer_name=doc.customer_name
    cus=frappe.get_doc('Customer',customer_name)
    cus.append("custom_records",
        {
            'machine':doc.name,
            'brand_name':doc.brand_name,
            'mc_type':doc.mc_type,
            'model_name':doc.model_name,
            'indoor_model':doc.indoor_model,
            'outdoor_model':doc.outdoor_model,
            'tonnes':doc.tonnes,
            'date':doc.installation_date,

        })
    cus.save()
    cus.reload()


def duplicateEntry(doc , events):
    if doc.custom_records:
        entries = []
        for i in doc.custom_records:
            if i.machine in entries:
                frappe.throw(i.machine + " Already in available in table")
            else:
                entries.append(i.machine)


# def updaterecords(doc,events):
#     name=doc.name
#     customer_name=doc.customer_name
#     cus=frappe.get_doc('Customer',customer_name)
#     for row in cus.custom_records:
#         # if row.machine==name and row.brand_name==doc.brand_name and row.mc_type==doc.mc_type and row.model_name==doc.model_name and row.indoor_model==doc.indoor_model and row.outdoor_model==doc.outdoor_model and row.tonnes==doc.tonnes and row.date==doc.installation_date:
#         #     return
#         # else:

#             row.machine=doc.name
#             row.brand_name=doc.brand_name
#             row.mc_type=doc.mc_type
#             row.model_name=doc.model_name
#             row.indoor_model=doc.indoor_model
#             row.outdoor_model=doc.outdoor_model
#             row.tonnes=doc.tonnes
#             row.date=doc.installation_date
        
#             print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
#     cus.save()




# def machine_update(doc, events):
#     for row in doc.custom_records:
#         machine = frappe.get_doc("Machine", row.machine)
#         print(machine, machine.brand_name, machine.installation_date, machine.indoor_model, machine.outdoor_model, machine.model_name, machine.mc_type, machine.tonnes)
#         print(machine, row.brand_name, row.date, row.indoor_model, row.outdoor_model, row.model_name, row.mc_type, row.tonnes)
        
#         if frappe.db.get_value("Machine", machine.name, "brand_name") != row.brand_name:
#             machine.brand_name = row.brand_name
#         if frappe.db.get_value("Machine", machine.name, "mc_type") != row.mc_type:
#             machine.mc_type = row.mc_type
#         if frappe.db.get_value("Machine", machine.name, "model_name") != row.model_name:
#             machine.model_name = row.model_name
#         if frappe.db.get_value("Machine", machine.name, "indoor_model") != row.indoor_model:
#             machine.indoor_model = row.indoor_model
#         if frappe.db.get_value("Machine", machine.name, "outdoor_model") != row.outdoor_model:
#             machine.outdoor_model = row.outdoor_model
#         if frappe.db.get_value("Machine", machine.name, "tonnes") != row.tonnes:
#             machine.tonnes = row.tonnes
#         if frappe.db.get_value("Machine", machine.name, "installation_date") != row.date:
#             machine.installation_date = row.date
            
#         machine.save()




def customer_update(doc, events):
    customer = frappe.get_doc("Customer", doc.customer_name)
    for row in customer.custom_records:
        
        if  row.brand_name != doc.brand_name and row.machine==doc.name:
            row.brand_name = doc.brand_name
        if  row.mc_type != doc.mc_type and row.machine==doc.name:
            row.mc_type = doc.mc_type
        if row.model_name != doc.model_name and row.machine==doc.name:
            row.model_name = doc.model_name
        if row.indoor_model!= doc.indoor_model and row.machine==doc.name:
            row.indoor_model = doc.indoor_model
        if row.outdoor_model != doc.outdoor_model and row.machine==doc.name:
            row.outdoor_model=doc.outdoor_model
        if row.tonnes != doc.tonnes and row.machine==doc.name:
            row.tonnes = doc.tonnes
        if row.date != doc.installation_date and row.machine==doc.name:
            row.date = doc.installation_date
            
    customer.save()
    













# def machine_updaterecords(doc, events):
#     for row in doc.custom_records:
#         mac = frappe.get_doc('Machine', row.machine)
#         if mac:
#             # if mac.brand_name==row.brand_name and mac.mc_type==row.mc_type and mac.model_name==row.model_name and mac.indoor_model==row.indoor_model and mac.outdoor_model==row.outdoor_model and mac.tonnes==row.tonnes and mac.installation_date==row.date:
#             #     return
#             # else:
#                 mac.update({
#                     'brand_name': row.brand_name,
#                     'mc_type': row.mc_type,
#                     'model_name': row.model_name,
#                     'indoor_model': row.indoor_model,
#                     'outdoor_model': row.outdoor_model,
#                     'tonnes': row.tonnes,
#                     'installation_date': row.date
#             })


  
        
