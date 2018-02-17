// constants
// import {} from './../constants'
export const REORDER = 'REORDER'


// ============================================================================ //
export function reorder(sector, fromDragSourceIdx, overDropTargetIdx){
  return {
    type      : REORDER,
    sector    : sector,
    sourceIdx : fromDragSourceIdx,
    overIdx   : overDropTargetIdx
  }
}
