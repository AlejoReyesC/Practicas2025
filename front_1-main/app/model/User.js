/**
 * MODELO DE USUARIO
 * 
 * En ExtJS, un Model define la estructura de los datos.
 * Es como un "esquema" que describe qué campos tiene cada usuario.
 * 
 * Aprenderás:
 * - Cómo definir campos (fields) y sus tipos
 * - Cómo configurar el identificador único (idProperty)
 */

Ext.define('Tutorial.model.User', {
    extend: 'Ext.data.Model',
    
    // El campo que sirve como identificador único
    idProperty: 'id',
    
    // Definición de los campos del modelo
    fields: [
        {
            name: 'id',
            type: 'int',
            // El ID no se puede editar, lo genera el servidor
            persist: false
        },
        {
            name: 'nombre',
            type: 'string',
            // Campo obligatorio
            allowNull: false
        },
        {
            name: 'email',
            type: 'string',
            allowNull: false
        },
        {
            name: 'edad',
            type: 'int',
            allowNull: false
        }
    ],
    
    // Validaciones (opcional pero recomendado)
    validators: {
        nombre: { type: 'presence', message: 'El nombre es obligatorio' },
        email: [
            { type: 'presence', message: 'El email es obligatorio' },
            { type: 'email', message: 'Email inválido' }
        ],
        edad: [
            { type: 'presence', message: 'La edad es obligatoria' },
            { type: 'range', min: 1, max: 120, message: 'Edad debe estar entre 1 y 120' }
        ]
    }
});
