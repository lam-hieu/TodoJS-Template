import { createStore } from './core.js';
import reducer from './reducer.js';
import withLogger from './logger.js'//thành phần trung gian, khi reducer được gọi - withLogger bắt đc state

const { attach, connect, dispatch } = createStore(withLogger(reducer))

window.dispatch = dispatch

export {
    attach,
    connect
}