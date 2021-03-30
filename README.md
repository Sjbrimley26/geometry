# geometry

A simple physics engine with gravity and collisions. Collisions work for the most part but have a strange tendency to go to the right.

Used an R-Tree to accelerate the collision detection code. Created a secondary library from this (sjb-geometry on npm) for dealing with shapes in code.

To build:
- clone the project and run 'npm i --D' from the command line
- the run 'npm build'
- from there, yo can copy the index.html file from the src folder into the new build folder and open the index.html to see the page
