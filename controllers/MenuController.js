const inquirer = require('inquirer');
const ContactController = require("./ContactController");
var d = Date.now();

 module.exports = class MenuController {
   constructor(){
    this.mainMenuQuestions = [
      {
       type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Get time and date",
          "Exit"
        ]
      }
    ]
    this.book = new ContactController();
   }

   main(){
    console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
         case "Get time and date":
           this.getDate();
           break;
         case "Exit":
           this.exit();
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
  }

  clear(){
    console.log("\x1Bc");
  }

  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
  }

  exit(){
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

  convertTimestamp(timestamp) {
    var d = new Date(timestamp),
      year = d.getFullYear(),
      month = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2),
      hh = d.getHours(),
      hour = hh,
      minutes = ('0' + d.getMinutes()).slice(-2),
      ampm = 'AM',
      time;
        
    if (hh > 12) {
      hour = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      hour = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      hour = 12;
    }
  
    time = year + '-' + month + '-' + day + ', ' + hour + ':' + minutes + ' ' + ampm;
      
    return time;
  }

  getDate(){
    this.clear();
    console.log(this.convertTimestamp(d));
    this.main();
  }

  remindMe(){
    return "Learning is a life-long pursuit";
  }
 }