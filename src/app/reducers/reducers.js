// NOTE: Will try immutability-helper here in the future
// utilities
import { updateObject, updateArray, retrieveIdx } from './utilities'


// ============================================================================ //
// Case reducers
// ============================================================================ //
// List Case reducer
export function shiftList(currentState, action){
  // do not have to worry about nested properties when reordering lists
  const lists = Array.from(currentState.cardlists);
  const { origin, destination } = action;

  const originIdx = retrieveIdx(origin, lists);
  const removed = lists.splice(originIdx, 1)[0];

  lists.splice(destination, 0, removed);

  return updateObject(currentState, { cardlists: lists });
};


// Card Case reducer
export function shiftCard(currentState, action){
  // I do have to worry about updating nested properties
  const { source, origin, target } = action;
  const cards = Array.from(currentState.cardlists[origin].cards);

  const sourceIdx = retrieveIdx(source, cards);
  const removed = cards.splice(sourceIdx, 1)[0];

  cards.splice(target, 0, removed);

  const lists = updateArray(currentState.cardlists, origin, { cards });

  return updateObject(currentState, { cardlists: lists });
};


// Card Case reducer
export function transitCard(currentState, action){
  // I do have to worry about updating nested properties
  const { source, origin, target, destination } = action;

  const ocards = Array.from(currentState.cardlists[origin].cards);
  const dcards = Array.from(currentState.cardlists[destination].cards);

  const sourceIdx = retrieveIdx(source, ocards);
  const removed = ocards.splice(sourceIdx, 1)[0];

  dcards.splice(target, 0, removed);

  return Object.assign({}, currentState, {
    cardlists: currentState.cardlists.map(function(list, i){
      if(i === origin){
        return updateObject(list, { cards: ocards })
      } else if (i === destination){
        return updateObject(list, { cards: dcards })
      }

      return list
    })
  });

};
