import { authClient } from '~~/utils/auth-client';
import type { H3Event } from 'h3';

export const getCurrentUser = async (event : H3Event) => {
 const headers =  await getHeaders(event);
 const session = await authClient.getSession({
    fetchOptions: {
        headers: {
           cookie: headers.cookie || '',
        },
    },
 });
 if (session.error || !session.data) {
    return null;
 }

    return session.data.user;
}