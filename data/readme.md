# Getting data from HR2W

Latest data files are linked: <a href="https://www.waterboards.ca.gov/water_issues/programs/hr2w/">https://www.waterboards.ca.gov/water_issues/programs/hr2w/</a>

## Processing

- Copy the file to this directory and run the following scripts:
```
node excel.js
node format.js
node write.js
node write-locs.js
node legislators.js
node add-legislators-to-violations.js
node count-viol-history.js
node count-pop-per-district.js
node data-by-district.js
node augment.js 
cp violations-plus-viol-count.json ../docs/data/violations.json
cp -r data-by-district ../docs/leaderboard/
```

We have a different data process for dealing with data in a different format that the waterboard provided to us in August 2019, see the data-v2 directory. As of Deceber 2019 the latest data available is the HR2W in the link above


issues:
- 2 bad graphs on right side of homepage
