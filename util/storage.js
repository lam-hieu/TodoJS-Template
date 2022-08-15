const TODOS_STORAGE_KEY = 'TODOS'

export default {
    //lấy data ra từ local storage, lưu data todo vào local storage

    get() {
        return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
    },
    set(todos) {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    }
}