Ext.define('Tutorial.view.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    layout: 'border',

    items: [

        // 🔹 MENÚ LATERAL
        {
            region: 'west',
            xtype: 'panel',
            id: 'side-menu',

            title: '<i class="fa fa-bars"></i> &nbsp; Menú',
            titleAlign: 'center',

            header: {
                style: "background:#1565c0; color:white; font-size:14px; font-weight:bold; padding:10px;"
            },

            width: 260,
            collapsible: true,
            collapsed: true,
            collapseMode: 'mini',
            split: true,

            layout: 'fit',
            bodyStyle: 'background:#ffffff; border-right:1px solid #ddd;',

            items: [
                {
                    xtype: 'dataview',
                    id: 'nav-list',
                    itemSelector: 'div.nav-item',
                    trackOver: true,
                    overItemCls: 'nav-hover',
                    selectedItemCls: 'nav-active',

                    tpl: new Ext.XTemplate(`
                        <tpl for=".">
                            <div class="nav-item" style="padding:10px 15px; cursor:pointer; display:flex; gap:10px; align-items:center;">
                                <i class="{icon}" style="width:16px;"></i>
                                <span>{text}</span>
                            </div>
                        </tpl>
                    `),

                    store: {
                        fields: ['text', 'view', 'icon'],
                        data: [
                            { text: 'Usuarios', view: 0, icon: 'fa fa-users' },
                            { text: 'Perfiles', view: 1, icon: 'fa fa-id-card' }
                        ]
                    },

                    listeners: {
                        itemclick: function (list, record) {
                            Ext.getCmp('main-content').setActiveItem(record.get('view'));
                        }
                    }
                }
            ]
        },

        // 🔹 BARRA SUPERIOR CON ICONO DE MENÚ
        {
            region: 'north',
            xtype: 'toolbar',
            height: 55,
            style: 'background:#1565c0; color:white; box-shadow:0 2px 5px rgba(0,0,0,0.2);',
            padding: '0 10',

            items: [
                {
                    xtype: 'button',
                    iconCls: 'fa fa-bars',
                    style: 'font-size:20px; color:white;',
                    handler: function () {
                        let menu = Ext.getCmp('side-menu');

                        if (menu.collapsed) {
                            menu.expand({ duration: 300 });
                        } else {
                            menu.collapse({ duration: 300 });
                        }
                    }
                },
                ' ',
                {
                    xtype: 'component',
                    html: '<span style="font-size:18px; font-weight:bold; color:white;">Mi Aplicación</span>'
                }
            ]
        },

        // 🔹 CONTENIDO PRINCIPAL
        {
            region: 'center',
            xtype: 'container',
            id: 'main-content',
            layout: 'card',
            items: [
                { xtype: 'usergrid' },
                { xtype: 'perfilgrid' }
                
            ]
        }
    ]
});
