/**
 * GRID DE USUARIOS
 */
Ext.define('Tutorial.view.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',

    title: '👥 Gestión de Usuarios - CRUD Completo',
    frame: true,

    store: {
        type: 'users'
    },

    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'center',
            renderer: function (value) {
                return '<span style="font-weight: bold; color: #667eea;">#' + value + '</span>';
            }
        },
        {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1,
            sortable: true,
            renderer: function (value) {
                return '<i class="fa fa-user"></i> ' + value;
            }
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1,
            sortable: true,
            renderer: function (value) {
                return '<i class="fa fa-envelope"></i> ' + value;
            }
        },
        {
            text: 'Edad',
            dataIndex: 'edad',
            width: 80,
            align: 'center',
            sortable: true,
            renderer: function (value) {
                return '<i class="fa fa-birthday-cake"></i> ' + value;
            }
        },

        //------------------------------------------------------------------
        // ⭐ NUEVA COLUMNA DE ACCIONES – 100% FUNCIONAL CON HTML+FONTAWESOME
        //------------------------------------------------------------------
        {
            text: 'Acciones',
            width: 120,
            align: 'center',

            renderer: function (value, meta, record) {

                // Permitir HTML completo en la celda
                meta.tdAttr = 'data-qtip="Acciones disponibles"';

                return `
                    <span class="action-edit" 
                          style="cursor:pointer; margin-right:12px; color:#4CAF50; font-size:18px;">
                        <i class="fa fa-edit"></i>
                    </span>

                    <span class="action-delete"
                          style="cursor:pointer; color:#F44336; font-size:18px;">
                        <i class="fa fa-trash"></i>
                    </span>
                `;
            },

            listeners: {
                click: 'onActionClick'
            }
        }
    ],

    // ---------------------------------------------------------
    // TOOLBAR SUPERIOR
    // ---------------------------------------------------------
    tbar: [
        {
            text: 'Nuevo Usuario',
            iconCls: 'fa fa-plus',
            handler: 'onNewUser',
            ui: 'default',
            scale: 'medium'
        },
        '-',
        {
            text: 'Recargar',
            iconCls: 'fa fa-refresh',
            handler: 'onReload',
            scale: 'medium'
        },
        '->',
        {
            xtype: 'textfield',
            reference: 'searchField',
            emptyText: 'Buscar...',
            width: 200,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearch'
            }
        }
    ],

    // ---------------------------------------------------------
    // PAGINACIÓN
    // ---------------------------------------------------------
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando usuarios {0} - {1} de {2}',
        emptyMsg: 'No hay usuarios para mostrar'
    },

    // ---------------------------------------------------------
    // EVENTOS DEL GRID
    // ---------------------------------------------------------
    listeners: {
        itemdblclick: 'onEditUser'
    },

    // ---------------------------------------------------------
    // CONTROLLER COMPLETO Y CORREGIDO
    // ---------------------------------------------------------
    controller: {

        //----------------------------------------------------
        // CREAR
        //----------------------------------------------------
        onNewUser: function () {
            var form = Ext.create('Tutorial.view.UserForm', {
                isEdit: false
            });

            form.on('usersaved', this.onReload, this);
            form.show();
        },

        //----------------------------------------------------
        // ACCIONES (Detecta clic en iconos)
        //----------------------------------------------------
        onActionClick: function (view, cell, cellIndex, record, row, rowIndex, e) {

            const target = e.target;

            if (target.closest('.action-edit')) {
                this.onEditUser(view, record);
                return;
            }

            if (target.closest('.action-delete')) {
                this.onDeleteUser(view, rowIndex, cellIndex, null, e, record);
                return;
            }
        },

        //----------------------------------------------------
        // EDITAR
        //----------------------------------------------------
        onEditUser: function (grid, record) {
            var form = Ext.create('Tutorial.view.UserForm', {
                isEdit: true,
                record: record
            });

            form.on('usersaved', this.onReload, this);
            form.show();
        },

        //----------------------------------------------------
        // ELIMINAR (Confirmación)
        //----------------------------------------------------
        onDeleteUser: function (grid, rowIndex, colIndex, item, e, record) {
            var me = this;

            Ext.Msg.confirm(
                'Confirmar eliminación',
                '¿Eliminar a <b>' + record.get('nombre') + '</b>?',
                function (button) {
                    if (button === 'yes') {
                        me.deleteUser(record);
                    }
                }
            );
        },

        //----------------------------------------------------
        // EJECUTAR DELETE
        //----------------------------------------------------
        deleteUser: function (record) {
            var me = this,
                grid = me.getView(),
                id = record.get('id');

            grid.setLoading('Eliminando...');

            Ext.Ajax.request({
                url: 'http://localhost:8080/api/users/' + id,
                method: 'DELETE',

                success: function () {
                    grid.setLoading(false);
                    Ext.Msg.alert('Éxito', 'Usuario eliminado correctamente');
                    me.onReload();
                },

                failure: function (response) {
                    grid.setLoading(false);
                    Ext.Msg.alert('Error', 'No se pudo eliminar: ' + response.statusText);
                }
            });
        },

        //----------------------------------------------------
        // RECARGAR
        //----------------------------------------------------
        onReload: function () {
            var store = this.getView().getStore();
            store.clearFilter();
            store.load();
        },

        //----------------------------------------------------
        // BUSCAR (Filtrado local)
        //----------------------------------------------------
        onSearch: function (field) {
            var store = this.getView().getStore(),
                value = field.getValue();

            store.clearFilter();

            if (value) {
                var search = value.toLowerCase();
                store.filterBy(function (rec) {
                    return (
                        rec.get('nombre').toLowerCase().includes(search) ||
                        rec.get('email').toLowerCase().includes(search)
                    );
                });
            }
        }
    }
});
