// ============================================================================ //
// Reusable utility functions
// ============================================================================ //

// NOTE: Lookup index of an item -- .findIndex() v .indexOf(), the latter is enough since I am not interested in NaNs etc
export function retrieveIdx(attribute, arr){
  // arrow syntax for readability
  const result = arr.filter((item) => attribute === item.id)[0];

  return arr.indexOf(result);
};


// NOTE: Encapsulate creation of an updated deep copy
export function updateObject(currentObject, updates){
  // Object.assign(targetObject, ...sources), so: Object.assign({}, object1, object2)
  return Object.assign({}, currentObject, updates);
};


// NOTE: Update item in array
export function updateArray(currentArray, targetIdx, updates){
  const updated = currentArray.map(function(item, i){
    if(i === targetIdx){
      return updateObject(item, updates)
    }

    return item
  });

  return updated;
};
