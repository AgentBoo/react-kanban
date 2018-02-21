// ============================================================================ //
// Reusable utility functions
// ============================================================================ //

// NOTE: Look up item
export function retrieveItem(attribute, arr){
  // arrow syntax for readability
  return arr.filter((item) => attribute === item.id)[0];
}


// NOTE: Lookup index of an item -- .findIndex() v .indexOf(), the latter is enough since I am not interested in NaNs etc
export function retrieveIdx(attribute, arr){
  const result = retrieveItem(attribute, arr)

  return arr.indexOf(result);
};


// NOTE: Encapsulate creation of an updated deep copy
export function updateObject(currentObject, updates){
  // Object.assign(targetObject, ...sources), so: Object.assign({}, object1, object2)
  return Object.assign({}, currentObject, updates);
};


// NOTE: Update item in array
export function updateArray(currentArray, itemIdx, updates){
  const updated = currentArray.map(function(item, i){
    if(i !== itemIdx){
      return item
    }

    return updateObject(item, updates);
  });

  return updated;
};


// NOTE: Create a new list with a factory
export function createList(id, label){
  const list = {
    id    : id,
    label : label,
    cards : []
  };

  return list;
}


// NOTE: Create a new card with a factory
export function createCard(id, text){
  const card = {
    id    : id,
    text  : text
  };

  return card;
}
