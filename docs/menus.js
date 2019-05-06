export function selectors(systemMap, cityMap, countyMap, zipMap, analyteMap) {

  let systemKeys = Array.from( systemMap.keys() );
  let cityKeys = Array.from( cityMap.keys() );
  let countyKeys = Array.from( countyMap.keys() );
  let zipKeys = Array.from( zipMap.keys() );
  let analyteKeys = Array.from( analyteMap.keys() );

  return `
    <div class="selects">
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
    </div>
  `
}