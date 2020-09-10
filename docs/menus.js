export function num_sort(a, b) {
  return parseInt(a) - parseInt(b);
}

export function selectors(systemMap, cityMap, countyMap, zipMap, analyteMap, senateMap, assemblyMap) {

  let systemKeys = Array.from( systemMap.keys() ).sort();
  let cityKeys = Array.from( cityMap.keys() ).sort();
  let countyKeys = Array.from( countyMap.keys() ).sort();
  let zipKeys = Array.from( zipMap.keys() ).sort();
  let analyteKeys = Array.from( analyteMap.keys() ).sort();
  let senateKeys = Array.from( senateMap.keys() ).sort(num_sort);
  let assemblyKeys = Array.from( assemblyMap.keys() ).sort(num_sort);

  return `
    <div class="selects">
      <span>Filter results</span>
      <select name="system">
        <option value="">Water system</option>
        ${systemKeys.map( (item) => {
          return `<option value="${item}">${item}</option>`
        })}
      </select>
      <select name="city">
        <option value="">City</option>
        ${cityKeys.map( (item) => {
          return `<option value="${item}">${item}</option>`
        })}
      </select>
      <select name="county">
        <option value="">County</option>
        ${countyKeys.map( (item) => {
          return `<option value="${item}">${item}</option>`
        })}
      </select>
      <select name="zip">
        <option value="">Zip code</option>
        ${zipKeys.map( (item) => {
          return `<option value="${item}">${item}</option>`
        })}
      </select>
      <select name="analyte">
        <option value="">Analyte</option>
        ${analyteKeys.map( (item) => {
          return `<option value="${item}">${item}</option>`
        })}
      </select>
      <select name="senator">
        <option value="">CA State Senate</option>
        ${senateKeys.map( (item) => {
          return `<option value="${item}">District ${item}</option>`
        })}
      </select>
      <select name="assembly">
        <option value="">CA State Assembly</option>
        ${assemblyKeys.map( (item) => {
          return `<option value="${item}">District ${item}</option>`
        })}
      </select>
    </div>
  `
}