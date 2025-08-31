<template>
     <UModal 
    v-model:open="isOpen"
    :ui="{
      content: 'max-w-sm',
    }">
    <slot/>
     
      <template #content>
            <div class="p-4">
                <h2 class="font-bold mb-1">{{ props.title }}</h2>
                <p v-if="props.description">{{ props.description }}</p>
                <div class="flex justify-end gap-2">
                    <UButton type="submit" :color="confirmColor" class="cursor-pointer" @click="onConfirmed" >Confirm</UButton>
                    <UButton type="submit" color="secondary" class="cursor-pointer" @click="isOpen = false">Cancel</UButton>
                </div>
              </div>
        
      </template>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const props = defineProps<{ title: string, description: string, confirmColor?: 
  "error" | "primary" | "secondary" | "success" | "warning" | "info"
 }>();

 const emit = defineEmits<{
  confirmed: []
 }>();

 const onConfirmed = () => {
    emit('confirmed');
    isOpen.value = false;
 };

</script>

<style scoped>

</style>