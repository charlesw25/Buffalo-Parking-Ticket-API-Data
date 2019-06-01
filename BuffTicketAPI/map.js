function loadMap(){

    Plotly.setPlotConfig({
      //enter token here
      mapboxAccessToken: "Token Goes Here"
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
          var mapParams = getMapParams(this.response);
          Plotly.plot('map', mapParams.data, mapParams.layout);
      }
  };
  xhttp.open("GET", "/tickets");
  xhttp.send();
}


function setupMapData(arr){
  returnarray = [{type:"scattermapbox",
    mode:"markers",
    marker:{
      size:4,
      color:"rgb(0,0,255)"
    },
    lat:[],
    lon:[],
    text:[]
    }]

  var i;

  for(var i of arr){
    returnarray[0]["lat"].push(i[0])
    returnarray[0]["lon"].push(i[1])
    returnarray[0]["text"].push(i[2])
  }

  return returnarray
}


function findCenter(arr){
  LatArray = [];
  LonArray = [];
  var i;
  centerArray = [];

  for(var i of arr){
    LatArray.push(i[0]);
    LonArray.push(i[1]);
  }

  LatArray.sort(function (a, b) {return a - b});
  LonArray.sort(function (a, b) {return a - b});
  
  LatSum = LatArray[0] + LatArray.slice(-1).pop();
  LonSum = LonArray[0] + LonArray.slice(-1).pop();

  LatCenter = LatSum/2;
  LonCenter = LonSum/2;

  centerArray.push(LatCenter);
  centerArray.push(LonCenter);
  
  return centerArray;
}


function setupMapLayout(arr){
  var return_object = {
    hovermode:'closest',
    mapbox: {
      style:"satellite-streets",
      zoom:11,
      center: {
        lat:findCenter(arr)[0],
        lon:findCenter(arr)[1]
      }
    }
  }

  return return_object
}


function getMapParams(JSONstring){
  var jsonfile = JSON.parse(JSONstring);
  var returnMap = {
    data:[],
    layout:{}
  };
  var i;
  
  for(var i of jsonfile){
    i[0] = parseFloat(i[0])
    i[1] = parseFloat(i[1])
    
  } 

  returnMap["data"] = setupMapData(jsonfile)
  returnMap["layout"] = setupMapLayout(jsonfile) 

  return returnMap
}
