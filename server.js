const inquirer = require('inquirer')
const sql = require('./db/query')
const cTable = require("console.table")
const cHelper = require ('./lib/choiceHelper')

// add a new department

const newDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message:"Please enter the name of the Department",
            validate: (name) =>{
                if (name){
                    return true
                } else {
                    console.log("Need Name, Please enter a Department Name")
                    return false;
                }
            }
        }
    ])

    await sql.addDepartment(department)

    chooseRequest()
}

//add a new employee
 const newEmp = async () =>{
    const roleArr = await cHelper.roleChoices()
    const managerArr = await cHelper.managerChoices()
    const emp = await inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Enter Employees First Name",
            validate: (first) =>{
                if (first){
                    return true
                }else{
                    console.log("Please Enter a First Name")
                    return false
                }
            },
        },
        {
            type: "input",
            name: "last",
            message: "Enter Employees Last Name",
            validate: (last) => {
                if (last){
                    return true
                } else {
                    console.log('Please Enter a Last Name')
                    return false
                }
            },
        },
        {
            type: "list",
            name: 'role_id',
            message: "What is the Employees Role?",
            choices: roleArr,
            loop: false,
        },
        {
            type: "list",
            name: 'manager_id',
            message: "Who is the Employees Manager",
            choices: managerArr,
            loop: false,
        }
    ])

    await sql.addEmployee(emp);

    chooseRequest();
 }

 // Add a new role

 const newRole = async() =>{
    const choicesArr = await cHelper.deptChoices()
    const role = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the name of the Role",
            validate:(title) =>{
                if (title){
                    return true
                } else{
                    console.log('Please enter a role name')
                    return false
                }
            },
        },
        {
            type: "input",
            name: "salary",
            message: "What is the Salary of the Role?",
            validate: (salary) =>{
                if (salary){
                    return true
                }   else {
                    console.log('Please enter a salary amount')
                }
            }
        },
        {
            type: "list",
            name: 'department_id',
            message:"What department is the role in?",
            choices: choicesArr,
            loop: false,
        }
    ]);

    await sql.addRole(role)
    chooseRequest();
 }

 //update employee role

 const updateEmpRole = async () =>{
    const roleArr = await cHelper.roleChoices()
    const empArr = await cHelper.employeeChoices()
    const emp = await inquirer.prompt([
        {
            type: "list",
            name: "emp_id",
            message: "Which employee would you like to update?",
            choices: empArr,
            loop: false,
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employees role?",
            choices: roleArr,
            loop: false,
        }
    ])

    await sql.updateEmpRoleById(emp)
    chooseRequest()
 }

// view all departments
const viewDepartments = () =>{
    sql.getDepartments()

    .then(([rows]) => {
        console.log('\n')
        console.log(cTable.getTable(rows))
    })

    .then(() =>{
        chooseRequest()
    })
}

// view all roles
const  viewRoles = () =>{
    sql.getRoles()

    .then(([rows]) => {
        console.log('\n')
        console.log(cTable.getTable(rows))
    })

    .then(()=>{
        chooseRequest()
    })
}
// view all employees

const viewEmps = () => {
    sql.getEmps()
  
    .then(([rows]) => {
      console.log('\n');
      console.log(cTable.getTable(rows));
    })
  
    .then(()=> {
        chooseRequest();
    }) 
  }

  //view employees by department

  const viewEmpByDept = async () => {

    const deptArr = await cHelper.deptChoices();
  
    inquirer.prompt([
      {
        type: "list",
        name: "dept_id",
        message: "What department do you wish to view Employees for?",
        choices: deptArr,
        loop: false
      }
     ])
  
    .then((data) => {
      sql.getEmpByDeptId(data)
        .then(([rows]) =>{
          console.log('\n');
          console.log(cTable.getTable(rows))
          chooseRequest();
        })
    }) 
  
  }

const chooseRequest = () =>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices:[   'Add a Department',
                        'Add an Employee',
                        'Add a Role',
                        'Update an Employee Role',
                        'View ALL Employees',
                        'View ALL Roles',
                        'View All Departments',
                    ],
            loop: false,
        },
    ])

    .then((data) => {
        const {request} = data;
        console.log(request);
        //switch statement
    switch (request){
        case 'Add a Department':
            newDepartment();
            break;
        case 'Add an Employee':
            newEmp();
            break;
        case 'Add a Role':
            newRole();
            break;
        case 'Update an Employee Role':
            updateEmpRole();
            break;
        case 'View ALL Employees':
            viewEmps();
            break;
        case 'View ALL Roles':
            viewRoles();
            break;
        case 'View All Departments':
            viewDepartments();
            break;
        default: 
            break;
        }   
    })
}

chooseRequest()