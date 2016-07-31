/**
 *
 * @type {{setTodos: module.exports.setTodos, getTodos: module.exports.getTodos}}
 */
module.exports = {

  /**
   *
   * @param todos
   * @returns {*}
   */
  setTodos: function (todos) {
    if (Array.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },

  /**
   *
   * @returns {Array}
   */
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(stringTodos);
    } catch (error) {

    }

    return (Array.isArray(todos) ? todos : []);
  },

  /**
   * 
   * @param todos
   * @param showCompleted
   * @param searchText
   * @returns {*}
   */
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};
