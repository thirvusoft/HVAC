import frappe
from frappe.custom.doctype.property_setter.property_setter import make_property_setter






def tableentry(doc,events):

    customer_name=doc.customer_name
    indoor_serial_no=doc.indoor_serial_no
    indoor_model=doc.indoor_model
    tonnes=doc.tonnes
    outdoor_model=doc.outdoor_model
    outdoor_serial_no=doc.outdoor_serial_no



    


    doc.item.clear()
    if doc.is_new():
        doc.append("item",
               {
        'model_type':'Indoor Serial No',
        'serial_no':indoor_serial_no,
        'tonnes':tonnes,
        'model_name':indoor_model,
        })
        doc.append("item",
               {
        'model_type':'Outdoor Serial No',
        'serial_no':outdoor_serial_no,
        'tonnes':tonnes,
        'model_name':outdoor_model,

         })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })

        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })

        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Indoor Serial No',
        })




# def machineentrysetup(doc,events):
    # if doc.is_new():
    #     doc.append("item",
    #            {
    #     'model_type':'Indoor Serial No',

    #     })
        # doc.append("item",
        #        {
        # 'model_type':'Outdoor Serial No',

        #  })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })

        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })

        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })
        # doc.append("item",
        #         {
        #     'model_type':'Outdoor Serial No',
        # })

@frappe.whitelist()
def create_machine(customer_name,brand_name, mc_type, model_name, indoor_model, outdoor_model, tonnes, outdoor_serial_no,date):
    machine = frappe.new_doc("Machine")
    machine.customer_name=customer_name
    machine.brand_name = brand_name
    machine.mc_type = mc_type
    machine.model_name = model_name
    machine.indoor_model = indoor_model
    machine.outdoor_model = outdoor_model
    machine.tonnes = tonnes
    machine.outdoor_serial_no= outdoor_serial_no
    machine.installation_date = date
    # Set more fields here as needed
    machine.save()
    cus = frappe.get_doc("Customer" , customer_name)
    cus.save()
    cus.reload()
    return machine.name

    