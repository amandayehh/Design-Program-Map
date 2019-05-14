var design_text = [];

function preload() {
  table = loadTable('input/design_school.csv', 'csv');
}

function setup() {
  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++) {
    //    print(table.getString(r, 1));
    design_text.push(table.getString(r, 1));
  }
  //  getText();
}

function getText() {
  //print(design_text);
}