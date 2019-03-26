import React from 'react';
import './App.css';
import TodoList from './Views/TodoList'
// import Todo from './Views/Todo'

const App = () => {
    return (
        <div className="container mt-5">
            {/*<Todo />     /!*Class Based*!/*/}
            <TodoList /> {/*Function Based*/}
        </div>
    );
}

export default App;
