app_name = "pie_sol"
app_title = "pie-sol"
app_publisher = "pie-sol"
app_description = "pie-sol"
app_email = "pie-sol@gmail.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/pie_sol/css/pie_sol.css"
# app_include_js = "/assets/pie_sol/js/pie_sol.js"

# include js, css files in header of web template
# web_include_css = "/assets/pie_sol/css/pie_sol.css"
# web_include_js = "/assets/pie_sol/js/pie_sol.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "pie_sol/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}
# include js in doctype views
doctype_js = {
    "Item":"pie_sol/utils/js/brand.js",
    "Customer":"/pie_sol/utils/js/customer.js"
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "pie_sol/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "pie_sol.utils.jinja_methods",
# 	"filters": "pie_sol.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "pie_sol.install.before_install"
# after_install = "pie_sol.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "pie_sol.uninstall.before_uninstall"
# after_uninstall = "pie_sol.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "pie_sol.utils.before_app_install"
# after_app_install = "pie_sol.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "pie_sol.utils.before_app_uninstall"
# after_app_uninstall = "pie_sol.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "pie_sol.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	# "*": {
	# 	"on_update": "method",
	# 	"on_cancel": "method",
	# 	"on_trash": "method"
	"Machine":{
    # "setup":"pie_sol.pie_sol.utils.py.machine.machineentrysetup",
    "before_insert":["pie_sol.pie_sol.utils.py.machine.tableentry",],
    # "before_save":["pie_sol.pie_sol.utils.py.customer.customerservice","pie_sol.pie_sol.utils.py.customer.customerabb"]
    # "on_submit":"pie_sol.pie_sol.utils.py.customer.customerservice"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"pie_sol.tasks.all"
# 	],
# 	"daily": [
# 		"pie_sol.tasks.daily"
# 	],
# 	"hourly": [
# 		"pie_sol.tasks.hourly"
# 	],
# 	"weekly": [
# 		"pie_sol.tasks.weekly"
# 	],
# 	"monthly": [
# 		"pie_sol.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "pie_sol.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "pie_sol.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "pie_sol.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["pie_sol.utils.before_request"]
# after_request = ["pie_sol.utils.after_request"]

# Job Events
# ----------
# before_job = ["pie_sol.utils.before_job"]
# after_job = ["pie_sol.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"pie_sol.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

