function checkForName(inputText) {

    inputText = inputText.toLowerCase();
    inputText = inputText[0].toUpperCase()+inputText.slice(1);
    
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain")
    }
}

export { checkForName }