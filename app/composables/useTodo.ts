import { v4 as uuid } from 'uuid';

export interface TodoItem {
    id: string;
    title: string;
    done: boolean;
   
}

export interface TodoList {
    id: string;
    title: string;
    items: TodoItem[];
    isOnlineMode: boolean;
}
let todos: Ref<TodoList[]>;

export const useTodo = () => {
    if (!todos) {
         todos = useState<TodoList[]>('todos', () => []);

        // singleton pattern
        watch (todos, (newTodos) => {
            const offLineMode = newTodos.filter(t => !t.isOnlineMode);
            const data = JSON.stringify(offLineMode);
            localStorage.setItem('todos', data);
        
        }, { deep: true });
    }

    const { user } = useUser();
  
    const loadTodoListFromLocalStorage = () => {
        const data = localStorage.getItem('todos');
        if (data) {
            todos.value = JSON.parse(data);
        }
    };

    const loadTodoListFromOnline = async () => {
        if (!user.value) {
             return;
        }
         const result = await $fetch('/api/todos', {
                method: 'GET',
            });
        
            const offLineTodos = todos.value.filter(t => !t.isOnlineMode);
            todos.value = result.data.map((t) => ({
                id: t.id,
                title: t.title,
                items: t.items.map(i => ({
                    id: i.id,
                    title: i.title,
                    done: i.done,
                })),
                isOnlineMode: true,
            })).concat(offLineTodos);
    };

    const clearTodoListOnline = () => {
        todos.value = todos.value.filter(t => !t.isOnlineMode);
    }
    const addTodo = async (todo: string) => {
        if (user.value) {
            // Online mode
            // You can implement API call to create todo in the backend here
            const resultTodo = await $fetch('/api/todos/create', {
                method: 'POST',
                body: { title: todo },
            });
            todos.value.push({
                ...resultTodo.result,
                items: [],
                isOnlineMode: true,
            });
         
        }else{
            // Offline mode
            todos.value.push({
                id: uuid(),
                title: todo,
                items: [],
                isOnlineMode: user.value !== null,
            });
        }
    };

    const removeTodo = async (id: string) => {
            const todo = todos.value.find((t) => t.id === id);
            if (!todo) {
                return;
            }
        if (user.value && todo.isOnlineMode) {
            await $fetch('/api/todos', {
                method: 'DELETE',
                body: { id },
            });
        }
        todos.value = todos.value.filter((todo) => todo.id !== id);
    }

    const updateTodoTitle = async (id: string, newTitle: string) => {
          const todo = todos.value.find((t) => t.id === id);
            if (!todo) {
                return;
            }
        if (user.value && todo.isOnlineMode) {
          await $fetch('/api/todos/title', {
                method: 'PATCH',
                body: { id, title: newTitle },
            });
            
        } 
         todo.title = newTitle;
          
        
    };  

    const getTodo = (id: string) => {
        const todo = todos.value.find((t) => t.id === id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        const addItem = async (title: string) => {
            if (user.value && todo.isOnlineMode) {
                const { result } = await $fetch('/api/todos/items', {
                    method: 'POST', 
                    body: { todoListId: id, title },
                });
                todo.items.push({
                    id: result.id,
                    title: result.title,
                    done: result.done,
                });
                
            }else{
                // Offline mode
                todo.items.push({
                    id: uuid(),
                    title,
                    done: false,
                });
            }
        }

        const updateItemTitle = async (itemId: string, newTitle: string) => {
            // Find the item
            const item = todo.items.find((i) => i.id === itemId);
            if (!item) {
                return;
            }
            if (user.value && todo.isOnlineMode) {
                await $fetch('/api/todos/items/title', {
                    method: 'PATCH',
                    body: { todoListItemId: itemId, title: newTitle },
                });
            }
            item.title = newTitle;
        }

        const markItemAsDone = async (itemId: string) => {
            // Find the item
            const item = todo.items.find((i) => i.id === itemId);
            if (!item) {
               return;
            }
            if (user.value && todo.isOnlineMode) {
                await $fetch('/api/todos/items/done', {
                    method: 'PATCH',
                    body: { todoListItemId: itemId, done: true },
                });
            }
             item.done = true;
        }

        const markItemAsUndone = async (itemId: string) => {
            // Find the item
            const item = todo.items.find((i) => i.id === itemId);
            if (!item) {
               return;
            }
            if (user.value && todo.isOnlineMode) {
              await  $fetch('/api/todos/items/done', {
                    method: 'PATCH',
                    body: { todoListItemId: itemId, done: false },
                });
            }
             item.done = false;
        }

        const removeItem = async (itemId: string) => {
            // Find the item
            const item = todo.items.find((i) => i.id === itemId);
            if (!item) {
               return;
            }
            if (user.value && todo.isOnlineMode) {
               await $fetch('/api/todos/items', {
                    method: 'DELETE',
                    body: { todoListItemId: itemId },
                });
            }
            todo.items = todo.items.filter((i) => i.id !== itemId);
        }

        return { todo, addItem , updateItemTitle, removeItem, markItemAsDone, markItemAsUndone };
    }
    const syncTodo = async (id: string) => {
        const { todo } = getTodo(id);
        if (todo.isOnlineMode) {
           return;
        }
        // Call your sync API here
        const { message } = await $fetch('/api/todos/sync', {
                method: 'POST',
                body: todo,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        todo.isOnlineMode = true; 
        return { message };
    }

    return { todos, addTodo, removeTodo , updateTodoTitle, getTodo, loadTodoListFromLocalStorage, syncTodo, loadTodoListFromOnline, clearTodoListOnline };
};