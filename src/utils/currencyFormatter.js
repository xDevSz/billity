export const currencyFormatter = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return 'R$ 0,00';
    }
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};
