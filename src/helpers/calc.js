export const calculateAmount = (amount, rate) => {
    return Math.round(amount * (rate || null) * 100 + Number.EPSILON) / 100;
};
