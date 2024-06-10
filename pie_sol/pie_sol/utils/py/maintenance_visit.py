import frappe
import json


# @frappe.whitelist()
# def warranty_maintenance(machine,warranty_name,customer_name,table_hsoa):
#     table_hsoa = json.loads(table_hsoa)
#     for row in table_hsoa:
      
#         war_visit=frappe.new_doc("Maintenance Visit")
#         war_visit.customer=customer_name
#         war_visit.custom_machine_id=machine
#         war_visit.custom_warrantyamc =warranty_name
#         war_visit.mntc_date=row['planned_service_date']
#         war_visit.completion_status='Partially Completed'
#         war_visit.maintenance_type='Scheduled'

#         machine2=frappe.get_doc("Machine",machine)
#         war_visit.append("purposes",{
#                 'custom_model_name_2':machine2.indoor_model,
#                 'custom_serial_number':machine2.indoor_serial_no
#         })
#         war_visit.append("purposes",{
#                 'custom_model_name_2':machine2.outdoor_model,
#                 'custom_serial_number':machine2.outdoor_serial_no
#         })
#         war_visit.save()
#         doc=frappe.get_doc('Warranty',warranty_name)
#         for i in doc.table_hsoa:
#             dt=str(i.planned_service_date)
#             (i.completed)
#             if dt==row['planned_service_date']:
#                     i.completed=1
#         doc.save()
#         break


# gpt
# Server-side Function
@frappe.whitelist()
def warranty_maintenance(machine, warranty_name, customer_name, table_hsoa):
    print("***********************")
    table_hsoa = json.loads(table_hsoa)
    for row in table_hsoa:
        war_visit = frappe.new_doc("Maintenance Visit")
        war_visit.customer = customer_name
        war_visit.custom_machine_id = machine
        war_visit.custom_warrantyamc = warranty_name
        war_visit.mntc_date = row['planned_service_date']
        war_visit.completion_status = 'Unscheduled'
        war_visit.maintenance_type = "Warranty"

        machine2 = frappe.get_doc("Machine", machine)
        war_visit.append("purposes", {
            'item_name': machine2.indoor_model,
            'custom_serial_number': machine2.indoor_serial_no
        })
        war_visit.append("purposes", {
            'item_name': machine2.outdoor_model,
            'custom_serial_number': machine2.outdoor_serial_no
        })
        print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        war_visit.save()


    # warranty_id=frappe.get_doc("Warranty",warranty_name)
    frappe.db.set_value("Warranty",warranty_name,'custom_maintenance_visit_created','1')
    frappe.db.commit()
            # doc = frappe.get_doc('Warranty', warranty_name)
            # for i in doc.table_hsoa:
            #     dt = str(i.planned_service_date)
            #     if dt == row['planned_service_date']:
            #         # i.completed = 1
            #         pass
            # doc.save()

        # No need to break unless you only want to process the first row
    # except Exception as e:
    #     frappe.log_error(frappe.get_traceback(), 'Warranty Maintenance Error')
    #     raise e





@frappe.whitelist()
def amc_maintenance(machine, warranty_name, customer_name, table_hsoa):
    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    table_hsoa = json.loads(table_hsoa)
    for row in table_hsoa:
        war_visit = frappe.new_doc("Maintenance Visit")
        war_visit.customer = customer_name
        war_visit.custom_machine_id = machine
        war_visit.custom_warrantyamc = warranty_name
        war_visit.mntc_date = row['planned_service_date']
        war_visit.completion_status = 'Unscheduled'
        war_visit.maintenance_type = "AMC"

        machine2 = frappe.get_doc("Machine", machine)
        war_visit.append("purposes", {
            'item_name': machine2.indoor_model,
            'custom_serial_number': machine2.indoor_serial_no
        })
        war_visit.append("purposes", {
            'item_name': machine2.outdoor_model,
            'custom_serial_number': machine2.outdoor_serial_no
        })
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        war_visit.save()


    print(warranty_name,"^^^^^^^^^^^^^")
    frappe.db.set_value("AMC",warranty_name,'custom_created','1')
    frappe.db.commit()






def cancel(doc,events):
    st1=doc.mntc_date
    warranty=frappe.get_doc("Warranty",{'machine':doc.custom_machine_id})
    for i in warranty.table_hsoa:
            dt1=i.planned_service_date
            if st1==dt1:
                # i.completed=0
                pass
    warranty.save()




def warranty(doc,events):
    if doc.maintenance_type=="Warranty":
        war_id=doc.custom_warrantyamc
        warranty=frappe.get_doc("Warranty",war_id)
        warranty.append("table_vube",{
            'link_wdce':doc.name
        })
        warranty.save()

    elif doc.maintenance_type=="AMC":
         amc_id=doc.custom_warrantyamc
         amc=frappe.get_doc("AMC",amc_id)
         amc.append("custom_label",{
              'link_wdce':doc.name
         })
         amc.save()




def warranty_cancel(doc,events):
    index = 0
    rows_to_remove = []
    war_id=doc.custom_warrantyamc
    warranty=frappe.get_doc("Warranty",war_id)

    for row in warranty.table_vube:

        print(row.link_wdce,doc.name,"***************")
        if row.link_wdce==doc.name:
             rows_to_remove.append(row)
             print(row.link_wdce,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")


    for row in rows_to_remove:
            warranty.table_vube.remove(row)
            print("completed")


    for row in warranty.table_vube:
            row.idx = index
            index += 1
            print("dfmdf")
    warranty.save()




    index1 = 0
    rows_to_remove1 = []

    amc_id=doc.custom_warrantyamc
    amc=frappe.get_doc("AMC",amc_id)

    for row in amc.table_vube:

        if row.link_wdce==doc.name:
             rows_to_remove1.append(row)
             print(row.link_wdce,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")


    for row in rows_to_remove1:
            amc.table_vube.remove(row)
            print("completed")


    for row in amc.table_vube:
            row.idx = index1
            index1 += 1
            print("dfmdf")
    amc.save()