require("dotenv").config()
var fs = require('fs');

var str = `
export const environement = {
    ROOT_URL: '${process.env.ROOT_URL}'
};
`;
fs.writeFile("./src/environement/environement.ts", str, function(err) {
    if(err) {
        return console.log(err);
    }
    
});