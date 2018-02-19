// NOTE: Will try immutability-helper here in the future
// redux
// import { combineReducers } from 'redux'
// import { cardsReducer } from './cardsReducer'
// import { listsReducer } from './listsReducer'

// actions
import { actionType } from './../constants'
const { SHIFT_LIST, SHIFT_CARD, TRANSIT_CARD } = actionType;

// proposed state tree
let initState = {
  lists : [
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
      label : 'list 3',
      cards : []
    },
  ]
}



// ============================================================================ //
// Reducer
// ============================================================================ //
function kanban(state = initState, action){
  function retrieveCardIdx(id, arr){
    const item = arr.filter((card) => card.id === action.sourceId)[0]
    return arr.indexOf(item);
  }

  function retrieveListIdx(id, arr){
    const item = arr.filter((list) => list.id === action.sourceId)[0]
    return arr.indexOf(item)
  }

  switch(action.type){
    case SHIFT_LIST:
      // do not have to worry about nested properties
      const { sourceId: a, overIdx: b } = action;
      // good enough deep-copy
      const c = Array.from(state.lists);
      const d = retrieveListIdx(a, c)
      const e = c.splice(d, 1)[0]
      c.splice(b, 0, e)

      return Object.assign({}, state, { lists: c });


    case SHIFT_CARD:
      //  will update nested properties
      const { sourceId, sourceListIdx, overIdx } = action;

      const cards = Array.from(state.lists[sourceListIdx].cards);
      const sourceIdx = retrieveCardIdx(sourceId, cards)
      const removed = cards.splice(sourceIdx, 1)[0];
      cards.splice(overIdx, 0, removed);

      return Object.assign({}, state, {
        lists: state.lists.map((list, i) => {
          if(i === sourceListIdx){
            return Object.assign({}, list, { cards })
          }
          return list
        })
     })


    case TRANSIT_CARD:
      // will update nested properties
      const { sourceId: m, sourceListIdx: n, overIdx: o, targetListIdx: p } = action;

      console.log(state.lists[n])
      const q1 = Array.from(state.lists[n].cards);
      const q2 = Array.from(state.lists[p].cards);

      const r = retrieveCardIdx(m, q1);
      const s = q1.splice(r, 1)[0];
      q2.splice(o, 0, s);

      return Object.assign({}, state, {
        lists: state.lists.map((list, i) => {
          if(i === n){
            return Object.assign({}, list, { cards: q1 })
          } else if (i === p){
            return Object.assign({}, list, { cards: q2 })
          }
          return list
        })
      })


    default:
      return state;
  }
}



// const kanban = combineReducers(cardsReducer, listsReducer);

export default kanban;
