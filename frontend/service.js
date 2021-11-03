/**
 * Disable Chrome security
 * google-chrome --disable-web-security --allow-file-access-from-files --user-data-dir="/home/yanick/Desktop/chrome"
 */

var xhttp = new XMLHttpRequest();


const backendBaseUrl = "http://localhost:8080/engine-rest"
let backendId = ""
let activityName = ""
let on = false;

// http://localhost:8080/engine-rest/process-instance/cd6a7fd6-3bde-11ec-b651-0242ac110002/activity-instances
// http://localhost:8080/engine-rest/task


const startBtn = document.querySelector('#start');
const drinkBtn = document.querySelector('#drink')
const milkLevels = document.querySelector("#milk-levels");
const waterLevels = document.querySelector("#water-levels");
const beansLevels = document.querySelector("#beans-levels");
const sugarLevels = document.querySelector("#sugar-levels");
const display = document.querySelector("#display")
const selector = document.querySelector('#select-coffee')

const fillWaterBtn = document.querySelector('#fill-water')
const fillMilkBtn = document.querySelector('#fill-milk')
const fillBeansBtn = document.querySelector('#fill-beans')
const fillSugarBtn = document.querySelector('#fill-sugar')

getProcessInstanceId()

startBtn.addEventListener("click", () => {
    power(on)
})

drinkBtn.addEventListener("click", () => {
    drinkCofee(selector.value)
    //drinkBtn.classList.remove("invisible")
})

fillWaterBtn.addEventListener("click", () => {
    fill("water")
})

fillMilkBtn.addEventListener("click", () => {
    fill("milk")
})

fillBeansBtn.addEventListener("click", () => {
    fill("beans")
})

fillSugarBtn.addEventListener("click", () => {
    fill("sugar")
})



var intervalID = window.setInterval(standBy, 200);
let test = 0
function standBy() {
    if(test == 0){
        test++
        getLevels()
    }else if(test == 1){
        test++
        getDisplay()
    }else if (test ==2) {
        test++
        getActivityName()
    }else {
        test = 0
        const displayText = display.innerText.split(" : ")[1] 
        if(displayText === "Bereit") {
            enableBtn(fillWaterBtn)
            enableBtn(fillMilkBtn)
            enableBtn(fillBeansBtn)
            enableBtn(fillSugarBtn)
            enableBtn(drinkBtn)
            console.log("3")
        } else if(displayText == "Mahlen"){
            disableBtn(fillWaterBtn)
            disableBtn(fillMilkBtn)
            disableBtn(fillBeansBtn)
            disableBtn(fillSugarBtn)
            disableBtn(drinkBtn)
            console.log("4")
        } else if(displayText.split(":")[0] == "Die folgenden Füllstände sind niedrig") {
            enableBtn(fillWaterBtn)
            enableBtn(fillMilkBtn)
            enableBtn(fillBeansBtn)
            enableBtn(fillSugarBtn)
        }
    }
 //getDisplay()
}

function enableBtn(button) {
    button.classList.remove("disabled")
    button.disabled = false
}

function disableBtn(button) {
    button.classList.add("disabled")
    button.disabled = true
}

function getProcessInstanceId() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            backendId = JSON.parse(this.responseText)[0].id
        }
    }

    xhttp.open("GET", `${backendBaseUrl}/process-instance`, true)
    xhttp.send()
}

function fill(name) {
    xhttp.onreadystatechange = function () {
        if (this.status == 204) {
            getLevels()
        }
    };

    xhttp.open("POST", `${backendBaseUrl}/message`, true)
    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({
        messageName: `fill_${name}`
    }))
}

function drinkCofee(coffeeStr) {
    xhttp.onreadystatechange = function () {
        if (this.status == 204) {
            //drinkBtn.classList.add("invisible")
            getLevels()
            getDisplay()
        }
    };

    xhttp.open("POST", `${backendBaseUrl}/message`, true)
    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({
        messageName: "selection",
        processVariables: {
            type: {
                type: "string",
                value: coffeeStr
            }
        }
    }))
}
function getDisplay() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            display.innerText = `Diplay : ${JSON.parse(this.responseText).value}`
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/variables/display`, true)
    xhttp.send()
}

function getActivityName() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            activityName = JSON.parse(this.responseText).childActivityInstances[0].activityName
            if(activityName == "Standby") {
                on = true
                startBtn.classList.add('on')
                startBtn.innerText = "Power on"
            } else {
                on = false
                startBtn.classList.remove('on')
                startBtn.innerText = "Power off"
            }
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/activity-instances`, true)
    xhttp.send()
}

function getLevels() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            milkLevels.innerText = `Milk: ${JSON.parse(this.responseText).value.milk}`
            waterLevels.innerText = `Water: ${JSON.parse(this.responseText).value.water}`
            beansLevels.innerText = `Beans: ${JSON.parse(this.responseText).value.beans}`
            sugarLevels.innerText = `Sugar: ${JSON.parse(this.responseText).value.sugar}`
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/variables/levels`, true)
    xhttp.send()
}

function power() {
    xhttp.open("POST", `${backendBaseUrl}/message`, true)

    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")

    if (!on) {
        xhttp.send(JSON.stringify({
            messageName: "power_on"
        }));
    } else {
        xhttp.send(JSON.stringify({
            messageName: "power_off"
        }));
    }
}
