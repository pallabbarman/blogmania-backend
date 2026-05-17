export const isAllowedSortField = <T extends string>(
    field: string | undefined,
    validFields: readonly T[]
): field is T => {
    return !!field && validFields.includes(field as T);
};
