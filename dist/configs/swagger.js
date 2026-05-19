import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi, } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
extendZodWithOpenApi(z);
export const registry = new OpenAPIRegistry();
registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
});
export const SwaggerSuccessResponseSchema = (dataSchema) => z.object({
    statusCode: z.number(),
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
});
export const SwaggerErrorResponseSchema = z.object({
    statusCode: z.number(),
    success: z.literal(false),
    message: z.string(),
    errors: z.array(z.unknown()).optional(),
});
export const generateSwaggerDocumentation = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: 'BlogMania API',
            version: '1.0.0',
            description: 'REST API documentation for BlogMania backend',
        },
        servers: [{ url: '/api', description: 'Local server' }],
    });
};
