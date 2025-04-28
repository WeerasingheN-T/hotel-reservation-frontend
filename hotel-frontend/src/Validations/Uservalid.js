var message1;
var message2;
var message3;

//Validate Email
export const validateEmail = (value) => {
   if (!value) {
     return message1='Email is required.';
   } else if (!/\S+@\S+\.\S+/.test(value)) {
       return message1='Email is invalid.'
   } else {
       return message1='';
   }
 };

 //Validate Password
export const validatePassword = (value) => {
   if (!value) {
       return message2='Password is required.';
   } else {
       return message2='';
   }
 };

 export const validateConfirmPassword = (value1,value2) => {
    if (value1 !== value2) {
        return message3='Confirm password does not match';
    } else {
        return message3='';
    }
  };