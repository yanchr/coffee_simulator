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
    "milk": , execution.getVariable("levels")["milk"] - 10,
    "water": execution.getVariable("levels")["water"] - 20,
    "beans": execution.getVariable("levels")["beans"] - 10, 
    "sugar": execution.getVariable("levels")["sugar"]]) - 10;

