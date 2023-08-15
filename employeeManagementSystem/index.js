(async function () {
    const data = await fetch('./employees.json')
        .then(response => response.json())
        .then(data => data);
    let employees = [...data];
    const modal = document.getElementById("modal");

    function showEmployeeList() {
        const employeeList = document.getElementById('employee_list');
        if (employeeList.children.length) employeeList.innerHTML = '';

        const employeeCard = document.createElement('div');
        const name = document.createElement("h1")
        const crossIcon = document.createElement('img');
        crossIcon.src = "./images/cross.png";
        employeeCard.className = "employee_card";
        employeeCard.appendChild(name);
        employeeCard.appendChild(crossIcon);

        employees.forEach(employee => {
            const newEmployee = employeeCard.cloneNode(true);
            newEmployee.querySelector('h1').innerText = employee.Name;
            employeeList.appendChild(newEmployee);
        })
    }

    const showDetail = (name) => {
        const nameElement = document.getElementById("employee_name");
        const designationElement = document.getElementById("employee_designation");
        const imageElement = document.getElementById("employee_image");
        if (name) {
            employees.forEach(employee => {
                if (employee.Name === name) {
                    nameElement.innerText = employee.Name;
                    designationElement.innerText = employee.Designation;
                    imageElement.src = employee.image ? employee.Image : "./images/defaultEmployeeImage.avif";
                }
            })
        } else {
            nameElement.innerText = employees[0].Name;
            designationElement.innerText = employees[0].Designation;
            imageElement.src = employees[0].image ? employees[0].Image : "./images/defaultEmployeeImage.avif";
        }
    }

    const updateEmployeeList = (name) => {
        let promiseObject = new Promise((resolve, reject) => {
            employees = employees.filter((employee) => employee.Name !== name)
            if (employees.length >= 0) {
                resolve(employees)
            } else {
                reject("There is an error in employee list")
            }
        })
        return promiseObject
    }

    const addEmployeeData = (obj) => {
        employees = [...employees, obj];
    }




    document.getElementById('employee_list').addEventListener('click', async (e) => {
        if (e.target.tagName === "IMG") {
            const name = e.target.previousSibling.innerText;
            const list = await updateEmployeeList(name)
            showEmployeeList()
        } else {
            if (e.target.tagName === "H1") {
                const name = e.target.innerText;
                showDetail(name)
            } else {
                const name = e.target.querySelector('h1').innerText
                showDetail(name)
            }

        }
    })

    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();
        const Name = document.getElementById('name').value;
        const Designation = document.getElementById('designation').value;
        const Image = document.getElementById("img_url").value;
        const obj = {
            Name,
            Designation,
            Image
        }
        addEmployeeData(obj);
        showEmployeeList()
        modal.style.display = "none";
    })

    document.getElementById('add_mployee').addEventListener('click', () => {
        modal.style.display = "flex"
    })

    showEmployeeList()
    showDetail()


})()


