// NOTE: Will try immutability-helper here in the future
// utilities
import { updateObject, updateArray, retrieveIdx } from './utilities'


// ============================================================================ //
// Case reducers
// ============================================================================ //
// List Case reducer
export function shiftList(state, action){
  // do not have to worry about nested properties when reordering lists
  const lists = Array.from(state.cardlists);
  const { originId, destinationIdx } = action;

  const originIdx = retrieveIdx(originId, lists);
  const removed = lists.splice(originIdx, 1)[0];

  lists.splice(destinationIdx, 0, removed);

  return updateObject(state, { cardlists: lists });
};


// Card Case reducer
export function shiftCard(state, action){
  // I do have to worry about updating nested properties
  const { sourceId, originIdx, targetIdx } = action;
  const cards = Array.from(state.cardlists[originIdx].cards);

  const sourceIdx = retrieveIdx(sourceId, cards);
  const removed = cards.splice(sourceIdx, 1)[0];

  cards.splice(targetIdx, 0, removed);

  const lists = updateArray(state.cardlists, originIdx, { cards });

  return updateObject(state, { cardlists: lists });
};


// Card Case reducer
export function transitCard(state, action){
  // I do have to worry about updating nested properties
  const { sourceId, originIdx, targetIdx, destinationIdx } = action;

  const origin = Array.from(state.cardlists[originIdx].cards);
  const destination = Array.from(state.cardlists[destinationIdx].cards);

  const sourceIdx = retrieveIdx(sourceId, origin);
  const removed = origin.splice(sourceIdx, 1)[0];

  destination.splice(targetIdx, 0, removed);

  return Object.assign({}, state, {
    cardlists: state.cardlists.map(function(list, i){
      if(i === originIdx){
        return updateObject(list, { cards: origin })
      } else if (i === destinationIdx){
        return updateObject(list, { cards: destination })
      }

      return list
    })
  });

};
