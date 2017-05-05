let currentCatID = "";
let currentDogID = "";
let currentCatURL = "";
let currentDogURL = "";

function newMatchup(){
  getMatchup();
}

function getMatchup(){ //get new GIFs from GIPHY and update view
 let cat = document.getElementById("cat");
 let dog = document.getElementById("dog");
 cat.src = "";
 dog.src = "";

 var URL = new Array();
 URL[0] = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+'cat';
 URL[1] = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+'dog';

var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
request1.open("GET", URL[0], true);
request2.open("GET", URL[1], true);
request1.onload = function(oEvent) {
  let catData = JSON.parse(request1.responseText).data.image_url;
  document.getElementById("cat").src = catData;
  currentCatID = JSON.parse(request1.responseText).data.id;
  currentCatURL = catData;
}
request2.onload = function(oEvent){
  let dogData = JSON.parse(request2.responseText).data.image_url;
  document.getElementById("dog").src = dogData;
  currentDogID = JSON.parse(request2.responseText).data.id;
  currentDogURL = dogData;
}
request1.send();
request2.send();
}

function updateTopGIFS(top){  //retrieves top three GIFs by ID, displays them in view
  var URL = new Array();
    let first = top[0][0];
    if(first !== undefined){
      URL[0] = 'http://api.giphy.com/v1/gifs/'+first+'?api_key=dc6zaTOxFJmzC';
      var req1 = new XMLHttpRequest();
      req1.open("GET", URL[0], true);
      req1.onload = function(oEvent) {
        let oneData = JSON.parse(req1.responseText).data.images.original.url;
        let oneObj = document.getElementById("one");
        oneObj.src = oneData;
        oneObj.style.border = "5px solid #000000";
        oneObj.innerHTML ="";
      }
      req1.onerror = function() {
        console.log('connection error');
      };
      req1.send();
    }

    let second = top[1][0];
    if(second !== undefined){
      URL[1] = 'http://api.giphy.com/v1/gifs/'+second+'?api_key=dc6zaTOxFJmzC';
      var req2 = new XMLHttpRequest();
      req2.open("GET", URL[1], true);
      req2.onload = function(oEvent){
        let twoData = JSON.parse(req2.responseText).data.images.original.url;
        let twoObj = document.getElementById("two");
        twoObj.src = twoData;
        twoObj.style.border = "5px solid #000000";
        twoObj.innerHTML ="";
      }
      req2.onerror = function() {
        console.log('connection error');
      };
      req2.send();
    }

    let third = top[2][0];
    if(third !== undefined){
      URL[2] = 'http://api.giphy.com/v1/gifs/'+third+'?api_key=dc6zaTOxFJmzC';
      var req3 = new XMLHttpRequest();
      req3.open("GET", URL[2], true);
      req3.onload = function(oEvent){
        let threeData = JSON.parse(req3.responseText).data.images.original.url;
        let threeObj = document.getElementById("three");
        threeObj.src = threeData;
        threeObj.style.border = "5px solid #000000";
        threeObj.innerHTML = "";
      }
      req3.onerror = function() {
        console.log('connection error');
      };
      req3.send();
    }
}

function getURL(key, i){ //
  URL = 'http://api.giphy.com/v1/gifs/'+key+'?api_key=dc6zaTOxFJmzC';
  var req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = function(oEvent){
    let data = JSON.parse(req.responseText).data.images.original.url;
    let obj = document.getElementsByTagName("img")[i];
    obj.src = data;
    //console.log(obj.hasEvent);
    if(obj.hasEvent !== true){
      //console.log("YO");
      obj.addEventListener('click', function(event) {
        copyTextToClipboard(data);
        let id = '#toast' + i;
        $(id).fadeIn(400).delay(400).fadeOut(400);
      });
      obj.hasEvent = true;
  }
  }
  req.onerror = function() {
    console.log('connection error');
  };
  req.send();
}
