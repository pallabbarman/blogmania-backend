export const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    };
    res.status(data.statusCode).json(responseData);
};
export const sendPaginatedResponse = (res, data) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });
};
export const errorResponse = (statusCode, message, errors) => ({
    statusCode,
    success: false,
    message,
    errors,
});
