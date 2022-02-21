"use strict";
//NOTE FRAMEWORK IMPORTER TOUTE LES PACK AVANT D'EXECUTÉ LE PROGRAMME
const hashPassword = (pPassword) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pPassword, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const loadFileChanger = (pFilePath, pReplace1, pReplace2, pValue1, pValue2) => {
  try {
    var fileChanger = fs.readFileSync(pFilePath).toString(); //Charger le fichier à modifier
    if (fileChanger.includes(pReplace1) && fileChanger.includes(pReplace2)) {
      fileChanger = fileChanger.replace(pReplace1, pValue1); //Remplace le pRplace par la value1
      fileChanger = fileChanger.replace(pReplace2, pValue2);
    }
  } catch (error) {
    logWritingError(error, true, loadFileChanger.name);
  }
  return fileChanger;
};

const logWritingError = (pError, pIsFullError, pNameFunction) => {
  const fs = require("fs");
  const DIR_LOG = "./log";
  const NAME_LOG = "error_log.txt";
  let info_Name = "Error in the function => ";
  //Ce contrôle permet de déterminer si le dossier exsiste + fichier
  //sinon on le crée
  if (!fs.existsSync(DIR_LOG)) {
    fs.mkdir(DIR_LOG, (err) => {
      if (err) throw err;

      if (!fs.existsSync(`${DIR_LOG}/${NAME_LOG}`)) {
        fs.writeFile(`${DIR_LOG}/${NAME_LOG}`, "", function (err) {
          if (err) throw err;
        });
      }
    });
  }
  let logger = fs.createWriteStream(`${DIR_LOG}/${NAME_LOG}`, {
    flags: "a",
  });

  if (!pError) return;
  if (!pIsFullError) pIsFullError = false;
  if (!pNameFunction) (pNameFunction = ""), (info_Name = "");
  if (pIsFullError) pError = pError.stack;

  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let time = hour +":"+minutes+":"+seconds
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  
  today = `${dd}/${mm}/${yyyy}`;

  logger.write("\n");
  logger.write(`=============================[${today} ${time}]============================`);
  logger.write("\n");
  logger.write("\n");
  logger.write(`${info_Name}[${pNameFunction}]`);
  logger.write("\n");
  logger.write("\n");
  logger.write(pError.toString());
  logger.write("\n");
  logger.write("===================================================================");
  logger.write("\n");
  logger.end();
};

module.exports = {
  logWritingError,
  loadFileChanger,
};
