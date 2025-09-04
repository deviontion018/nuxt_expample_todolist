<template>
    <div class="p-3 text-gray-700">
        <nav>
            <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">

                <ul>
                    <div class="flex item-center justify-between">

                        <li><NuxtLink class="font-bold text-lg text-blue-600 underline" to="/">Home</NuxtLink></li>
                        <template v-if="!user">

                            <div class="flex justify-between gap-2">
                                
                                <li><NuxtLink class="font-bold text-lg text-blue-600 underline" to="/login">Login</NuxtLink></li>
                                <li><NuxtLink class="font-bold text-lg text-blue-600 px-2 py-1 rounded-md hover:bg-blue-800" to="/sign-up">Sign Up</NuxtLink></li>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex justify-between gap-2">
                                <li class="font-bold text-lg">Hello, {{ user.email }}</li>
                                <li><UButton color="secondary" @click="onLogout">Logout</UButton></li>
                            </div>
                        </template>
                    </div>
                    </ul>
            </div>
            </nav>
        <main class="mt-4">
            <div class="max-w-md mx-auto">

                <slot/>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const { user, logout } = useUser();
const toast = useToast();
const onLogout = async () => {
    try {
        await logout();
        toast.add({title: 'Logout successful!', color: 'success',duration: 3000});
        await navigateTo('/login');
    } catch (error) {
        
        toast.add({title: (error as Error)?.message || 'Error during logout', color: 'error',duration: 3000});
    }
}

</script>
