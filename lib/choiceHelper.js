const sql = require('../db/query')

const deptChoices = async () => {
    const arr = await sql.getDepartments()
    const choices = arr[0]

    let choicesArr = []

    choices.forEach(e =>{
        let valueObj = {
            name: e.department_name,
            value: e.id
        }
        choicesArr.push(valueObj)
    })
    return choicesArr
}

const managerChoices = async () =>{
    const arr = await sql.getManagers()
    const choices = arr[0]
    let choicesArr = []

    choices.forEach(e =>{
        let valueObj = {
            name: e.manager_name,
            value: e.id
        }
        choicesArr.push(valueObj)
    })

    return choicesArr;
}

const roleChoices = async () =>{
    const arr = await sql.getRolesIds()
    const choices = arr[0]
    let choicesArr = []
    choices.forEach(e =>{
        let valueObj = {
            name: e.title,
            value: e.id
        }
        choicesArr.push(valueObj)
    })
    return choicesArr
}

const employeeChoices = async () =>{
    const arr = await sql.getEmployees()
    const choices = arr[0]
    let choicesArr = []

    choices.forEach(e =>{
        let valueObj = {
            name: e.first_name + '' + e.last_name,
            value: e.id
        }
        choicesArr.push(valueObj)
    })
    return choicesArr
}

module.exports = {deptChoices, managerChoices, roleChoices, employeeChoices,} 