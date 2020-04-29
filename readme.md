# Safe Drinking Water

This is an Open Oakland CfA brigade project for the Community Water Center. The CWC identified specific functionality that would help them use the water quality data from Human Right to Water more effectively.

See the latest version of the site at http://water.openoakland.org/

## This repo is the Frontend

This is a repository containing the frontend code, we are doing data analysis and transformation in
<a href="https://github.com/r-b-g-b/clean-water-tool">https://github.com/r-b-g-b/clean-water-tool</a>

## History

The CWC is a well known, effective community activist organization. Open Oakland won a category in the <a href="https://findanewway.ca.gov/2018/11/20/cawaterdatachallenge/">CA Safe Drinking Water Data Challenge in 2018</a> with a project <a href="https://aaronhans.github.io/water-challenge/html/index.html">doing 3D representation of contaminants on a map</a>.

We started working on a new project led by water quality expert Rucker Alex who is meeting regularly with the CWC and are building tools based on the requirements of the activists. Specifications and ongoing discussions are available in the slack channel linked below.

## Participate

This project is an evolving open source effort and your assistance is welcome. To collaborate join the #ca-water-challenge channel in the <a href="http://openoakland.slack.com">Open Oakland Slack</a>

### Updating The CA Map

On the landing page, there is a map showing the number of people affected by CA Congressional district. This is presently a png to optimize load time. If/when `leaderboard-ca-state-assembly.json` data is updated, this chart will need to be updated as well. To have the site regenerate the map drawing, simply change <a href="https://github.com/openoakland/clean-water/blob/2810a374f60bab366d018f5db627ab325571589b/docs/index.js#L11">this line</a> to "true". After that, the new map can be screenshotted/downloaded and used to replace docs/cali-map.png.
