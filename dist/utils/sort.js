export const isAllowedSortField = (field, validFields) => {
    return !!field && validFields.includes(field);
};
