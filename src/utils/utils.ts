export const isdevelopment = import.meta.env.VITE_APP_ENV === 'development' ? true : false;

export const factura_iva = import.meta.env.VITE_FACTURA_IVA ?? undefined;