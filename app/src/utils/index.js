export const findUser = (users,id) => {
    return users.find((user) => user.id === id)?.name || "N/A";
};

export const valueFormatted = (valor) => {
    const newValue = parseInt(valor, 10);
    return newValue.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
};

export const findRole = (roles,id) => {
    return roles.find((role) => role.id === id)?.name || "N/A";
};
