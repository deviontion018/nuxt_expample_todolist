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
    await prisma.todoList.create({
        data: {
            id: data.id,
            title: data.title,
            items: {
                createMany : {
                    data: data.items
                }
            },
        }
    })
    return { message: `Sync endpoint - to be implemented (ID: ${data.title})` };

});