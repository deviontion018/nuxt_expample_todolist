<template>
  <UModal 
  v-model:open="isOpen"
  :title="props.headerTitle"
  :close="{
    color: 'primary',
    variant: 'outline',
    class: 'rounded-full cursor-pointer',
  }"
  :ui="{
    content: 'max-w-sm',
  }">
  <slot/>
  
    <template #body>
    
        <form @submit.prevent="onUpdated">
            <div class="flex-gap-1">

                <UInput
                v-model="title"
                class="w-full my-2"
                type="text"
                :placeholder="props.placeHolder"
                required
                />
                <UButton type="submit"  class="cursor-pointer">Update</UButton>
            </div>
        </form>
      
    </template>
  </UModal>
</template>

<script setup lang="ts">
// const { updateTodoTitle } = useTodo();
const props = defineProps<{ headerTitle: string,previousTitle: string,placeHolder: string }>();
const emit = defineEmits<{
 updated: [newTitle: string]
}>();
const title = ref(props.previousTitle);

const onUpdated = () => {
  emit('updated', title.value);
    isOpen.value = false;
};
const  isOpen = ref(false);
</script>

<style scoped></style>
