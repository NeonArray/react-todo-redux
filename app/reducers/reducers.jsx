const uuid = require('node-uuid');
const moment = require('moment');


export const searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    break;
    default:
      return state;
    break;
  }
};

export const showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    break;
    default:
      return state;
    break;
  }
};

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
    break;
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? moment().unix() : undefined
          };
        }
      })
    break;
    case 'CLEAR_TODO':
      let todo = state.map((i) => {
        return i.id === action.id;
      });

      return [
        ...todo,
        {
          completed: true,
          compleatedAt: moment().unix()
        }
      ];
    break;
    default:
      return state;
    break;
  }
};