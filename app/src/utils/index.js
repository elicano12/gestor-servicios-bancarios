export const valueFormatted = (valor) => {
    const newValue = parseInt(valor, 10);
    return newValue.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
};