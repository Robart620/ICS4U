const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const inc = c.clientWidth / 8;
const arrowLength = 15;
const arrowHeadLength = 4.5;
const arrowHeadAngle = Math.PI / 6;
// const bFieldRadius = 3;
const crossSize = 5 ;
const particleRadius = 7;
const velocityArrowHead = 15;
const space = 5;
const minSpeed = 0.0001;
const chargeMultiplier = 0.001;
// const bFieldMultiplier = 1;

var mass;
// var bField;
// var bFieldDirection;
var eField;
var eFieldDirection;
var initialVelocity;
var initialVelocityDirection;
var initialX;
var initialY;
var elasticity;
var charge;

var isRunning;
var isPaused;
var initialized = false;

var x;
var y;
var dx;
var dy;
var ddx;
var ddy;

const preview = () => {
    readValues();
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);

    drawEField();

    // if(bField > 0)
    //   drawBField();
    
    drawInitialParticle();
    if(initialVelocity > 0)
      drawInitialVelocity();
}

const runSim = () => {
  readValues();
  if(!initialized)
    initialize();
  if(isRunning){
    console.log(initialized);
    requestAnimationFrame(runSim);
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);

    // drawBField();
    drawEField();

    moveParticle();

    ddx = 0;
    ddy = 0;
    if(eField > 0)
      calculateElectricAcceleration();
    // if(bField > 0)
    //   calculateMagneticAcceleration();
  }
  

}

const moveParticle= () => {
  ctx.strokeStyle = "rgb(0, 0, 0 , 1.0)";
  ctx.fillStyle = "rgb(0, 0, 0, 1.0)";
  ctx.beginPath();
  ctx.arc(x += dx, y += dy, particleRadius, 0, Math.PI * 2);
  ctx.fill();

  if(elasticity > 0 && x < particleRadius + space){
    dx = -dx * elasticity;
    x = 0 + particleRadius + space;
    x += dx;
  } if (elasticity > 0 && x > c.clientWidth - particleRadius - space) {
    dx = -dx * elasticity;
    x = c.clientWidth - particleRadius - space;
    x += dx;
  } if(elasticity > 0 && y < particleRadius + space){
    dy = -dy * elasticity;
    y = particleRadius + space;
    y += dy;
  } if (elasticity > 0 && y > c.clientHeight - particleRadius - space) {
    dy = -dy * elasticity;
    y = c.clientHeight - particleRadius - space;
    y += dy;
  } else if(elasticity === 0)
    stopSim();
}

const calculateElectricAcceleration = () => {
  ddx += charge * eField * Math.cos(eFieldDirection) / mass;
  ddy += charge * eField * Math.sin(eFieldDirection) / mass;

  dx += ddx;
  dy -= ddy;

}

// const calculateMagneticAcceleration = () => {

//   var magnitudeOfAcceleration = (charge * Math.sqrt(dx * dx + dy * dy) * bField) / mass;

//   console.log("dx: " + dx);
//   console.log("dy: " + dy);

//   ddx += magnitudeOfAcceleration * Math.cos(Math.atan(dx / dy));
//   ddy += magnitudeOfAcceleration * Math.sin(Math.atan(dx / dy));;

//   console.log("ddx: " + ddx)
//   console.log("ddy: " + ddy)

//   dx += ddx;
//   dy += ddy;
    
    
// }

const initialize = () => {
  x = initialX;
  y = initialY;
  dx = initialVelocity * Math.cos(initialVelocityDirection);
  dy = - initialVelocity * Math.sin(initialVelocityDirection);
  ddx = 0;
  ddy = 0;

  initialized = true;
}

const stopSim = () => {
  document.getElementById("input-run-sim").checked = false;

  readValues();

  initialized = false;

}

drawInitialVelocity = () => {
  ctx.strokeStyle = "rgb(0, 255, 0 , 1.0)";
  ctx.beginPath();
  ctx.moveTo(initialX, initialY);
  ctx.lineTo(initialX + initialVelocity * Math.cos(initialVelocityDirection), initialY - initialVelocity * Math.sin(initialVelocityDirection));
  ctx.lineTo((initialX + initialVelocity * Math.cos(initialVelocityDirection)) - velocityArrowHead * Math.cos(initialVelocityDirection - arrowHeadAngle), (initialY - initialVelocity * Math.sin(initialVelocityDirection)) + velocityArrowHead * Math.sin(initialVelocityDirection - arrowHeadAngle));
  ctx.moveTo(initialX + initialVelocity * Math.cos(initialVelocityDirection), initialY - initialVelocity * Math.sin(initialVelocityDirection));
  ctx.lineTo((initialX + initialVelocity * Math.cos(initialVelocityDirection)) - velocityArrowHead * Math.cos(initialVelocityDirection + arrowHeadAngle), (initialY - initialVelocity * Math.sin(initialVelocityDirection)) + velocityArrowHead * Math.sin(initialVelocityDirection + arrowHeadAngle));
  ctx.stroke();
  
}

