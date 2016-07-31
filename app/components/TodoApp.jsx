var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

/**
 *
 */
var TodoApp = React.createClass({
  /**
   *
   * @returns {{showCompleted: boolean, searchText: string, todos: *}}
   */
  getInitialState: function () {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },

  /**
   *
   */
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },

  /**
   *
   * @param id
   */
  handleToggle: function (id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos
    })
  },

  /**
   *
   * @param text
   */
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    })
  },

  /**
   *
   * @param showCompleted
   * @param searchText
   */
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    })
  },

  /**
   *
   * @returns {XML}
   */
  render: function () {
    var { todos, showCompleted, searchText } = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="small-centered small-11 medium-6 large-5 columns">
            <div className="container">
              <TodoSearch onSearch={this.handleSearch} />
              <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
              <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;