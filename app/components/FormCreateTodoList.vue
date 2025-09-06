<template>
  <form @submit.prevent="createTodoList">
    <div class="flex gap-1">
      <UInput
        v-model="title"
        class="w-full"
        type="text"
        placeholder="New Todo List Title"
        required
      />

      <UButton type="submit" class="cursor-pointer">Created</UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { UInput } from '#components';
const { addTodo } = useTodo();
const title = ref("");

const createTodoList = () => {
 addTodo(title.value);
  title.value = "";
};
</script>

<style scoped></style>
