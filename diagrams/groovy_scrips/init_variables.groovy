 // types
 execution.setVariable("types", ["black", "espresso", "mokka", "cappuccino", "latte_macciato", "milk"]);
 
// levels
execution.setVariable("levels", ["milk": 100, "water": 100, "beans": 100, "sugar": 100]);

// deficiencies
execution.setVariable("deficiencies", []);

// display
execution.setVariable("display", "initialisieren...");


// Kaffee herauslassen
execution.setVariable("levels", [
    "milk": execution.getVariable("levels")["milk"] - ingredientAmounts["milk"],
    "water": execution.getVariable("levels")["water"] - ingredientAmounts["water"],
    "beans": execution.getVariable("levels")["beans"] - ingredientAmounts["beans"], 
    "sugar": execution.getVariable("levels")["sugar"]- ingredientAmounts["sugar"]
    ]);