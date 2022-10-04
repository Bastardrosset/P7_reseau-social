//************ * Gestion des code erreurs et réponses * ************//

// Gestion des erreurs création de compte
module.exports.signUpErrors = (error) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (error.message.includes('pseudo')) {
        return errors.pseudo = "Pseudo incorrect ou déja pris !";
    }

    if (error.message.includes('email')) {
        return errors.email = "Email incorrect ou déja enregistré !!";
    }

    if (error.message.includes('password')) {
        return errors.password = "Le mot de passe doit faire 6 caractères minimum !";
    }

    return errors
};

// Gestion des erreurs identification
exports.loginErrors = (error) => {
    let errors = { email: '', password: '' };

    if (error.message.includes('email')) {
        errors.email = "Email inconnu !";
    }

    if (error.message.includes('password')) {
        errors.password = "Le mot de passe ne correspond pas à celui enregistré !";
    }

    return errors
};


//Gestion des erreurs images
exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' };

    if (err.message.includes('Photo invalide')){
        errors.format = "Format de la photo invalide !";
    }

    if (err.message.includes('Max size')){
        errors.maxSize = "Le fichier dépasse 500ko !"
    }

    return errors
}