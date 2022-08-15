// Liên quan đến React, Redux
export default function html([first, ...strings], ...values) {
    //Destructuring
    // ...rest lấy tất cả những biến còn lại

    return values.reduce(
        // reduce nhận lại biến tích trữ, currentValue
        (acc, cur) => acc.concat(cur, strings.shift()), //shift() lấy và xóa luôn pt đầu tiên
        [first]
    )
        .filter(x => x && x !== true || x === 0)//truthy, falsy
        .join('')

}

export function createStore(reducer) {//nhận vào reducer và trả về store
    //data trong store = state
    let state = reducer()// return lại data ban đầu của store và lưu vào state

    const roots = new Map()//roots chứa gốc element dùng render ra View

    function render() {
        for (const [root, component] of roots) {
            const output = component()//html lấy từ component đẩy vào root => render View
            root.innerHTML = output
        }
    }

    return {
        //set 'root' làm key, 'component' làm value
        attach(component, root) {//nhận View đẩy ra root
            roots.set(root, component)//set => const roots có data 
            render()
        },
        connect(selector = state => state) {// đẩy data từ store vào View thông qua connect

            return component => (props, ...args) =>//hàm nhận đối số là component
                component(Object.assign({}, props, selector(state), ...args))
        },
        dispatch(action, ...args) {//thực hiện 1 action (nhận đối số là action, và đẩy data sang cho reducer)
            //dispatch thực thi => gọi là reducer   
            state = reducer(state, action, args)//reducer nhận action, update vào state và trả về 1 state mới
            render()
        }
    }
}