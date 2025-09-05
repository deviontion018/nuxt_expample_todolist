import { z } from 'zod';

const schema = z.object({
    todoListId: z.string(),
    title: z.string().min(1).max(255)
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
    const { todoListId, title } = parsed.data;
    const count = await prisma.todoList.count({
        where: { id : todoListId, userId: user.id },
    });
    if (count === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Todo list not found' });
    }
    const result = await prisma.todoListItem.create({
        data: {
            title,
            // todoList: { connect: { id } },
            todoListId: todoListId,
        },
    });
    return  { result };
});