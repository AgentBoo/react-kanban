// constants
import { actionType } from './constants';
 // const { FETCH_DONORS } = actionType;
 const { SHIFT_LIST, ADD_LIST, EDIT_LIST, REMOVE_LIST } = actionType;
 const { SHIFT_CARD, TRANSIT_CARD, ADD_CARD, EDIT_CARD, REMOVE_CARD } = actionType;


// ============================================================================ //
// Actions
// ============================================================================ //

// NOTE: Network requests/fetch related
// export function prefetchDonors(donors){
//   return {
//     type          : PREFETCH_DONORS,
//     donors        : donors
//   }
// }
//
// export function receiveDonors(donors){
//   return {
//     type          : RECEIVE_DONORS,
//     donors        : json.data.individuals.map(individual => individual.data ),
//     receivedAt    : Date.now()
//   }
// }
//
// export function reqSuccess(){
//   return {
//     type          : RECEIVE_RESPONSE,
//     status        : 'success',
//     response      : {}
//   }
// }
//
// export function reqError(){
//   return {
//     type          : RECEIVE_RESPONSE,
//     status        : 'error',
//     error         : {}
//   }
// }
//
// export function reqTimeout(){
//   return {
//     type           : RECEIVE_REQUEST,
//     status         : 'timeout',
//     response       : {}
//   }
// }

// NOTE: LISTS related
// shiftList(origin.id, destination.idx)
export function shiftList(fromDragSourceId, overDropTargetIdx){
  return {
    type           : SHIFT_LIST,
    originId       : fromDragSourceId,
    destinationIdx : overDropTargetIdx
  }
};

export function addList(listId, listLabel){
  return{
    type           : ADD_LIST,
    listId         : listId,
    listLabel      : listLabel
  }
};

export function editList(listId, listLabel){
  return {
    type            : EDIT_LIST,
    listId          : listId,
    listLabel       : listLabel
  }
};

export function removeList(listId){
  return {
    type            : REMOVE_LIST,
    listId          : listId
  }
};


// ====================================== //

// NOTE: CARDS related
// shiftCard(source.id, origin.idx, target.idx)
export function shiftCard(fromDragSourceId, fromListIdx, overDropTargetIdx){
  return {
    type           : SHIFT_CARD,
    sourceId       : fromDragSourceId,
    originIdx      : fromListIdx,
    targetIdx      : overDropTargetIdx
  }
};

// to transit means to pass across an area -- transitCard() moves a card across lanes
// transitCard(source.id, origin.idx, target.idx, destination.idx)
export function transitCard(fromDragSourceId, fromListIdx, overDropTargetIdx = null, intoListIdx = null){
  return {
    type           : TRANSIT_CARD,
    sourceId       : fromDragSourceId,
    originIdx      : fromListIdx,
    targetIdx      : overDropTargetIdx,
    destinationIdx : intoListIdx
  }
};

export function addCard(cardId, listIdx, text){
  return {
    type            : ADD_CARD,
    cardId          : cardId,
    originIdx       : listIdx,
    text            : text
  }
};

export function editCard(cardId, listIdx, text){
  return {
    type            : EDIT_CARD,
    cardId          : cardId,
    originIdx       : listIdx,
    text            : text
  }
};

export function removeCard(cardId, listIdx){
  return {
    type            : REMOVE_CARD,
    cardId          : cardId,
    originIdx       : listIdx
  }
};