drawInitialParticle = () => {
  ctx.strokeStyle = "rgb(0, 0, 0 , 1.0)";
  ctx.fillStyle = "rgb(0, 0, 0, 1.0)";
  ctx.beginPath();
  ctx.arc(initialX, initialY, particleRadius, 0, Math.PI * 2);
  ctx.fill();
}

// drawBField = () => {
//   if(bField > 0){
//     for(var i=inc; i < c.clientWidth; i += inc){
//       for(var j=inc; j < c.clientHeight; j+= inc){
//         if(!bFieldDirection){
//           ctx.strokeStyle = "rgb(255, 0, 0 , 0.5)";
//           ctx.fillStyle = "rgb(255, 0, 0, 0.5)";
//           ctx.beginPath();
//           ctx.moveTo(i,j);
//           ctx.arc(i, j, bFieldRadius, 0, Math.PI * 2);
//           ctx.stroke();
//           ctx.fill();
//         } else {
//           ctx.strokeStyle = "rgb(255, 0, 0 , 0.5)";
//           ctx.beginPath();
//           ctx.moveTo(i,j);
//           ctx.lineTo(i + crossSize * Math.cos(Math.PI / 4), j + crossSize * Math.sin(Math.PI / 4));
//           ctx.moveTo(i,j);
//           ctx.lineTo(i + crossSize * Math.cos(Math.PI / 4), j - crossSize * Math.sin(Math.PI / 4));
//           ctx.moveTo(i,j);
//           ctx.lineTo(i - crossSize * Math.cos(Math.PI / 4), j + crossSize * Math.sin(Math.PI / 4));
//           ctx.moveTo(i,j);
//           ctx.lineTo(i - crossSize * Math.cos(Math.PI / 4), j - crossSize * Math.sin(Math.PI / 4));
        
//           ctx.stroke();
//         }
//       }
//     }
//   }
// }

drawEField = () => {
  if(eField > 0){
   for(var i=inc / 2; i < c.clientWidth; i+= inc){
      for(var j=inc / 2; j < c.clientHeight; j += inc){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.moveTo(i, j);
        ctx.lineTo(i - arrowLength/2 * Math.cos(eFieldDirection), j + arrowLength/2 * Math.sin(eFieldDirection));
        ctx.moveTo(i, j);
        ctx.lineTo(i + arrowLength/2 * Math.cos(eFieldDirection), j - arrowLength/2 * Math.sin(eFieldDirection));
        ctx.lineTo(i + arrowHeadLength * Math.cos(eFieldDirection + arrowHeadAngle), j - arrowHeadLength * Math.sin(eFieldDirection + arrowHeadAngle));
        ctx.moveTo(i + arrowLength/2 * Math.cos(eFieldDirection), j - arrowLength/2 * Math.sin(eFieldDirection));
        ctx.lineTo(i + arrowHeadLength * Math.cos(eFieldDirection - arrowHeadAngle), j - arrowHeadLength * Math.sin(eFieldDirection - arrowHeadAngle));
        ctx.stroke();
      }
    }
  }
}

readValues = () => {
  mass = document.getElementById("input-mass").valueAsNumber;
  // bField = document.getElementById("input-B-field").valueAsNumber * bFieldMultiplier;
  // bFieldDirection = document.getElementById("input-B-field-direction").checked;
  eField = document.getElementById("input-E-field").valueAsNumber;
  eFieldDirection = document.getElementById("input-E-field-direction").valueAsNumber  * (Math.PI / 180);
  initialVelocity = document.getElementById("input-initial-velocity").valueAsNumber;
  initialVelocityDirection = document.getElementById("input-initial-velocity-direction").valueAsNumber * Math.PI / 180;
  initialX = document.getElementById("input-initial-x").valueAsNumber;
  initialY = document.getElementById("input-initial-y").valueAsNumber;
  elasticity = document.getElementById("elasticity").valueAsNumber / 100;
  isRunning = document.getElementById("input-run-sim").checked;
  charge = document.getElementById("input-charge").valueAsNumber * chargeMultiplier;

}

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const rangeValue = wrap.querySelector(".range-value");

  range.addEventListener("input", () => {
    setrangeValue(range, rangeValue);
  });
  setrangeValue(range, rangeValue);
});

function setrangeValue(range, rangeValue) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  // const newVal = Number(((val - min) * 100) / (max - min));
  rangeValue.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  // rangeValue.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
