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
  
}

</script>
