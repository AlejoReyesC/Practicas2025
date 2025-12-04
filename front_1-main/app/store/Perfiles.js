Ext.define('Tutorial.store.Perfiles', {
    extend: 'Ext.data.Store',
    alias: 'store.perfiles',

    model: 'Tutorial.model.Perfil',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'http://localhost:8080/api/perfiles', // endpoint que crearás en backend
        reader: {
            type: 'json',
            rootProperty: ''
        }
    }
});
