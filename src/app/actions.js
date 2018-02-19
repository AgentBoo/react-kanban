// constants
import { actionType } from './constants';
 const { SHIFT_LIST, SHIFT_CARD, TRANSIT_CARD } = actionType;


// ============================================================================ //
// Actions
// ============================================================================ //
// shiftList(origin.id, destination.idx)
export function shiftList(fromDragSourceId, overDropTargetIdx){
  return {
    type        : SHIFT_LIST,
    origin      : fromDragSourceId,
    destination : overDropTargetIdx
  }
};


// shiftCard(source.id, origin.idx, target.idx)
export function shiftCard(fromDragSourceId, fromListIdx, overDropTargetIdx){
  return {
    type        : SHIFT_CARD,
    source      : fromDragSourceId,
    origin      : fromListIdx,
    target      : overDropTargetIdx
  }
};


// to transit means to pass across an area -- transitCard() moves a card across lanes
// transitCard(source.id, origin.idx, target.idx, destination.idx)
export function transitCard(fromDragSourceId, fromListIdx, overDropTargetIdx = null, intoListIdx = null){
  return {
    type        : TRANSIT_CARD,
    source      : fromDragSourceId,
    origin      : fromListIdx,
    target      : overDropTargetIdx,
    destination : intoListIdx
  }
};
