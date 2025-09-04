import type { User } from "better-auth";
import { authClient } from "~~/utils/auth-client";

export const useUser = () => {
  const user = useState<User | null>("user", () => null);

  const getCurrentUser = async () => {
    try {
      const session = await authClient.getSession({
        fetchOptions: {
          headers: useRequestHeaders(["cookie"]),
        },
      });
      if (session.error || !session.data) {
        user.value = null;
        return;
      }
      user.value = session.data.user;
    } catch (error) {
      console.log("Error fetching user session:", error);
      user.value = null;
    }
  };
  const login = async (email: string, password: string) => {
    // Implement login logic if needed
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
        throw new Error(error.message || 'Error during login');
        
    }
    await getCurrentUser();
    
    return data;
  };
  const logout = async () => {
    // Implement logout logic if needed
    const { error } = await authClient.signOut();
    if (error) {
      throw new Error(error.message || 'Error during logout');
    }
    user.value = null;
   await navigateTo('/login');
  };

  return { user, getCurrentUser, login, logout };
};
