// ============================================================================ //
// NOTE: Redux
export const actionType = {
  SHIFT_LIST   : 'SHIFT_LIST',
  ADD_LIST     : 'ADD_LIST',
  EDIT_LIST    : 'EDIT_LIST',
  REMOVE_LIST  : 'REMOVE_LIST',
  SHIFT_CARD   : 'SHIFT_CARD',
  TRANSIT_CARD : 'TRANSIT_CARD',
  ADD_CARD     : 'ADD_CARD',
  EDIT_CARD    : 'EDIT_CARD',
  REMOVE_CARD  : 'REMOVE_CARD',
  // FETCH_DONORS : 'FETCH_DONORS'
}



// ============================================================================ //
// NOTE: React DnD
// Drag sources and drop targets only interact if they have the same string type
export const itemType = {
  LIST    : 'list',
  CARD    : 'card',
  DROPBOX : 'dropbox'
}
