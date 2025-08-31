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
}
let todos: Ref<TodoList[]>;

export const useTodo = () => {
    if (!todos) {
         todos = useState<TodoList[]>('todos', () => []);

        // singleton pattern
        watch (todos, (newTodos) => {
            const data = JSON.stringify(newTodos);
            localStorage.setItem('todos', data);
        
        }, { deep: true });
    }
    

    const loadTodoListFromLocalStorage = () => {
        const data = localStorage.getItem('todos');
        if (data) {
            todos.value = JSON.parse(data);
        }
    };
    const addTodo = (todo: string) => {
        todos.value.push({
            id: uuid(),
            title: todo,
            items: [],
        });
    };

    const removeTodo = (id: string) => {
        todos.value = todos.value.filter((todo) => todo.id !== id);
    }

    const updateTodoTitle = (id: string, newTitle: string) => {
       const todo = todos.value.find((t) => t.id === id);
       if (todo) {
           todo.title = newTitle;
       }
    };  

    const getTodo = (id: string) => {
        const todo = todos.value.find((t) => t.id === id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        const addItem = (title: string) => {
            todo.items.push({
                id: uuid(),
                title,
                done: false,
            });
        }

        const updateItemTitle = (itemId: string, newTitle: string) => {
            const item = todo.items.find((i) => i.id === itemId);
            if (item) {
                item.title = newTitle;
            }
        }

        const markItemAsDone = (itemId: string) => {
            const item = todo.items.find((i) => i.id === itemId);
            if (item) {
                item.done = true;
            }
        }

        const markItemAsUndone = (itemId: string) => {
            const item = todo.items.find((i) => i.id === itemId);
            if (item) {
                item.done = false;
            }
        }

        const removeItem = (itemId: string) => {
            todo.items = todo.items.filter((i) => i.id !== itemId);
        }

        return { todo, addItem , updateItemTitle, removeItem, markItemAsDone, markItemAsUndone };
    }

    return { todos, addTodo, removeTodo , updateTodoTitle, getTodo, loadTodoListFromLocalStorage };
};