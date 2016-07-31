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
  }
};
