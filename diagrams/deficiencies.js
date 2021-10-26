// add

// Water
deficienies.push("Wasser");

// Milk 
deficienies.push("Milch");

// Beans 
deficienies.push("Bohnen");

// Sugar 
deficienies.push("Zucker");

// remove
// Water
const index = deficienies.indexOf("Wasser");
if (index > -1) {
  deficienies.splice(index, 1);
}

// Milk
const index = deficienies.indexOf("Milch");
if (index > -1) {
  deficienies.splice(index, 1);
}

// Beans
const index = deficienies.indexOf("Bohnen");
if (index > -1) {
  deficienies.splice(index, 1);
}

// Sugar
const index = deficienies.indexOf("Zucker");
if (index > -1) {
  deficienies.splice(index, 1);
}

${deficienies.length > 0}



