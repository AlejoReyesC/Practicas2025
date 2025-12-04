Ext.define('Tutorial.view.PerfilGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.perfilgrid',

    title: '📌 Gestión de Perfiles',

    frame: true,

    store: {
        type: 'perfiles'
    },

    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Nombre del Perfil', dataIndex: 'nombre', flex: 1 },
        { text: 'Descripción', dataIndex: 'descripcion', flex: 2 }
    ]
});
