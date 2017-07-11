const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');

/**
 *
 */
const TodoApp = React.createClass({
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
    const { todos, showCompleted, searchText } = this.state;
    const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="small-centered small-11 medium-6 large-5 columns">
            <div className="container">
              <TodoSearch onSearch={this.handleSearch} />
              <TodoList />
              <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;