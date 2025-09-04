import { z } from 'zod';

const schema = z.object({
    title: z.string().min(1).max(100),
});

export default defineEventHandler(async (event) => {
    const user = await getCurrentUser(event);
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
    const body = await readBody(event);
    const parseResult = await schema.safeParseAsync(body);
    if (parseResult.error) {
        console.warn('Validation errors:',  parseResult.error);
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body',
        });
    }
    const data = parseResult.data;
    const result = await prisma.todoList.create({
        data: {
            title: data.title,
            userId: user.id,
        }
    });

    return { result };
});