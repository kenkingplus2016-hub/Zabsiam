const fs = require('fs');
let html = fs.readFileSync('public/menu.html', 'utf8');

const badBlock = `                    customChoicesArr.push(choiceText); // {
                        // option_id: optId,
                        // choice: choiceText,
                        // extra: extra
                    });`;

const goodBlock = `                    customChoicesArr.push(choiceText);`;

html = html.replace(badBlock, goodBlock);

fs.writeFileSync('public/menu.html', html, 'utf8');
console.log("Fixed cleanly.");
