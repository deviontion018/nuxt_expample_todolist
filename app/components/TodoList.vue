<template>
    <ClientOnly>

        <div>
            <ul v-if="todos.length > 0" class="flex flex-col gap-6">
                <li v-for="todo in todos" :key="todo.id" class="border border-gray-300 p-2 rounded-md  ">
                    <header class="flex justify-between ">
                        
                        <span class="font-bold text-lg">
                            
                            {{ todo.title }}
                        </span>
                        <div class="flex gap-0.5">
                            <ModalUpdateTitle header-title="Edit Todo List Title" :previous-title="todo.title" place-holder="Todo List Title" @updated="onTodoTitleUpdated(todo.id, $event)">
                                <UButton color="secondary" size="xs">Edit</UButton>
                            </ModalUpdateTitle>
                            
                            <ModalConfirm title="Are you sure to delete this todo list?" :description="`Todo list title: ${todo.title}`" confirm-color="error" @confirmed="onDeleteConfirmed(todo.id)">
                                <UButton color="error" size="xs">Delete</UButton>
                            </ModalConfirm>
                        </div>
                    </header>
                    <main class="mt-4">
                        <TodoListItem :todo="todo" />
                        <div class="mt-4">
                            <FormCreateTodoListItem :todo-id="todo.id" />
                        </div>
                    </main>
                </li>
                
            </ul>
            <p v-else class="italic text-center text-gray-500">No Todo List. Please create one.</p>
            <div class="bg-gray-300 p-4 rounded mt-6">
                <h2 class="font-bold text-lg mb-2">Create New Todo List</h2>
                <FormCreateTodoList />
            </div>
        </div>
    </ClientOnly>
    </template>

<script setup lang="ts">

const { todos, updateTodoTitle, removeTodo } = useTodo()

const onTodoTitleUpdated = (id: string, newTitle: string) => {
    updateTodoTitle(id, newTitle);
};

const onDeleteConfirmed = (id: string) => {
    removeTodo(id);

};

</script>

<style scoped>

</style>