export const REORDER = 'REORDER'


// ============================================================================ //
export function reorder(dragSourceID, dropTargetID){
  return {
    type: REORDER,
    source: dragSourceID,
    target: dropTargetID
  }
}
