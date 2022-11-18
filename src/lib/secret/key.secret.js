require('dotenv').config();

module.exports = {
    system: {
        name: "EVA Backend",
        author: "CUDESI S.A.C"
    },

    database: {
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    },

    user: {
        name: 'Usuario',
        name_table: 'sv_user',
    },

    user_rol: {
        name: "Usuario y Rol",
        name_table: "sv_user_rol"
    },

    rol: {
        name: "Rol",
        name_table: "sv_rol"
    },

    access_rol: {
        name: "Acceso",
        name_table: "sv_access_rol"
    },

    access: {
        name: "Acceso",
        name_table: "sv_access"
    },

    user_access: {
        name: "Usuario y Acceso",
        name_table: "sv_user_access"
    },

    payment_method: {
        name: "Metodo de pago",
        name_table: "sv_payment_method"
    },

    document_type: {
        name: "Tipo de documento",
        name_table: "sv_document_type"
    },

    sale_type: {
        name: "Tipo de venta",
        name_table: "sv_sale_type"
    },

    exchange_rate: {
        name: "Tipo de cambio",
        name_table: "sv_exchange_rate"
    },

    document: {
        name: "Documento",
        name_table: "sv_document"
    },

    person: {
        name: "Persona",
        name_table: "sv_person"
    },

    person_type: {
        name: "Tipo de Persona",
        name_table: "sv_person_type"
    },

    person_user: {
        name: "Persona Usuario",
        name_table: "sv_person_user"
    },

    category: {
        name: "Categoria",
        name_table: "sv_category"
    },

    product: {
        name: "Producto",
        name_table: "sv_product"
    },

    stock: {
        name: "Stock",
        name_table: "sv_stock"
    },

    type_discount: {
        name: "Tipo de descuento",
        name_table: "sv_type_discount"
    },

    discounts: {
        name: "Descuento",
        name_table: "sv_discounts"
    },

    product_details: {
        name: "Detalle de producto",
        name_table: "sv_product_details"
    },

    sales: {
        name: "Venta",
        name_table: "sv_sales"
    },
    sales_product: {
        name: "Venta y Producto Detalle",
        name_table: "sv_sales_product"
    },

    sales_description: {
        name: "Descripcion de venta",
        name_table: "sv_sales_description"
    },

    logs: {
        name: "Log",
        name_table: "sv_logs"
    },

    configuration: {
        name: "Configuración",
        name_table: "sv_configuration"
    },

    type_ticket: {
        name: "Tipo de ticket",
        name_table: "sv_type_ticket"
    },

    status_ticket: {
        name: "Estado de ticket",
        name_table: "sv_status_ticket"
    },

    ticket: {
        name: "Ticket",
        name_table: "sv_ticket"
    },

    history_ticket: {
        name: "History ticket",
        name_table: "sv_ticket_history"
    },

    evidence: {
        name: "Evidence",
        name_table: "sv_evidence"
    },

    order: {
        name: "Pedidos",
        name_table: "sv_orders"
    },

    order_detail: {
        name: "Detalle de pedidos",
        name_table: "sv_order_details"
    },

    order_type: {
        name: "Tipo de Pedido",
        name_table: "sv_order_type"
    },

    client: {
        name: "Cliente",
        name_table: "sv_client"
    },

    clasification: {
        name: "Clasificación",
        name_table: "sv_clasification"
    },

    group: {
        name: "Grupo",
        name_table: "sv_group"
    },

    trademark: {
        name: "Marca",
        name_table: "sv_trademark"
    },

    promotions: {
        name: "Promociones",
        name_table: "sv_promotions"
    },

    message: {
        name: "Mensaje",
        name_table: "sv_message"
    },

    listprice: {
        name: "Lista dePrecios",
        name_table: "sv_price_list"
    },

    discounts_detail: {
        name: "Detalle del descuento",
        name_table: "sv_discount_detail"
    },

    company: {
        name: "Company",
        name_table: "sv_company"
    },

    template: {
        name: "plantilla de comprobante de pagos",
        name_table: "sv_template"
    },
    config: {
        name: "configuracion de impresora",
        name_table: "sv_config"
    },
    kardex: {
        name: "kardex",
        name_table: "sv_kardex"
    },
    provider: {
        name: "proveedor",
        name_table: "sv_client"
    },
    metodo_pago: {
        name: "metodo de pago",
        name_table: "sv_metodo_pago"
    },
    remission: {
        name: "guia de remision",
        name_table: "sv_remission"
    },
    remission_details: {
        name: "detalle de guias de remision",
        name_table: "sv_remission_details"
    },
    stock_details: {
        name: "detalle de stock",
        name_table: "sv_stock_details"
    },
    point_sale: {
        name: "punto de venta",
        name_table: "sv_point_sale"
    },
    user_pointsale: {
        name: "usuario y punto de venta",
        name_table: "sv_user_pointsale"
    },
    order_steps: {
        name: "pasos de venta online",
        name_table: "sv_order_steps"
    },
    codebar_config: {
        name: "configuracion del codigo de barras",
        name_table: "sv_codebar_config"
    },
    product_config_detail: {
        name: "configuracion del detalle de producto",
        name_table: "sv_product_config_detail"
    },
    cash_register: {
        name: "caja",
        name_table: "sv_cash_register"
    },
    cash_detail: {
        name: "detalle de caja",
        name_table: "sv_cash_detail"
    },
    external_products: {
        name : 'productos externos',
        name_table: 'sv_external_products'
    },
    kardex: {
        name: "kardex",
        name_table: "sv_kardex"
    },
}