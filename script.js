function regis(){
    let user = {
        uname:uname.value,
        em:em.value,
        psw:psw.value,
        income:[],
        expense:[],
        saving:0,
        spent:0
    }
    if(user.uname==""||user.em==""||user.psw==""){
        alert("Please enter all details!")
    }
    else{
        if(user.em in localStorage){
            alert("A profile with this email already exist!")
        }
        else{
            localStorage.setItem(user.em,JSON.stringify(user))
            alert("Details added succesfully.")
            window.location="./index.html"
        }
        uname.value=""
        em.value=""
        psw.value=""
    }
}
function login(){
    if(em1.value==""||psw1.value==""){
        alert("Please enter all details!")
    }
    else{
        if(em1.value in localStorage){
            let user1 = JSON.parse(localStorage.getItem(em1.value))
            if(user1.psw == psw1.value){
                sessionStorage.setItem("users",JSON.stringify(user1))
                alert('Login successfull.')
                window.location="./home.html"
            }
            else{
                alert('Login failed! Wrong password.')
            }
        }
        else{
            alert('Login failed! Wrong email.')
            em1.value=""
        }
        psw1.value=""
    }
}
var usern = JSON.parse(sessionStorage.getItem("users"))
headi.innerHTML = `Welcome ${usern.uname}`
dispbal.innerHTML='Rs. '+usern.saving
dispsp.innerHTML='Rs. '+usern.spent
for(let i of usern.income){
    htdata = `<tr>
                <td>${i.type}</td>
                <td>${i.amtt}</td>
                <td>${i.date}</td>
                <td>${usern.saving}</td>
            </tr>`
    indet.innerHTML+=htdata
}  
for(let i of usern.expense){
    htdata = `<tr>
                <td>${i.type}</td>
                <td>${i.amtt}</td>
                <td>${i.date}</td>
                <td>${usern.saving}</td>
            </tr>`
    exdet.innerHTML+=htdata
}
function income(){
    if(desi.value==""||amti.value==""){
        alert("Please fill both feilds.")
    }
    else{
        var useri = JSON.parse(sessionStorage.getItem("users"))
        let user2 = JSON.parse(localStorage.getItem(useri.em))
        const date = new Date().toString().slice(4,15)
        inc = {
            type:desi.value,
            amtt:amti.value,
            date:date
        }
        user2.income.push(inc)
        user2.saving+=Number(amti.value)
        alert("Income added successfully.")
        dispbal.innerHTML='Rs. '+user2.saving
        dispsp.innerHTML='Rs. '+user2.spent  
        localStorage.setItem(user2.em,JSON.stringify(user2))
        sessionStorage.setItem("users",JSON.stringify(user2))
        desi.value=""
        amti.value=""
        indet.innerHTML+=`
            <tr>
                <td>${inc.type}</td>
                <td>${inc.amtt}</td>
                <td>${inc.date}</td>
                <td>${user2.saving}</td>
            </tr>`
    }
}
function expense(){
    if(dese.value==""||amte.value==""){
        alert("Please fill both feilds.")
    }
    else{
        var usere = JSON.parse(sessionStorage.getItem("users"))
        let user3 = JSON.parse(localStorage.getItem(usere.em))
        const date = new Date().toString().slice(4,15)
        exp = {
            type:dese.value,
            amtt:amte.value,
            date:date
        }
        user3.expense.push(exp)
        user3.saving-=Number(amte.value)
        user3.spent+=Number(amte.value)
        alert("Expense added successfully.")
        dispbal.innerHTML='Rs. '+user3.saving
        dispsp.innerHTML='Rs. '+user3.spent  
        localStorage.setItem(user3.em,JSON.stringify(user3))
        sessionStorage.setItem("users",JSON.stringify(user3))
        dese.value=""
        amte.value=""
        exdet.innerHTML+=`
            <tr>
                <td>${exp.type}</td>
                <td>${exp.amtt}</td>
                <td>${exp.date}</td>
                <td>${user3.saving}</td>
            </tr>`
    }
}
function logout(){
    sessionStorage.clear()
    window.location = "./index.html"
}