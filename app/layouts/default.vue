<template>
    <div class="p-3 text-gray-700">
        <nav>
            <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">

                <ul>
                    <li><NuxtLink class="font-bold text-lg text-blue-600 underline" to="/">Home</NuxtLink></li>
                  
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

</script>
