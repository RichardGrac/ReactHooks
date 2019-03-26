import React, {Component} from 'react'

class Todo extends Component {
    state = {
        todos: [],
        value: ''
    }

    onAddTodo = () => {
        this.setState(prevState => {
            return {
                todos: prevState.todos.concat({id: new Date().getTime(), name: prevState.value}),
                value: ''
            }
        })
    }

    onDeleteTodo = todoId => {
        this.setState(prevState => {
            return {
                todos: prevState.todos.filter(todo => todo.id !== todoId)
            }
        })
    }

    render() {
        return (
            <>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Type a TODO Name"
                           aria-label="Type a TODO Name" aria-describedby="todoButton"
                           value={this.state.value}
                           onChange={(e) =>  this.setState({value: e.target.value})}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="todoButton"
                                onClick={() => this.onAddTodo()}>
                            Add
                        </button>
                    </div>
                </div>
                <div>
                    <ul className="list-group">
                        {this.state.todos.map(todo => (
                            <li className="list-group-item" key={todo.id} onClick={() => this.onDeleteTodo(todo.id)}>
                                {todo.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}

export default Todo