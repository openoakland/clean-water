## Data processing

The excel file can be transformed into the json format the site needs by running this series of scripts:

- Translate the Excel active violations data to JSON: ```excel.js```

Then we need to slightly reformat this by running:

```
node format.js
```

- Split up the violations into separate files per water system ID: ```write.js```

The shape files are linked on the HR2W site as well <a href="https://www.waterboards.ca.gov/water_issues/programs/hr2w/">https://www.waterboards.ca.gov/water_issues/programs/hr2w/</a>, put them in the ```./shapefiles``` directory and run:

```
node shapes.js
```

Which generates a fresh ```locations.json``` file, then we can split that up:

- Create a separate JSON file with the metadata for each water system: ```write-locs.js```

Apply the legislative data to the files in the docs/data folder: ```legislators.js```

Add the legislative district to each system:

```
node add-legislators-to-violations.js
```
<!--
Finding the list of unique legislators for our select menu: ```leg-unique.js```
The list of unique legislators can be dynamically built out of violations.json too
-->
