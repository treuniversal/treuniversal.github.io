<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBQfBLqgcWoUDMUIMoAJc3E_03q3JPZWxc",
    authDomain: "tristancomputer-2def4.firebaseapp.com",
    databaseURL: "https://tristancomputer-2def4.firebaseio.com",
    projectId: "tristancomputer-2def4",
    storageBucket: "tristancomputer-2def4.appspot.com",
    messagingSenderId: "992284587844",
    appId: "1:992284587844:web:4b875f82b9f01ebb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBQfBLqgcWoUDMUIMoAJc3E_03q3JPZWxc",
    authDomain: "tristancomputer-2def4.firebaseapp.com",
    databaseURL: "https://tristancomputer-2def4.firebaseio.com",
    projectId: "tristancomputer-2def4",
    storageBucket: "tristancomputer-2def4.appspot.com",
    messagingSenderId: "992284587844",
    appId: "1:992284587844:web:4b875f82b9f01ebb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
  
let scoreboard ={ }
let responseh = document.getElementById("responseh")

let eRadius= 10

let nitro=3

let x=470
let y=370

let a=233
let e=346

let p = [ 103, 75, 4, 142]
let o = [ 132, 23, 122, 300] 

let direction_v=[1,1,1,1]
let direction_h=[1,1,1,1]

let direction_h2 = 1
let direction_v2 = 1

let time= 2

let lives;
lives=10

let level= 1

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/897
}

function draw() {
  
if (time > 0) {
  background(120);
  textSize(26)
  text("Lives: " + lives, 100, 100)
  text("Time: " + time.toFixed(0), 100, 125)
  time = time - 0.02
  
  fill(183,65,10);
  circle(x*s,y,30*s)
  
if (touches.length == 0)   {

  if (keyIsDown(LEFT_ARROW)) {
    x = x - 6
   }

  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 6
  }

  if (keyIsDown(UP_ARROW)) {
    y = y - 6
  }

  if (keyIsDown(DOWN_ARROW)) {
    y = y + 6
  }
}
	
else { 
     x = touches[0].x
     y = touches[0].y
}


  if (dist(x*s, y, a*s, e) < 120*s + 20*s) {
	lives= lives + 1
  }
	

if ( lives > 10 && level == 1) {
o = [2, 190, 83, 226] 
eRadius = eRadius - 27
nitro = nitro + 1
level = 2
}

if ( lives > 8 && level == 2) {
eRadius = eRadius + 3
o = [212, 142, 45, 103]
nitro = nitro + 3
level = 3  
}

if ( lives > 6 && level == 3) {
eRadius = eRadius + 5
o = [283, 100, 228, 157] 
nitro = nitro + 5
level = 4
}
  
if ( lives > 4 && level == 4) {
eRadius = eRadius + 10
o = [72, 210, 294, 120] 
nitro = nitro + 7
level = 5
}

if ( lives > 2 && level == 5) {
eRadius = eRadius + 14
o = [241, 97, 122, 64] 
nitro = nitro + 9
level = 6
}


  
  for (i=0; i<4; i=i+1) {
    
        if (dist(x*s, y, p[i]*s, o[i]) < 120*s + 10*s) {
        lives= lives - 1
        }

        fill(178,34,34);
        circle(p[i]*s,o[i],eRadius*s)

        p[i] = p[i] - nitro *direction_h[i]
        o[i] = o[i] - nitro *direction_v[i]

        if (o[i] > height || o[i] < 0) {
          direction_v[i] = direction_v[i] * -1 
      }
        if (p[i] *s > width || p[i] *s < 0) {
          direction_h[i] = direction_h[i] * -1
      }
  }

  fill(228,132,0);
  circle(a*s,e,20 *s)
    
  a = a + 6*direction_h2
  e = e + 6*direction_v2
  
  
  if ( e > height || e < 0) {
	 direction_v2 = direction_v2 * -1 
}
  if (a*s > width || a*s < 0) {
    direction_h2 = direction_h2 * -1
  }
 }
  else {
  
  
  responseh.innerHTML = "Name? <input id='givename'><button onclick='restart()'>Restart</button>"
  noLoop()

}

}

	function restart() { 
        let givename = document.getElementById("givename")
		name = givename.value 
		if (name != "") { 
			scoreboard[name] = lives
			database.ref(name).set(score)
		}
        alert("Scoreboard:" + JSON.stringify(scoreboard,null,1)) 
		time = 60
		lives = 0
		loop()
		responseh.innerHTML = ""
      
      generate_leaderboard()
		onclick=generate_alltime_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()

