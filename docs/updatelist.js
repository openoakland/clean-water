export function updateList(map,key,newItem) {
  let existingItems = map.get(key);
  existingItems.push(newItem);
  map.set(key,existingItems);
}
