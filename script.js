   // Function to create input fields dynamically
   function createInput(type, id, name) {
    var input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    return input;
}

// Add input fields to the form
var form = document.getElementById("myForm");
var fields = [
    ["text", "firstName", "firstName"],
    ["text", "lastName", "lastName"],
    ["text", "address", "address"],
    ["email", "email", "email"],
    ["text", "pincode", "pincode"],
    ["select", "gender", "gender", ["male", "female", "other"]],
    ["checkbox", "food1", "food", "pizza"],
    ["checkbox", "food2", "food", "burger"],
    ["checkbox", "food3", "food", "pasta"],
    ["checkbox", "food4", "food", "salad"],
    ["checkbox", "food5", "food", "sushi"],
    ["text", "state", "state"],
    ["text", "country", "country"],
    ["submit", , "submit"],
];

fields.forEach(function(field) {
    var input;
    if (field[0] === "select") {
        input = document.createElement("select");
        input.setAttribute("id", field[1]);
        input.setAttribute("name", field[2]);
        field[3].forEach(function(option) {
            var optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            input.appendChild(optionElement);
        });
    } else if (field[0] === "checkbox") {
        input = document.createElement("input");
        input.setAttribute("type", field[0]);
        input.setAttribute("name", field[2]);
        input.setAttribute("value", field[3]);
        input.id = field[1];
        var label = document.createElement("label");
        label.setAttribute("for", field[1]);
        label.textContent = field[3].charAt(0).toUpperCase() + field[3].slice(1);
        form.appendChild(input);
        form.appendChild(label);
        form.appendChild(document.createElement("br"));
        return;
    } else {
        input = createInput(field[0], field[1], field[2]);
    }
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("label")).textContent = field[2].charAt(0).toUpperCase() + field[2].slice(1) + ":";
    form.appendChild(document.createElement("br"));
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
});

// Add submit event listener
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get form values
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var pincode = document.getElementById("pincode").value;
    var gender = document.getElementById("gender").value;
    var foods = document.querySelectorAll('input[name="food"]:checked');
    var foodValues = [];
    foods.forEach(function(food) {
        foodValues.push(food.value);
    });
    var state = document.getElementById("state").value;
    var country = document.getElementById("country").value;
    
    // Append values to the table
    var table = document.getElementById("recordsTable");
    var newRow = table.insertRow(-1);
    var cells = [
        firstName,
        lastName,
        address,
        email,
        pincode,
        gender,
        foodValues.join(", "),
        state,
        country
    ];
    cells.forEach(function(cellData) {
        var cell = newRow.insertCell();
        cell.appendChild(document.createTextNode(cellData));
    });
    
    // Clear the form
    document.getElementById("myForm").reset();
});