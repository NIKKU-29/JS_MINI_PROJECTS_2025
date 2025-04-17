//when IT IS DEEMED THAT SOMETHING WOULD BE RETURN

const { rejects } = require("assert");
const { error, log } = require("console");
const { resolve } = require("path");

// const promiseOne = new Promise( (resolve,reject) => {

//         setTimeout(() => {
//             console.log('THIS IS PROMISE ONE');
//             resolve();
//         }, 2000);

// }).then(() =>{
//     console.log('PROMISE ONE WAS RESOLVED');
// })



//otherwise in case of failure we have to use catch
//catching ERRORS
// const promiseTwo = new Promise( (resolve,reject) => {

//         let error = true;

//         if(!error)
//         {
//             setTimeout(() => {
//                 console.log('THIS IS PROMISE ONE');
//                 resolve();
//             }, 2000);
//         }
//         else {
//             reject();
//         }

// }).then(() =>{
//     console.log('PROMISE ONE WAS RESOLVED');
// }).catch( () => {
//     console.log('SOMETHING WHEN WRONG');
// });



//access the real data

// const DataAccess = new Promise ( (resolve,reject) => {
    
//     let error = false;
//     if(!error)
//     {
//         setTimeout(() => {
//             resolve({
//                 username : `NIKKU`,
//                 Password : `123`,
//                 Age      : `22`
//             });
//         }, 3000);
//     }

//     else{
//             reject('CANT CONNECT TO SERVER');
//     }


// });

// DataAccess.then((DATA) => {
//             console.log(DATA);
//             console.log(DATA.Password);
// }).catch((MSG) => {
//         console.log(MSG);
// });



//promise using Async Code


