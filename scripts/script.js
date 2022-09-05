$(onReady);

// global array of employee info
let employeeData =[];
    
    
    
    // ~~~~~~~~~~~SAMPLE EMPLOYEES~~~~~~~~~~~
    // {
    //     firstName: 'Joe',
    //     lastName: 'Johnson',
    //     idNumber: 11111,
    //     jobTitle: 'firstEntryGUy',
    //     salary: 1000
    // },
    // {
    //     firstName: 'Jane',
    //     lastName: 'Anderson',
    //     idNumber: 22222,
    //     jobTitle: 'secondEntryGal',
    //     salary: 2000
    // }
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function onReady(){
    console.log('Jq and Js')

    // click handler for submit button.
    $('#submitButton').on('click', submitButton);

    // click handler for delete button.
    $('#tableBody').on('click', '#deleteButton', deleteButton);


}

// submitButton - collects info from form and stores it as an object.
// Then pushes this object to global array. Monthly costs are calculated
// using getMonthlyCost. The DOM table is emptied and rebuilt using updated
// global array with the buildTable function.

function submitButton(){
    // TEST: console.log('in submitButton')

    // create new employee object
    let thisEmployee = {
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        idNumber: Number($('#idNumberIn').val()),
        jobTitle: $('#jobTitleIn').val(),
        salary: Number($('#annualSalaryIn').val())
    }
    //TEST: console.log(thisEmployee);

    // push new object to global array
    employeeData.push(thisEmployee);
    //TEST: console.log(employeeData[0]);

    // use getMonthlyCost to return total monthly costs and assign this to variable
    let monthlyCost = getMonthlyCost(); //should return the monthly cost
    // TEST: console.log(monthlyCost);

    // use buildTable to assign updated array to DOM, should take monthlyCost as arguement
    buildTable(monthlyCost); // 

} // end submitButton


// this function calculates the monthly cost based on the annual salary information
// from the global array and returns the monthly cost.
function getMonthlyCost(){
    //TEST: console.log('in getMonthlyCost');

    // loop over each employee, adding their salary to yearlyCost
    let yearlyCost = 0;
    for(let employee of employeeData){
        yearlyCost += employee.salary;

        // TEST: console.log('Employee Salary: ', employee.salary, 'Yearly Cost: ', yearlyCost);
        
    }
    //TEST: console.log('Yearly Cost: ', yearlyCost);

    // divide montlyCost by 12 (12 months in a year), assign monthlyCost and return
    let monthlyCost = yearlyCost/12

    return monthlyCost
}

// This function builds the table on the DOM using the global array.
// If monthly costs exceed $20,000 it will turn the table footer background color
// red. It takes the total montly cost as an arguement
function buildTable(monthlyCost){
    // TEST: console.log('In Build Table', monthlyCost);

    // empty table body
    $('#tableBody').empty();

    // loop over each employee object from global array
    // append each employee key to table in DOM along with delete button
    // assign the <tr> data attribute ==> data-id = employee ID number. 
    // This will be used to find the employee in the global array when 
    // they are deleted from the DOM.
    for(let employee of employeeData){
        $('#tableBody').append(`
            <tr class="tableRow" data-id="${employee.idNumber}">
                <td>${employee.lastName}, ${employee.firstName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>$${employee.salary}</td>
                <td><button id="deleteButton" type="button">X</button></td>
            </tr>
        `);
    }

    updateMonthlyCost(monthlyCost);
    
 
}

function updateMonthlyCost(monthlyCost){
   // empty footer then append new monthly cost to table footer
   $('#totalCostText').empty();
   $('#totalCostText').append(`Total Monthly Costs: $${monthlyCost}`);

    // if montly cost is greater than 20000, add warning class to footer
    // warning class adds red background color.
    // remove the red background if under 20000.
   if(monthlyCost > 20000){
       $('#totalCost').addClass('warning');
   } else{
       $('#totalCost').removeClass('warning');
   }

}





// enables functionality of delete button, which deletes the row it is in.
function deleteButton(event){

    // assign ID number data from employee <tr> element to variable.
    let employeeIDData = $(event.target).closest('.tableRow').data('id');

    // compare variable to ID number of each employee in global array. 
    // when it matches, splice that employee object out and break
    for(let i = 0; i<employeeData.length; i++){
        if(employeeData[i].idNumber === employeeIDData){
            let removedEmployee = employeeData.splice(i,1);
            // TEST: console.log('Employee Removed From Global Array', removedEmployee);
            break;
        }
    }

    // update monthly cost and append to DOM
    updateMonthlyCost(getMonthlyCost());


    // removes employee row from table
    $(event.target).closest('.tableRow').remove();

    // REMOVE EMPLOYEE FROM GLOBAL ARRAY
    
}






// Add if time:
// Focus style for form
// remove employee from global array when deleted, update total monthly cost


// Double Check:
// Does red go away when total monthly costs is below 20000