<template>
  <form @submit.prevent="createTodoList">
    <div class="flex gap-1">
      <UInput
        v-model="title"
        class="w-full"
        type="text"
        placeholder="New Todo List Item"
        required
      />

      <UButton type="submit">Created</UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { UInput } from '#components';
const { getTodo } = useTodo();
const props = defineProps<{ todoId: string }>();
const title = ref("");

const currentTodo = getTodo(props.todoId);
const createTodoList = () => {
    currentTodo.addItem(title.value);
  title.value = "";
};
</script>

<style scoped></style>
