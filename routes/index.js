var express = require("express");
var router = express.Router();
var fs = require('fs')
const MailSender = require("../class/MailSender");
const UtileLog = require("../class/UtileLog")
const arrayService = [
  "consectetur adipisicing ",
  "doloribus",
  "adipisicing",
  "consectetur",
  "Autre",
];


/* GET  page. */
router.get("/",  (req, res, next) =>{
  res.render("index", { title: "Express" });
});

router.get("/legal",  (req, res, next) =>{
  res.render("legal", { title: "Mention légal" });
});

router.get('/agence', (req, res) => {
res.render("agence",{title:"agence"})
})

router.get('/services', (req, res) => {
  res.render("services",{title:"services"})
})

router.get('/contact', (req, res) => {
 
  isLoader = false;
  res.render("contact",{title:"contact",services:arrayService,loader:isLoader})
})

/*POST  form */
router.post("/sendmail", (req, res) => {
  let {name, email, service, message } = req.body;
  let formError = [];

  if (!name || !service || !email || !message) formError.push({ empty_fileds: "Merci de remplir tous les champs" });
  if (!arrayService.includes(service)) formError.push({ empty_fileds: "Merci de sélectionner un sujet" });
  
if (formError.length > 0) {
    res.json({ formError });
  }else {
    MailSender.sendVerificationMail(name, email, service, message)
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        UtileLog.logWritingError(error,true,MailSender.sendVerificationMail.name)
        res.json({error:"Une erreur est survenue"})
      });
  }
});
module.exports = router;
