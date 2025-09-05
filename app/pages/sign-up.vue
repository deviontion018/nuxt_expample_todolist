
<template>
    <div class="max-w-xs mx-auto">
        <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
        <form  @submit.prevent="onSignUp">
            <div class="flex flex-col gap-1">

                <UFormField label="Full Name" class="mb-4">
                    
                    <UInput
                    v-model="input.name"
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    class="w-full"
                    />
                </UFormField>

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
                    Sign Up
                </UButton>
            </div>
        </div>
            
        </form>
    </div>
</template>

<script setup lang="ts">
import { UInput } from '#components';
import { authClient } from '~~/utils/auth-client'

const input = ref({
        name: '',
        email: '',
        password: ''
    });

const toast = useToast();
const loading = ref(false);

const onSignUp = async () => {
    // Implement sign-up logic here
    loading.value = true;
    try {
           const { data, error } = await authClient.signUp.email({
                ...input.value
            });
            if (error) {
                toast.add({title: error.message || 'Error during sign-up', color: 'error',duration: 3000});
                return;
            } 
            toast.add({title: `Sign-up successful! You can now log in with ${data.user.email}.`, color: 'success',duration: 3000});
            await navigateTo('/login');
    } catch (error) {
            toast.add({title: (error as Error)?.message || 'Error during sign-up', color: 'error',duration: 3000});
           
    } finally {
        loading.value = false;
    }

};

</script>

<style scoped>

</style>