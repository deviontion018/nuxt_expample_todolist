<template>
  <div>
   <UApp>
   <NuxtLoadingIndicator />
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
   </UApp>
     
  </div>
</template>

<script setup lang="ts">

await callOnce(async () => {
  const { getCurrentUser } = useUser();
  // load user info from local storage or other persistent storage if needed
  await getCurrentUser();
})
if (import.meta.client) {
 await callOnce(async () => {
  const { loadTodoListFromLocalStorage, loadTodoListFromOnline } = useTodo();
  const { user } = useUser();

  // always load from local storage first
  loadTodoListFromLocalStorage();

  if (user.value) {
    
    // only load from online if user is logged in
    await loadTodoListFromOnline();
    
  }

});


  
}

</script>
