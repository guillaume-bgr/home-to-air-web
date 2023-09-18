export const verifyPassword = (text, inputName = 'Le mot de passe') => {
    let pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!verifyInput(text, pwdRegex)){
        return {verif:false, message: inputName +" doit être de minimum 8 caractères et doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"}
    }else{
        return {verif:true, text:verifyInput(text, pwdRegex)}
    }
}

export const verifyOnlyLetters = (text, inputName="Le nom") => {
    let lettersRegex = /^[A-Za-zéèàëêâäîïôöùûü-]*$/
    if(!verifyInput(text, lettersRegex)){
        return {verif:false, message: inputName + " ne doit contenir que des lettres"}
    }else{
        return {verif:true, text: verifyInput(text, lettersRegex)}
    }
}

export const verifyOnlyNumbers = (text, inputName = "Un nombre") => {
    let numbersRegex = /^[0-9]*$/
    if(!verifyInput(text, numbersRegex)){
        return {verif:false, message: inputName + " ne doit contenir que des chiffres"}
    }else{
        return {verif:true, text:verifyInput(text, numbersRegex)}
    }
}

export const verifyEmail = (text, inputName = "Le champs mail") => {
    let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!verifyInput(text, mailRegex)){
        return {verif:false, message: inputName + " L'email n'est pas conforme"}
    }else{
        return {verif:true, text:verifyInput(text, mailRegex)}
    }
}

export const escapeHtml = (text) => {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function verifyInput(text, regex) {
    if(text != ""){
        escapeHtml(text)
        if(!(regex.test(text))){
            return false
        }
        return text
    }else{
        return false
    }
}