<template>
    <div>

        <ul class="flex flex-col gap-2">
            <li v-for="value in currentTodo.todo.items" :key="value.id">
                <div class="flex items-center gap-2">

                    <UCheckbox :model-value="value.done" @update:model-value="onToggleItem(value.id, $event)">
                        <template #label>
                            <span :class="{ 'line-through text-gray-500': value.done }">{{ value.title }}</span>
                            
                        </template>
                    </UCheckbox>
                      <ModalUpdateTitle header-title="Edit Todo List Item Title" :previous-title="value.title" place-holder="Todo List Item Title" @updated="onItemTitleUpdated(value.id, $event)">
                          
                          <Icon name="material-symbols:edit-square" class="cursor-pointer text-blue-500" size="1.2em"/>
                        </ModalUpdateTitle>
                            <ModalConfirm title="Are you sure to delete this todo list item?" :description="`Item title: ${value.title}`" confirm-color="error" @confirmed="onDeleteConfirmed(value.id)">
                            
                                <Icon name="material-symbols:delete-forever" class="cursor-pointer text-red-500" size="1.2em"/>
                        </ModalConfirm>
                </div>
                </li>
        </ul>
       
    </div>
</template>

<script setup lang="ts">
const { getTodo } = useTodo();
const props = defineProps<{ todo: TodoList }>();

const currentTodo = getTodo(props.todo.id)

const onToggleItem = (id: string, value: boolean | 'indeterminate') => {
    if (value === 'indeterminate') return;
    if (value === true) {
         currentTodo.markItemAsDone(id);
    } else {
        currentTodo.markItemAsUndone(id);
    }
 
    
};

const onItemTitleUpdated = (id: string, newTitle: string) => {
    currentTodo.updateItemTitle(id, newTitle);
};

const onDeleteConfirmed = (id: string) => {
    currentTodo.removeItem(id);
};

</script>

<style scoped>

</style>