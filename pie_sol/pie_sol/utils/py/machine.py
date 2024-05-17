import frappe

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
            'model_type':'Outdoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })

        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })

        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
        })
        doc.append("item",
                {
            'model_type':'Outdoor Serial No',
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