//Fonction qui permet de traiter les données timestamp renvoyer par mongo et les transformes en caractères commun
export const dateParser = (num) => {
    let options = {
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        year: "numeric", 
        month:"short", 
        day:"numeric",
        // weekday: "long", pour afficher le jour de la semaine 
    };
    let timestamp = Date.parse(num);
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString();
}
//Function qui permet de traiter les données timesstamp de comment object de mongo
export const timestampParser = (num) => {
    let options = {
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        year: "numeric", 
        month:"short", 
        day:"numeric",
    };
    let date = new Date(num).toLocaleDateString("fr-FR", options);

    return date.toString();
    
};
//Fonction permet de verifier si un champ est rempli
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};