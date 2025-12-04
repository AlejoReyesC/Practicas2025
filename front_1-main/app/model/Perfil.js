Ext.define('Tutorial.model.Perfil', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'descripcion', type: 'string' }
    ]
});
