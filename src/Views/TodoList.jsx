import React, {useState, useReducer, useContext, useEffect} from 'react'

const todosReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'ADD':
            return state.concat({id: new Date().getTime(), name: action.value})
        case 'DELETE':
            return state.filter(todo => todo.id !== action.todoId)
        default:
            return state
    }
}

const Context = React.createContext()

const TodoList = () => {
    const [value, setValue] = useState('')
    const [state, dispatch] = useReducer(todosReducer, [])

    useEffect(() => {
        dispatch({type: 'SET', payload: JSON.parse(localStorage.getItem('data'))})
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(state))
    }, [state])

    return (
        <Context.Provider value={dispatch}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type a TODO Name"
                       aria-label="Type a TODO Name" aria-describedby="todoButton"
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="todoButton"
                            onClick={() => dispatch({type: 'ADD', value})}>
                        Add
                    </button>
                </div>
            </div>
            <List todos={state} />
        </Context.Provider>
    )
}

const List = ({todos}) => {
    return (
        <ul className="list-group">
            {todos.map(todo => <ListItem key={todo.id} todo={todo} />)}
        </ul>
    )
}

const ListItem = ({todo}) => {
    const dispatch = useContext(Context)
    return (
        <li className="list-group-item" onClick={() => dispatch({type: 'DELETE', todoId: todo.id})}>
            {todo.name}
        </li>
    )
}

export default TodoList