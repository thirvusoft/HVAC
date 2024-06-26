import frappe


def area_pincode(doc,events):
    area=doc.custom_area
    pincode=doc.custom_pincode
    name=area+"-"+str(pincode)
    print(name,"********************")
    doc.custom_name=name