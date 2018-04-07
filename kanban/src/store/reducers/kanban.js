// case reducers
import { shiftList, shiftCard, transitCard } from './reducers';
// constants
import { actionType } from './../constants';
 const { SHIFT_LIST, SHIFT_CARD, TRANSIT_CARD } = actionType;


// ============================================================================ //
// Root reducer
// ============================================================================ //
// dispatched actions and case reducers are named the same
function kanban(state = initState, action){
  switch(action.type){
    case SHIFT_LIST:
      return shiftList(state, action);
    case SHIFT_CARD:
      return shiftCard(state, action);
    case TRANSIT_CARD:
      return transitCard(state, action);

    default:
      return state;
  }
};

export default kanban;


// ====================================== //
// proposed state tree
let initState = {
  cardlists : [
    {
      id    : 1,
      label : 'List 1',
      cards : [{ id  : 1, text : '1' },
               { id  : 2, text : '2' },
               { id  : 3, text : '3' },
               { id  : 4, text : '4' },
               { id  : 5, text : '5' },
               { id  : 6, text : '6' },
               { id  : 7, text : '7' },
               { id  : 8, text : '8' }]
    },
    {
      id    : 2,
      label : 'List 2',
      cards : [{ id  : 9, text : '9' },
               { id  : 10, text : '10'}]
    },
    {
      id    : 3,
      label : 'List 3',
      cards : []
    },
  ]

};
