import { prisma } from "~~/server/utils/prisma";
import { z } from "zod";


const schema = z.object({
    id: z.string(),
    title: z.string().min(1).max(100),
    items: z.array(z.object({
        id: z.string(),
        title: z.string().min(1).max(100),
        done: z.boolean(),
    })),
    isOnlineMode: z.boolean(),
});

export default  defineEventHandler(async (event) => {
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
    const count = await prisma.todoList.count({
        where: { id: data.id }
    });
    if (count > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: `Todo list already exists`,
        });
    }
    await prisma.todoList.create({
        data: {
            id: data.id,
            title: data.title,
            userId: user.id,
            items: {
                createMany : {
                    data: data.items
                }
            },
        }
    })
    return { message: `Sync endpoint - to be implemented (ID: ${data.title})` };

});