export function checkEmail(value){
    let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (checkEmail.test(value)) {
        return false
    } else {
        return true
    }
}

export function checkRePassword(password1, password2){
    if(password1 !== password2){
        return true
    } else {
        return false
    }
}

export function checkInputRegister(email, name ,password,repassword){
    if(email !=='' && name !=='' && password !=='' && repassword !==''){
        return false
    } else {
        return true
    }
}

export function checkInputEmpty(value){
    if(value!==''){
        return false
    } else {
        return true
    }
}