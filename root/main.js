let gameProps = {
  stars: 0,
  inventory: [],
  clicks: 0
}

let clickUpgrades = {
  laser: {
    price: 5,
    multiplier: 2,
    name: "Laser",
    automatic: false
  },
  gravityGun: {
    price: 10,
    multiplier: 5,
    name: "Gravity Gun",
    automatic: false
  }
};

let automaticUpgrades = {
  force: {
    price: 50,
    multiplier: 15,
    name: "Force",
    automatic: true
  },
  spaceVaccum: {
    price: 100,
    multiplier: 20,
    name: "Space Vaccum",
    automatic: true
  }
};


// NOTE This is purchaseUpgrade & purshaseAutoUpgrade

function purchaseUpgrade(upgradeName) {

  let upgrade = clickUpgrades[upgradeName]
  document.getElementById(upgradeName).disabled = true
  // accessing clickUpgrades[keyname]

  let alreadyHasUpgrade = gameProps.inventory.filter(u => u.name == upgrade.name).length > 0
  // Whether we have upgrade or not

  if (gameProps.stars >= upgrade.price && alreadyHasUpgrade === false) {
    gameProps.inventory.push(upgrade)
    // Push to array to add to inventory
  }
}

function purchaseAutoUpgrade(upgradeName) {

  let upgrade = automaticUpgrades[upgradeName]
  document.getElementById(upgradeName).disabled = true;
  // accessing clickUpgrades[keyname]

  let alreadyHasUpgrade = gameProps.inventory.filter(u => u.name == upgrade.name).length > 0
  //Whether we have upgrade or not
  console.log(console.log(upgrade.price))
  if (gameProps.stars >= upgrade.price && alreadyHasUpgrade === false) {
    gameProps.inventory.push(upgrade)
    // Push to array to add to inventory
  }
  
  console.log(gameProps.inventory)
}

// NOTE mine and mineAutomatic functions

function mineAutomatic() {

  let starCount = 0

  
  let autoUpgrades = gameProps.inventory.filter(i => i.automatic == true)

  if (autoUpgrades.length > 0) {
    for (let i = 0; i < autoUpgrades.length; i++) {
      starCount += autoUpgrades[i].multiplier
    }
  }

  updateGameStats(starCount)

  handleAnimation()
}


function mine() {

  if (gameProps.stars == 0) {
    startGame()
  }

  let starCount = 0

  let clickUpgrades = gameProps.inventory.filter(i => i.automatic === false)
  
  if (clickUpgrades.length > 0) {
    for (let i = 0; i < clickUpgrades.length; i++) {
      starCount += clickUpgrades[i].multiplier
    }
  } else {
    starCount = 1
  }

  updateGameStats(starCount)

  handleAnimation()
}

// NOTE ths is for showing and hiding of the stars

function handleAnimation() {

  displayStars()

  hideStars()

  setTimeout(function () {
    showStars()
  }, 75)

  setTimeout(function () {

    removeStars()
  }, 850)
}



function startGame() {

  disableAllButtons()

  gameProps = {
    stars: 0,
    inventory: [],
    clicks: 0
  }


  let interval = 3000;
  // 3 seconds 

  setInterval(() => {
    mineAutomatic()
  }, interval);
}

//NOTE ON page load
removeStars()


function updateGameStats(starsToAdd) {
  
  gameProps.stars += starsToAdd;
  let starCounter = document.getElementById('stars')
  starCounter.innerText = 'Stars: ' + gameProps.stars

  gameProps.clicks++
  let clickCounter = document.getElementById('clicks')
  clickCounter.innerText = 'Clicks: ' + gameProps.clicks


  // NOTE Checking for upgrade and enabling button
  let alreadyHasLaser = gameProps.inventory.filter(u => u.name == 'Laser').length > 0
  console.log(alreadyHasLaser)
  if (gameProps.stars >= clickUpgrades.laser.price && alreadyHasLaser == false) {
    enableLaserButton()
  }

  let alreadyHasForce = gameProps.inventory.filter(u => u.name == 'Force').length > 0
  console.log(alreadyHasForce)
  if (gameProps.stars >= automaticUpgrades.force.price && alreadyHasForce == false) {
    enableForceButton()
  }

  let alreadyHasGravityGun = gameProps.inventory.filter(u => u.name == 'Gravity Gun').length > 0
  console.log(alreadyHasGravityGun)
  if (gameProps.stars >= clickUpgrades.laser.price && alreadyHasGravityGun == false) {
    enableGravityGunButton()
  }

  let alreadyHasSpaceVaccum = gameProps.inventory.filter(u => u.name == 'Space Vaccum').length > 0
  console.log(alreadyHasSpaceVaccum)
  if (gameProps.stars >= automaticUpgrades.spaceVaccum.price && alreadyHasSpaceVaccum == false) {
    enableSpaceVaccumButton()
  }
}



// NOTE All Visual Stuff 

function enableLaserButton() {
  document.getElementById("laser").disabled = false;
}

function enableForceButton() {
  document.getElementById("force").disabled = false;
}

function enableGravityGunButton() {
  document.getElementById("gravityGun").disabled = false;
}

function enableSpaceVaccumButton() {
  document.getElementById("spaceVaccum").disabled = false;
}



// NOTE This is more Visual stuff
 
function disableAllButtons() {
  let allButtons = document.getElementsByClassName("btn");
  let i;
  for (i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = true;
  }
}

function enableAllButtons() {
  let allButtons = document.getElementsByClassName("btn");
  let i;
  for (i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = false;
  }
}


function hideStars() {
  let stars = document.getElementsByClassName("star");
  let i;
  for (i = 0; i < stars.length; i++) {
    stars[i].style.opacity = 0;
  }
}

function showStars() {
  let stars = document.getElementsByClassName("star");
  let i;
  for (i = 0; i < stars.length; i++) {
    stars[i].style.opacity = 1;
  }
}

function displayStars() {
  let stars = document.getElementsByClassName("star");
  let i;
  for (i = 0; i < stars.length; i++) {
    stars[i].style.display = 'inline';
  }
}

function removeStars() {
  let stars = document.getElementsByClassName('star');
  let i;
  for (i = 0; i < stars.length; i++) {
    stars[i].style.display = 'none';
  }
}