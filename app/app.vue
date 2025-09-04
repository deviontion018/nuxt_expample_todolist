<template>
  <div>
   <UApp>
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
   </UApp>
     
  </div>
</template>

<script setup lang="ts">
if (import.meta.client) {
 await callOnce(async () => {
  const { loadTodoListFromLocalStorage } = useTodo();
  loadTodoListFromLocalStorage();
});

await callOnce(async () => {
  const { getCurrentUser } = useUser();
  // load user info from local storage or other persistent storage if needed
  await getCurrentUser();
})
  
}

</script>
