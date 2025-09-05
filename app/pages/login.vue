<template>
    <div class="max-w-xs mx-auto">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <form  @submit.prevent="onLogin">
            <div class="flex flex-col gap-1">
             <UFormField label="Email" class="mb-4">
                    <UInput
                    v-model="input.email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="w-full"
                    />
                </UFormField>
            
                <UFormField label="Password" class="mb-4">
                    <UInput
                    v-model="input.password"
                    type="password"
                    name="password"
                    placeholder="******************"
                        class="w-full"
                    />
                </UFormField>
               
                <div class="mt-3">
                    
                    <UButton
                    type="submit"
                    block
                    :loading="loading"
                    >
                    Login
                </UButton>
            </div>
        </div>
            
        </form>
    </div>
</template>

<script setup lang="ts">
import { UInput } from '#components';

const input = ref({
   
        email: '',
        password: ''
    });

const toast = useToast();
const { login } = useUser();
const loading = ref(false);

const onLogin = async () => {
    // Implement sign-up logic here
    loading.value = true;
    try {
        const data  = await login(input.value.email, input.value.password);
        toast.add({title: `Login successful! on email ${data.user.email}`, color: 'success',duration: 3000});
        await navigateTo('/');
    } catch (error) {
         toast.add({title: (error as Error)?.message || 'Error during login', color: 'error',duration: 3000});
         return;
    }
    finally {
        loading.value = false;
    }
   
};

</script>

<style scoped>

</style>