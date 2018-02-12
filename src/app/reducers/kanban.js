import { REORDER } from './../actions/actions'


// proposed state tree
let initState = {
  cols: 4,
  lists: [
    { label: 'A', id: 1 },
    { label: 'B', id: 2 },
    { label: 'C', id: 3 }
  ]
}


function kanban(state = initState, action){
  switch(action.type){
    case REORDER:
      console.log('arrived at reorderer')

      const source = state.lists.find(function(list){ return action.source === list.id })
      let recalculated = Array.from(state.lists)
      const removed = recalculated.splice(state.lists.indexOf(source), 1)[0]
      recalculated.splice(action.target, 0, removed)

      return Object.assign({}, state, { lists: recalculated })


    default:
      return state
  }
}



export default kanban;
