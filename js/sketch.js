var schoolName = [];
var sepKeyWords = [];
var tagList = [];
var keywords = [];
var posX = [];
var posY = [];
var designText = [];
var counts = [];


function preload() {
  articleText = loadStrings('input/article.txt');
  listOfWords = loadStrings('assets/20k.txt');
  designSchool = loadTable('input/design_school.csv', 'csv');
  keywordsTable = loadTable('input/keywords.csv', 'csv');
}

function setup() {
  print(keywords);
  print(keywordsTable.getString(1, 0));

  colorMode(HSB, 360);
  numOfSchool = designSchool.getRowCount();
  getKeyWords();
  getDesignText();

  let articleKeys = articleKeyWords();
  let places = articlePos(articleKeys[0], articleKeys[1]);
  print(places);

  drawDivs(places);

}


function getKeyWords() {
  for (let r = 1; r < keywordsTable.getRowCount(); r++) {

    if (keywordsTable.getString(r, 1) != "" || keywordsTable.getString(r, 2) != "") {
      keywords.push(keywordsTable.getString(r, 0));
      if (keywordsTable.getString(r, 1) == "") {
        posX.push(5);
      } else {
        posX.push(Number(keywordsTable.getString(r, 1)));
      }
      if (keywordsTable.getString(r, 2) == "") {
        posY.push(5);
      } else {
        posY.push(Number(keywordsTable.getString(r, 2)));
      }
    }
  }
}

function articleKeyWords() {
  let positions = [];


  //convert all csv into an array
  for (let i = 0; i < designText.length; i++) {
    let count = 0;
    designText[i] = designText[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    designText[i] = designText[i].toLowerCase();
    designText[i] = designText[i].split(/\W+/);
  }
  //print(keywords);

  for (let x = 0; x < designText.length; x++) {
    positions[x] = [];
    for (let y = 0; y < 0; y++) {
      positions[x][y] = x * y;
    }
  }
  for (let i = 0; i < designText.length; i++) {
    for (let j = 0; j < designText[i].length; j++) {
      for (let k = 0; k < keywords.length; k++) {
        if (designText[i][j] == keywords[k]) {
          //  print(keywords[k]);
          positions[i].push(keywords[k]);

        }
      }
    }
  }

  return [positions, designText];
}

function articlePos(keys, article) {
  let totalLength = 0;
  print(keys);
  let placeX = [];
  let placeY = [];
  for (let i = 0; i < article.length; i++) {
    totalLength += article[i].length;
  }
  let standardLength = totalLength / article.length;


  for (let i = 0; i < keys.length; i++) {
    let keyX = 0;
    let keyY = 0;
    for (let j = 0; j < keys[i].length; j++) {
      for (let r = 1; r < keywordsTable.getRowCount(); r++) {
        if (keys[i][j] == keywordsTable.getString(r, 0)) {
          print("Number(keywordsTable.getString(r, 1))");
          keyX += Number(keywordsTable.getString(r, 1));
          keyY += Number(keywordsTable.getString(r, 2));
          //  placeX[i].push(Number(keywordsTable.getString(r, 1)));
          //placeY[i].push(Number(keywordsTable.getString(r, 2)));
        }
      }
    }

    print(article[i].length);
    print(totalLength);
    print("keyX: " + keyX);
    print("keyY: " + keyY);

    //    let weightedX = (standardLength / article[i].length) * keyX;
    //  let weightedY = (standardLength / article[i].length) * keyY;
    keyX = map(keyX, 0, 200, 0, windowWidth * 2);
    print("range");


    keyY = map(keyY, 100, 350, 0, windowHeight * 2)
    placeX.push(keyX);
    placeY.push(keyY);
  }

  return [placeX, placeY];
}



function getDesignText() {

  for (let r = 0; r < designSchool.getRowCount(); r++) {
    designText.push(designSchool.getString(r, 1));

  }

  return designText;

}




function drawDivs(places) {
  for (let r = 0; r < designSchool.getRowCount(); r++) {
    schoolName.push(designSchool.getString(r, 0));
    let tags = createDiv('');
    let x = random(windowWidth - 187, 0);
    let y = random(windowHeight - 284, 0);
    tags.addClass('tags');
    //    print("P: " + places[0]);
    tags.position(places[0][r], places[1][r]);

    let name = createDiv(designSchool.getString(r, 0));
    name.addClass('name');
    print(name.elt.innerHTML);
    let img = createImg('images/' + name.elt.innerHTML + '.png');
    img.size(284, 187);
    img.addClass('img');

    let body = select('.container');
    body.child(tags);

    tags.child(name);
    tags.child(img);
    tagList.push(tags);
  }
}