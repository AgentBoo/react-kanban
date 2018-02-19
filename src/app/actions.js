// constants
import { actionType } from './constants';
 const { SHIFT_LIST, SHIFT_CARD, TRANSIT_CARD } = actionType;


// ============================================================================ //
// Actions
// ============================================================================ //
// shiftList(source.id, destination.idx)
export function shiftList(fromDragSourceId, overDropTargetIdx){
  return {
    type      : SHIFT_LIST,
    sourceId  : fromDragSourceId,
    overIdx   : overDropTargetIdx
  }
};


// shiftCard(source.id, origin.idx, destination.idx)
export function shiftCard(fromDragSourceId, fromListIdx, overDropTargetIdx){
  return {
    type          : SHIFT_CARD,
    sourceId      : fromDragSourceId,
    sourceListIdx : fromListIdx,
    overIdx       : overDropTargetIdx
  }
};


// to transit means to pass across an area -- transitCard() moves a card across lanes
// transitCard(source.id, origin.idx, target.idx, destination.idx)
export function transitCard(fromDragSourceId, fromListIdx, overDropTargetIdx = null, intoListIdx = null){
  return {
    type           : TRANSIT_CARD,
    sourceId       : fromDragSourceId,
    sourceListIdx  : fromListIdx,
    overIdx        : overDropTargetIdx,
    targetListIdx  : intoListIdx
  }
};
