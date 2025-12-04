/**
 * FORMULARIO DE USUARIO
 * 
 * Este formulario permite crear y editar usuarios.
 * 
 * Aprenderás:
 * - Cómo crear formularios en ExtJS
 * - Validación de campos
 * - Cómo guardar datos en el servidor (POST/PUT)
 */

Ext.define('Tutorial.view.UserForm', {
    extend: 'Ext.window.Window',

    alias: 'widget.userform',

    // Configuración de la ventana
    title: 'Nuevo Usuario',
    modal: true,
    width: 400,
    layout: 'fit',

    // Iconos
    iconCls: 'fa fa-user',

    // Variables para saber si estamos editando o creando
    isEdit: false,
    record: null,

    /**
     * Inicialización del componente
     */
    initComponent: function () {
        var me = this;

        // Si estamos editando, cambiar el título
        if (me.isEdit) {
            me.title = 'Editar Usuario';
        }

        // Definir los items (el formulario)
        me.items = [{
            xtype: 'form',
            reference: 'userForm',
            bodyPadding: 20,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 80,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    hidden: !me.isEdit,
                    value: me.record ? me.record.get('id') : ''
                },
                {
                    fieldLabel: 'Nombre',
                    name: 'nombre',
                    allowBlank: false,
                    blankText: 'El nombre es obligatorio',
                    emptyText: 'Ingrese el nombre completo'
                },
                {
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype: 'email',
                    allowBlank: false,
                    blankText: 'El email es obligatorio',
                    emptyText: 'ejemplo@email.com'
                },
                {
                    fieldLabel: 'Edad',
                    name: 'edad',
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1,
                    maxValue: 120,
                    blankText: 'La edad es obligatoria',
                    emptyText: 'Ingrese la edad'
                }
            ]
        }];

        // Botones de acción
        me.buttons = [
            {
                text: 'Cancelar',
                iconCls: 'fa fa-times',
                handler: function () {
                    me.close();
                }
            },
            {
                text: 'Guardar',
                iconCls: 'fa fa-save',
                formBind: true, // Solo se habilita si el formulario es válido
                handler: function () {
                    me.saveUser();
                }
            }
        ];

        me.callParent(arguments);

        // Si estamos editando, cargar los datos en el formulario
        if (me.isEdit && me.record) {
            var form = me.down('form').getForm();
            form.loadRecord(me.record);
        }
    },

    /**
     * Método para guardar el usuario
     * Hace una llamada POST (crear) o PUT (actualizar)
     */
    saveUser: function () {
        var me = this,
            form = me.down('form').getForm();

        // Validar el formulario
        if (!form.isValid()) {
            Ext.Msg.alert('Validación', 'Por favor complete todos los campos correctamente');
            return;
        }

        // Obtener los valores del formulario
        var values = form.getValues();

        // Mostrar loading
        me.setLoading('Guardando...');

        if (me.isEdit) {
            // ACTUALIZAR usuario existente (PUT)
            me.updateUser(values);
        } else {
            // CREAR nuevo usuario (POST)
            me.createUser(values);
        }
    },

    /**
     * CREAR - Método POST
     * Crea un nuevo usuario en el servidor
     */
    createUser: function (values) {
        var me = this;

        console.log('📤 POST - Creando nuevo usuario:', values);

        // Hacer la petición POST
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users',
            method: 'POST',
            jsonData: values,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log('✅ Usuario creado exitosamente:', result);

                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario creado correctamente', function () {
                    // Recargar el grid
                    me.fireEvent('usersaved');
                    me.close();
                });
            },
            failure: function (response) {
                console.error('❌ Error al crear usuario:', response);
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo crear el usuario: ' + response.statusText);
            }
        });
    },

    /**
     * ACTUALIZAR - Método PUT
     * Actualiza un usuario existente en el servidor
     */
    updateUser: function (values) {
        var me = this,
            id = me.record.get('id');

        console.log('📤 PUT - Actualizando usuario ID:', id, values);

        // Hacer la petición PUT
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users/' + id,
            method: 'PUT',
            jsonData: values,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log('✅ Usuario actualizado exitosamente:', result);

                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario actualizado correctamente', function () {
                    // Recargar el grid
                    me.fireEvent('usersaved');
                    me.close();
                });
            },
            failure: function (response) {
                console.error('❌ Error al actualizar usuario:', response);
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo actualizar el usuario: ' + response.statusText);
            }
        });
    }
});
