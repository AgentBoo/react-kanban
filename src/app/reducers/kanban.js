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
      label : 'A',
      cards : [{ id  : 1, text : 'a' },
               { id  : 2, text : 'b' },
               { id  : 3, text : 'c' },
               { id  : 4}]
    },
    {
      id    : 2,
      label : 'B',
      cards : [{ id  : 5, text : 'd' },
               { id  : 6, text : 'e' },
               { id  : 7}]
    },
    {
      id    : 3,
      label : 'C',
      cards : [{ id  : 8}]
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
      console.log('shift card')
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
      console.log('transit card')
      const { sourceId: m, sourceListIdx: n, overIdx: o, targetListIdx: p } = action;

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
