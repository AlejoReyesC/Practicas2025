Ext.application({
    name: 'Tutorial',

    autoCreateViewport: false,   // explícito
    enableQuickTips: true,       // tooltips
    appFolder: 'app',            // estructura limpia

    requires: [
        'Tutorial.view.Main'
    ],

    launch: function () {
        console.log("🚀 ExtJS Iniciado Correctamente");

        Ext.create('Tutorial.view.Main');
    }
});

