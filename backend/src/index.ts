import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

//function: Running , listening port 3000
function main() {
  app.listen(app.get('port'));
  console.log("listening port", app.get('port'));
}


main();