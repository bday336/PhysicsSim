///////////////////////////////////////////////////////////////////////
// This is where the environment and physics are set for the project //
///////////////////////////////////////////////////////////////////////

// Import relevant items from other directories //

// System setup/definition
import { randomVec3Ball } from "./utils/random.js";
import { State } from "./Computation/State.js";

// Data structure
import { DataList } from "./Computation/DataList.js";

// Dynamics
import { ConfigurationSpace } from "./ConfigurationSpace/ConfigurationSpace.js";
import { Simulation } from "./ConfigurationSpace/Simulation.js";
import { RenderSim } from "./Visualization/RenderSim.js";

// Geometries
import { euclidean } from "./AmbientSpace/ExampleSpaces/Euclidean.js";
import { hyperbolic } from "./AmbientSpace/ExampleSpaces/HypSpacePoincareBall.js";
import { spherical } from "./AmbientSpace/ExampleSpaces/SphericalStereoProj.js";
import { inhomogeneousNeg } from "./AmbientSpace/ExampleSpaces/InhomogeneousNeg.js";
import { inhomogeneousPos } from "./AmbientSpace/ExampleSpaces/InhomogeneousPos.js";
import { h2xe } from "./AmbientSpace/ExampleSpaces/H2xE.js";
import { s2xe } from "./AmbientSpace/ExampleSpaces/S2xE-Stereo.js";



// Set the ambient space for the project
let ambientSpace = euclidean;

//build a configuration space:
let NumBalls = 4;
let MaxRad = ambientSpace.obstacle.size/5.;

let radii = [];
let masses = [];
for(let i=0; i<NumBalls; i++){
    let r = MaxRad * Math.random()+0.05;
    let m = 10.*r*r*r;
    radii.push(r);
    masses.push(m);
}

let configurationSpace = new ConfigurationSpace(masses, radii);
// let maxPos = 2.;
// let maxVel = 1;

//build the initial set of states for the system:
let iniCond = [];
for(let i=0; i<NumBalls; i++){
    // let pos = new randomVec3Ball(maxPos);
    // let vel = new randomVec3Ball(maxVel);
    // let state = new State(pos,vel);
    // iniCond.push(state);
    iniCond.push(ambientSpace.obstacle.generateState());
}
let states = new DataList(iniCond);

//make the simulation
let sim = new Simulation( states, 0.001 );

//make the visualization of the simulation
let viz = new RenderSim( sim, radii );

//send the visualization off to be rendered on the screen
export default { viz };


//export these to use as global variables in the DEFINITIONS of the classes
//Simulation, ConfigurationSpace, and RenderSim :0 :0 PLZ FIX
export { ambientSpace, configurationSpace };