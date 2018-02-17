import { REORDER } from './../actions/actions'


// proposed state tree
let initState = {
  cols  : 4,
  lists : [
    {
      id    : 1,
      label : 'A',
      cards : [{ id  : 1, text : 'a' },
               { id  : 2, text : 'b' },
               { id  : 3, text : 'c' }]
    },
    {
      id    : 2,
      label : 'B',
      cards : []
    },
  ]
}


// reducer
function kanban(state = initState, action){
  switch(action.type){
    case REORDER:
      console.log('arrived at reorderer')
      let sector = action.sector;
      let lists = Array.from(state[sector]);
      const removed = lists.splice(action.sourceIdx, 1)[0];
      lists.splice(action.overIdx, 0, removed);

      return Object.assign({}, state, { lists });


    default:
      return state
  }
}



export default kanban;
