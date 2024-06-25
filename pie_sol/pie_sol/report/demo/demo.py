import frappe
from frappe.utils import flt

def execute(filters=None):
    columns, data = [], []
    columns = get_columns(filters)
    data = get_data(filters)
    
    return columns, data

def get_columns(filters):
    columns = [
        {
            "fieldname": "party_type",
            "label": "Party Type",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "fieldname": "party",
            "label": "Party",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 150
        },
        {
            "fieldname": "opening_balance",
            "label": "Opening Balance",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "fieldname": "invoiced_amount",
            "label": "Invoiced Amount",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "fieldname": "paid_amount",
            "label": "Paid Amount",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "fieldname": "closing_balance",
            "label": "Closing Balance",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "fieldname": "negative_closing_balance",
            "label": "Negative Closing Balance",
            "fieldtype": "Currency",
            "width": 150
        }
    ]
    
    # Add Debit Note column for Supplier
    if filters.get('party_type') == 'Supplier':
        columns.append({
            "fieldname": "debit_note",
            "label": "Debit Note",
            "fieldtype": "Currency",
            "width": 150
        })
    
    # Add Credit Note column for Customer
    if filters.get('party_type') == 'Customer':
        columns.append({
            "fieldname": "credit_note",
            "label": "Credit Note",
            "fieldtype": "Currency",
            "width": 150
        })
	
    return columns

def get_data(filters):
    party_type = filters.get('party_type')
    parties = filters.get('party')
    from_date = filters.get('from_date')
    to_date = filters.get('to_date')
    
    # If parties is None or empty, retrieve data for all parties of the specified party type
    if not parties:
        parties = get_all_parties(party_type)
    
    # Initialize data list to store results for all parties
    all_data = []
    
    for party in parties:
        opening_balance = get_opening_balance(party_type, party, from_date)
        closing_balance = get_closing_balance(party_type, party, to_date)
        invoiced_amount = get_invoiced_amount(party_type, party, from_date, to_date)
        paid_amount = get_paid_amount(party_type, party, from_date, to_date)

        positive_closing_balance = closing_balance if closing_balance > 0 else 0.0
        negative_closing_balance = closing_balance if closing_balance < 0 else 0.0
        
        # Initialize debit note and credit note to zero
        debit_note = 0.0
        credit_note = 0.0
        
        # Calculate debit note for Supplier
        if party_type == 'Supplier':
            debit_note = get_debit_note(party, from_date, to_date)
        
        # Calculate credit note for Customer
        if party_type == 'Customer':
            credit_note = get_credit_note(party, from_date, to_date)
        
        # Append data for the current party to the all_data list
        all_data.append({
            'party_type': party_type,
            'party': party,
            'opening_balance': opening_balance,
            'closing_balance': positive_closing_balance,
            'negative_closing_balance': negative_closing_balance,
            'invoiced_amount': invoiced_amount,
            'paid_amount': paid_amount,
            'debit_note': debit_note,
            'credit_note': credit_note
        })
    
    return all_data

def get_all_parties(party_type):
    if party_type == 'Customer':
        return frappe.get_all('Customer', filters={'disabled': 0}, pluck='name')
    elif party_type == 'Supplier':
        return frappe.get_all('Supplier', filters={'disabled': 0}, pluck='name')
    else:
        return []

def get_opening_balance(party_type, party, date):
    opening_balance = frappe.db.sql("""
        SELECT SUM(debit) - SUM(credit) 
        FROM `tabGL Entry` 
        WHERE party_type=%s AND party IN %s AND posting_date < %s
    """, (party_type, tuple(party), date))

    return flt(opening_balance[0][0]) if opening_balance and opening_balance[0][0] else 0.0

def get_closing_balance(party_type, party, date):
    closing_balance = frappe.db.sql("""
        SELECT SUM(debit) - SUM(credit) 
        FROM `tabGL Entry` 
        WHERE party_type=%s AND party IN %s AND posting_date <= %s
    """, (party_type, tuple(party), date))

    return flt(closing_balance[0][0]) if closing_balance and closing_balance[0][0] else 0.0

def get_invoiced_amount(party_type, party, from_date, to_date):
    invoiced_amount = frappe.db.sql("""
        SELECT SUM(debit) 
        FROM `tabGL Entry` 
        WHERE party_type=%s AND party IN %s AND posting_date BETWEEN %s AND %s
    """, (party_type, tuple(party), from_date, to_date))
    
    return flt(invoiced_amount[0][0]) if invoiced_amount and invoiced_amount[0][0] else 0.0




def get_paid_amount(party_type, party, from_date, to_date):
    paid_amount = frappe.db.sql("""
        SELECT SUM(credit) 
        FROM `tabGL Entry` 
        WHERE party_type=%s AND party IN %s AND posting_date BETWEEN %s AND %s
    """, (party_type, tuple(party), from_date, to_date))

    return flt(paid_amount[0][0]) if paid_amount and paid_amount[0][0] else 0.0




def get_debit_note(party, from_date, to_date):
    
    debit_note = frappe.db.sql("""
        SELECT SUM(total) 
        FROM `tabPurchase Invoice` 
        WHERE supplier IN %s AND posting_date BETWEEN %s AND %s AND is_return = 1
    """, (tuple(party), from_date, to_date))

    

    return flt(debit_note[0][0]) if debit_note and debit_note[0][0] else 0.0





def get_credit_note(party, from_date, to_date):
    credit_note = frappe.db.sql("""
        SELECT SUM(total) 
        FROM `tabSales Invoice` 
        WHERE customer IN %s AND posting_date BETWEEN %s AND %s AND is_return = 1
    """, (tuple(party), from_date, to_date))

    return flt(credit_note[0][0]) if credit_note and credit_note[0][0]else 0.0

