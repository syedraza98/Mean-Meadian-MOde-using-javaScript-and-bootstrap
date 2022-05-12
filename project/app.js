function showregister() {
    var n = document.getElementById('login')
    var m = document.getElementById('register')
    m.classList.remove("fade")
    n.classList.add("fade")
}
function showlogin() {
    var m = document.getElementById('login')
    var n = document.getElementById('register')
    m.classList.remove("fade")
    n.classList.add("fade")
}
function homepage() {
    var m = document.getElementById('login')
    var n = document.getElementById('register')
    var h = document.getElementById('home')
    m.classList.add("fade")
    n.classList.add("fade")
    h.classList.remove('fade')
}
window.onload = function () {
    var q = JSON.parse(window.localStorage.getItem('login'))
    if (q !== null) {

        if (q.user) {
            homepage()
        }
    }
}
function register() {
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    var email = document.getElementById('getemail');
    var pass = document.getElementById('getpass');
    var confpass = document.getElementById('getpassconfirm');
    if (pass.value === confpass.value) {
        var userData = { 'email': email.value, 'pass': pass.value }
        users.push(userData)
        localStorage.setItem('Users', JSON.stringify(users));
        // const newuser = new User(email.value,pass.value)
        // newuser.saveuser()
        document.getElementById('successmsg').innerHTML = "Registered Sucessfully:)"
        showlogin()
    } else {
        document.getElementById('errmsg').innerHTML = "Confirm Password Must be Same!"
    }
}
function login() {
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    var email = document.getElementById('loginemail');
    var pass = document.getElementById('loginpass');
    var check = false
    var pos = 0
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email.value) {
            check = true
            pos = i
        }
    }
    if (check === true) {
        if (users[pos].pass === pass.value) {
            flag = { 'user': email.value }
            localStorage.setItem('login', JSON.stringify(flag));
            homepage()
        } else {
            document.getElementById('errmsg2').innerHTML = "Password Incorrect!"
        }
    } else {
        document.getElementById('errmsg2').innerHTML = "Email not Registered!"
    }

}
function logout() {
    let text = "Are you sure want to logout?";
    if (confirm(text) == true) {
        window.localStorage.removeItem('login')
        window.location.reload(true)
    } else {
        homepage()
    }
}
function getinputfields() {
    var x = document.getElementById('arrsize').value
    let field = ''
    field += `</hr>`
    for (var i = 0; i < x; i++) {
        field += `<input type="number" class="form-control" style="margin-top: 5px" id="num${i}" >\n`
    }
    field += `<button class="btn-success" type="button" style="margin-top: 10px" onclick="getSolution(${x})">Result</button>`
    document.getElementById('inputarea').innerHTML = field
}
var sum = function (array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
};

function mean(array) {
    var arrsum = sum(array)
    console.log(arrsum)
    return arrsum/array.length
}
function median(array) {
    array =array.sort()
    if (array.length % 2 === 0) {
        return (array[array.length/2] + array[(array.length / 2) - 1])/2
    }else{
        return array[(array.length -1)/2]
    }
}
function mode(array) {
    var mo = {};
    let max=0, count =0;
    for(var i=0;i <array.length; i++){
        var item = array[i];
        if(mo[item]){
            mo[item]++;
        }else{
            mo[item] = 1;
        }
        if(count < mo[item]){
            max = item;
            count =mo[item];
        }
    }
    return max;
}

function getSolution(size) {
    var arr = []
    for (var i = 0; i < size; i++) {
        var temp = document.getElementById(`num${i}`).value
        arr.push(parseInt(temp))
    }
    var mean1 = mean(arr)
    var median1 = median(arr)
    var mode1 = mode(arr)
    var res = ` <div class="card" style="width: 25rem;">
                    <div class="mb-3">
                    <label class="form-label">Mean: ${mean1}</label><br></br>
                    <label class="form-label">Median: ${median1}</label><br></br>
                    <label class="form-label">Mode: ${mode1}</label>
                    </div></div>`
    document.getElementById('showresult').innerHTML = res
}


