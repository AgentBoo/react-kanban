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
  const { sourceId, overIdx } = action;

  const sourceIdx = retrieveIdx(sourceId, lists);
  const removed = lists.splice(sourceIdx, 1)[0];

  lists.splice(overIdx, 0, removed);

  return updateObject(currentState, { cardlists: lists });
};


// Card Case reducer
export function shiftCard(currentState, action){
  // I do have to worry about updating nested properties
  const { sourceId, sourceListIdx, overIdx } = action;
  const cards = Array.from(currentState.cardlists[sourceListIdx].cards);

  const sourceIdx = retrieveIdx(sourceId, cards);
  const removed = cards.splice(sourceIdx, 1)[0];

  cards.splice(overIdx, 0, removed);

  const lists = updateArray(currentState.cardlists, sourceListIdx, { cards });

  return updateObject(currentState, { cardlists: lists });
};


// Card Case reducer
export function transitCard(currentState, action){
  // I do have to worry about updating nested properties
  const { sourceId, sourceListIdx, overIdx, targetListIdx } = action;

  const origin = Array.from(currentState.cardlists[sourceListIdx].cards);
  const destination = Array.from(currentState.cardlists[targetListIdx].cards);

  const sourceIdx = retrieveIdx(sourceId, origin);
  const removed = origin.splice(sourceIdx, 1)[0];

  destination.splice(overIdx, 0, removed);

  return Object.assign({}, currentState, {
    cardlists: currentState.cardlists.map(function(list, i){
      if(i === sourceListIdx){
        return updateObject(list, { cards: origin })
      } else if (i === targetListIdx){
        return updateObject(list, { cards: destination })
      }

      return list
    })
  });

};
