// @flow
import { connect } from 'react-redux'
import { type Dispatch } from 'redux'
import { getTodoListFromState, getVisibilityFilterFromState } from '../api-todo/connectors/todos'
import { toggleTodo, type ToggleTodoAction } from '../api-todo/actions/toggleTodo'
import { type AppState } from 'src/reducers'
import { VisibilityFilters, type VisibilityState } from '../api-todo/reducers/visibilityFilter'
import TodoListComponent from '../components/TodoList'
import { type TodoList, type TodoTypeFromReducer } from '../api-todo/reducers/todo'

const getVisibleTodos = (todos: any, filter: VisibilityState): TodoList | Error => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((todo: TodoTypeFromReducer): boolean => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((todo: TodoTypeFromReducer): boolean => !todo.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

type VisibleTodoMapStateToPropsType = {
  todos: TodoList | Error
}

const mapStateToProps = (state: AppState): VisibleTodoMapStateToPropsType => {
  // we get the data we want from the state via the connectors
  // which may have been transformed into a specific structure
  // but not processed or filtered etc. That work is done here..
  const todos = getTodoListFromState(state)
  const filter = getVisibilityFilterFromState(state)

  return {
    todos: getVisibleTodos(todos, filter)
  }
}

type VisibleTodoDispatchStateToPropsType = {
  toggleTodo: (id: number) => ToggleTodoAction
}

const mapDispatchToProps = (dispatch: Dispatch<*>): VisibleTodoDispatchStateToPropsType => ({
  toggleTodo: (id: number): ToggleTodoAction => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListComponent)
