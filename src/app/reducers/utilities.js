// ============================================================================ //
// Reusable utility functions
// ============================================================================ //

// NOTE: Encapsulate creating an updated deep copy
export function updateObject(currentObject, updatedValues){
  return Object.assign({}, currentObject, updatedValues);
};


// NOTE: Lookup index of an item -- .findIndex() v .indexOf(), the latter is enough since I am not interested in NaNs etc
export function retrieveIdx(attribute, arr){
  // arrow syntax for readability
  const result = arr.filter((item) => attribute === item.id)[0];

  return arr.indexOf(result);
};

// NOTE: Update item in array
export function updateArray(currentArray, targetIdx, updatedValues){
  const updatedArray = currentArray.map(function(item, i){
    if(i === targetIdx){
      return updateObject(item, updatedValues)
    }

    return item
  });

  return updatedArray;
};
