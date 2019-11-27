<!--
## todo

### on water system page
  show % of months out of compliance as a large number

Measuring chronic contamination:

find oldest ENFORCEMENT ACTION ISSUED based on the ENF_ACTION_ISSUE_DATE field
  the time period between then and the next RETURN TO COMPLIANCE event based on the ENF_ACTION_ISSUE_DATE field or now if there is no following RETURN TO COMPLIANCE for that analyte in that system

### made new maps tab
  2 maps: chronic and acute

  size of circle always represents population
    deeper color represents time out of compliance in the chronic map
    different color represents severity of violation in the acute map

minimum time of 1 month for out of compliance
  use ENF_ACTION_ISSUE_DATE to measure time between ENFORCEMENT ACTION ISSUED and RETURN TO COMPLIANCE

fix analyte count
  little problem: If there are multiple current analyte violations the additional analytes won't show up in the list view analyte total
  -- fixed this with addition of ANALYTE_SET array to json but need to use it for analyte total
  -- also use in bars
-->

## Data processing

The excel file can be transformed into the json format the site needs by running this series of scripts:

1. Translate the Excel active violations data to JSON and reformat

```
excel.js
```

2. Reformat

```
node format.js
```

3. Remove the now compliant systems from our list of violators

```
node more-fields.js
cp violations-current.json output/violations.json
cp output/* ../docs/data/
```

### Splitting violations per water system

4. Split up the violations into separate files per water system ID:

```
write.js
```

5. The shape files are linked on the HR2W site as well <a href="https://www.waterboards.ca.gov/water_issues/programs/hr2w/">https://www.waterboards.ca.gov/water_issues/programs/hr2w/</a>, put them in the ```./shapefiles``` directory and run:

```
node shapes.js
```

This generates a fresh ```locations.json``` file, then we can split that up:

7. Create a separate JSON file with the metadata for each water system:

```
write-locs.js
```

### Add Legislative Data

1. Apply the legislative data to the files in the docs/data folder:
```
legislators.js
```

2. Add the legislative district to each system:

```
node add-legislators-to-violations.js
cp violations-current-plus-legislators.json ../docs/data/violations.json
```

3. Add the total count of violations from that system to each record:

```
node count-viol-history.js
cp violations-plus-viol-count.json ../docs/data/violations.json
```

4. Create a file containing population counters for affected people in each CA State Assembly District

```
node count-pop-per-district.js
```

5. Recreate the files for the leaderboard page

```
cd docs/leaderboard
node data-by-district.js
node augment.js
```

<!--
Finding the list of unique legislators for our select menu: ```leg-unique.js```
The list of unique legislators can be dynamically built out of violations.json too
-->
