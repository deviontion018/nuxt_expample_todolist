import { z } from 'zod';

const schema = z.object({
    id: z.string().min(1),
    title: z.string().min(1).max(255),
});

export default defineEventHandler(async (event) => {
    const user = await getCurrentUser(event);
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
    const body = await readBody(event);
    const parsed = await schema.safeParseAsync(body);
    if (parsed.error) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid request body', data: parsed.error });
    }
    const { id, title } = parsed.data;
    const result = await prisma.todoList.update({
        where: { id },
        data: { title },
    });
    return  { result };
    })