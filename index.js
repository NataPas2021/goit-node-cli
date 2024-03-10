import * as contactsMethods from "./contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsMethods.listContacts();
      return console.table(allContacts);
      //break;

    case "get":
      const oneContact = await contactsMethods.getContactById(id);
      return console.log(oneContact);
      //break;

    case "add":
      const newContact = await contactsMethods.addContact(data);
      return console.log(newContact);
      //break;

    case "remove":
      const deleteContact = await contactsMethods.removeContact(id);
      return console.log(deleteContact);
      //break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
