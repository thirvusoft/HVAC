frappe.treeview_settings['Item Group'] = {
    post_render: function(treeview) {
        var me = frappe.views.trees['Item Group'];
        me.tree.load_children(me.tree.root_node, true);

    },
}