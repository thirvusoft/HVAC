frappe.ui.form.on("Territory", {
    custom_area: function(frm) {
        updateTerritoryName(frm);
    },

    custom_pincode: function(frm) {
        if (validatePincode(frm.doc.custom_pincode)) {
            updateTerritoryName(frm);
        } else {
            frappe.msgprint('Please enter a 6-digit pincode.');
            frm.set_value('custom_pincode', '');
        }
    }
});

function updateTerritoryName(frm) {
    if (frm.doc.custom_area && frm.doc.custom_pincode) {
        frm.set_value('territory_name', frm.doc.custom_area + '-' + frm.doc.custom_pincode);
    } else if (frm.doc.custom_area) {
        frm.set_value('territory_name', frm.doc.custom_area);
    } else if (frm.doc.custom_pincode) {
        frm.set_value('territory_name', frm.doc.custom_pincode);
    } else {
        frm.set_value('territory_name', '');
    }
}

function validatePincode(pincode) {
    // Check if pincode is exactly 6 digits
    return /^\d{6}$/.test(pincode);
}
