import storage from "./util/storage.js";

const init = {
    // todos: [
    //     {
    //         title: 'Learning JavaScript',
    //         completed: false,
    //     },
    //     {
    //         title: 'Learning HTML, CSS',
    //         completed: true,
    //     }
    // ]

    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    }
}

const actions = {
    add({ todos }, title) {
        if (title) {
            todos.push({ title, completed: false });
            storage.set(todos);
        }
    },
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos);
    },
    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos);
    },
    destroy({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos);
    }
}

export default function reducer(state = init, action, args) {
    //C1
    // switch (action) {
    //     case 'add':
    //         const [title] = args
    //         return {
    //             ...state,//lấy tất cả trạng thái còn lại
    //             todos: [...state.todos, {
    //                 title,
    //                 completed: false
    //             }]
    //         }
    //     default:
    //         return state
    // }
    //====
    //C2
    actions[action] && actions[action](state, ...args)//nếu có thì chạy hàm
    return state
}