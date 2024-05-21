import frappe

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
    entries = []
    for i in doc.custom_records:
        if i.machine in entries:
            frappe.throw(i.machine + " Already in available in table")
        else:
            entries.append(i.machine)


def updaterecords(doc,events):
    name=doc.name
    customer_name=doc.customer_name
    cus=frappe.get_doc('Customer',customer_name)
    print(cus)
    print(name)
    for row in cus.custom_records:
        if row.machine==name:
            row.machine=doc.name
            row.brand_name=doc.brand_name
            row.mc_type=doc.mc_type
            row.model_name=doc.model_name
            row.indoor_model=doc.indoor_model
            row.outdoor_model=doc.outdoor_model
            row.tonnes=doc.tonnes
            row.date=doc.installation_date
    cus.save()
    cus.reload()