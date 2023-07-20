startmenu = {
    1: {
        name: "Vadapav",
        price: 20,
        count: 0
    },
    2: {
        name: "Masaladosa",
        price: 60,
        count: 0
    },
    3: {
        name: "Idli Sambar",
        price: 50,
        count: 0
    },
    4: {
        name: "Samosa Pav",
        price: 20,
        count: 0
    },
    5: {
        name: "Coffee",
        price: 10,
        count: 0
    },
    6: {
        name: "Dahi Vada",
        price: 10,
        count: 0
    }
}
 
// localStorage.setItem(1,JSON.stringify(startmenu));
let menu = JSON.parse(localStorage.getItem(1)) || startmenu;
// let menu = startmenu;

function display_item() {

    for (const i in menu) {
        document.querySelector(".item_container .container").innerHTML += `<div class="itembox" id="itembox${i}">
    <span class="code" id="code${i}">${i}. ${menu[i]['name']}</span>
    <br>
    <span class="price" id="price${i}">₹ ${menu[i]['price']}</span>
    <br>
    <span class="quantity" id="quantity${i}">

        <div class="pl"><span class="plus" id="plus${i}">+</span></div>
        <span class="quan" id="quan${i}">${menu[i]['count']}</span>
        <div class="plm"><span class="minus" id="minus${i}">-</span></div>
    </span>
</div>`;
    }
}
display_item();

function updateQuantity() {
    for (const i in menu) {
        let count = menu[i]['count'];
        let add = document.querySelector(`#plus${i}`);
        let sub = document.querySelector(`#minus${i}`);
        let quant = document.querySelector(`#quan${i}`);

        add.addEventListener('click', function () {
            count++;
            quant.innerText = count;
            menu[i]['count'] = count;
            Billdisplay(i);
            BillCalc(i, count);

        })

        sub.addEventListener('click', function () {
            if (count > 0) {
                count--;
                quant.innerText = count;
                menu[i]['count'] = count;
                Billdisplay(i);
                BillCalc(i, count);

            }
        })
    }
}
let subtotal = 0;
let cgst = 0;
let sgst = 0;
let pp = {};
updateQuantity();

function BillCalc(code, count) {


    let cc = {};
    cc[code] = count;      


    for (const i in cc) {
        let sb = 0;
        sb += cc[i] * menu[i]['price'];
        pp[i] = sb;
    }
    // console.log(pp);
    // console.log(Object.values(pp));
    subtotal = 0;
    for (const t of Object.values(pp)) {

        subtotal += t;
    }

    cgst = subtotal * 0.18;
    sgst = subtotal * 0.18;
    let total = subtotal + cgst + sgst;
    // console.log("subtotal " + subtotal);
    // console.log("cgst "+cgst);
    // console.log("sgst "+sgst);
    // console.log("total "+total);
    
    document.querySelector('.Subtotal').innerText =`₹ ${subtotal.toFixed(2)} ` ;
    document.querySelector('.CGST').innerText =`₹ ${cgst.toFixed(2)} ` ;
    document.querySelector('.SGST').innerText =`₹ ${sgst.toFixed(2)} ` ;
    document.querySelector('.Total').innerText =`₹ ${total.toFixed(2)} ` ;
}
function Totable(){
    document.querySelector('.A').innerHTML += `<tr>
    <td colspan="3">Subtotal</td>
    <td class="Subtotal"></td>
    </tr>
<tr>
    <td colspan="3">CGST</td>
    <td class="CGST"></td>
</tr>
<tr>
    <td colspan="3">SGST</td>
    <td class="SGST"></td>
</tr>
<tr>
    <td colspan="3">Total</td>
    <td class="Total"></td>
</tr>`
}
Totable();
let checkin = [];
let j = 1;
let index = 0;
function Billdisplay(i) {
    // checkin.forEach((values,index)=>{
    //     j = index+1;
    // })
        // console.log(checkin);
        // checkin.forEach((values,index)=>{
        //     j = index+1;
        // })

    if (menu[i]['count'] > 0 && !(checkin.includes(i))) {
        checkin.push(i);
        
        document.querySelector('table tbody').innerHTML += `<tr class="r${i}">
            
            <td>${menu[i]['name']}</td>
            <td class="c${i}">${menu[i]['count']}</td>
            <td>${menu[i]['price']}</td>
            <td class="pc${i}">${menu[i]['price'] * menu[i]['count']}</td>
            </tr>`
            document.querySelector(`.r${i}`).style.textAlign = 'center';
            document.querySelector(`.r${i}`).style.display = 'table-row';   
        
    }

    else if (menu[i]['count'] >= 1 && (checkin.includes(i))) {
        document.querySelector(`.r${i}`).style.display = 'table-row';
        document.querySelector(`.r${i}`).style.textAlign = 'center'; 
        document.querySelector(`.c${i}`).innerText = `${menu[i]['count']}`;
        document.querySelector(`.pc${i}`).innerText = `${menu[i]['price'] * menu[i]['count']}`;
    }
    else {
        if (menu[i]['count'] == 0 && checkin.includes(i)) {
            document.querySelector(`.r${i}`).style.display = 'none';  
            // document.querySelector(`.r${i}`).innerHTML = '';
            // let indi = checkin.indexOf(i);
            // checkin.splice(indi,1);
            // console.log(checkin);
            // checkin.forEach((value,index)=>{
            //     document.querySelector(`.Sno${value}`).innerText = index + 1;
            // })
            
            
        }
    }
    
    // checkin.forEach((values,index)=>{
    //     j = index+1;
    // })
    // if(checkin.length==1){
    //     Totable();
    // }
    
}
let k = 0;
// Billdisplay();
function Admin(){
    let a = document.querySelector('.admin');
    a.addEventListener('click',()=>{
        k++;
        let nod = document.querySelector('.input_item .container .input_box');
        let bod = document.querySelector('.BillButton .container');
        let tod = document.querySelector('.Bill ');
        let h = document.querySelector('.Admin a');
        // let ite = document.querySelector('.item_container .container .itembox'); 
        // let q = document.querySelector(".itembox .quantity")
        console.log(h);
        if(k%2==0){
            nod.style.display = 'none';
            bod.style.display = 'flex';
            tod.style.display = 'block';
            a.innerText = 'Admin';
            h.href = "#Menu";
            for(const i in menu){
                let q = document.querySelector(`.itembox #quantity${i}`)
                q.style.display = "flex";
                let ite = document.querySelector(`#itembox${i}`);
                ite.style.justifyContent = "between";

            }
            

        }
        else{
            nod.style.display = 'flex'; 
            bod.style.display = 'none';
            tod.style.display = 'none';
            a.innerText = 'User';
            h.href = "#new_item";
            for(const i in menu){
                let q = document.querySelector(`.itembox #quantity${i}`)
                q.style.display = "none";
                let ite = document.querySelector(`#itembox${i}`);
                ite.style.justifyContent = "between";
            }
            
        }
        
        console.log(k);

    })
  
}
Admin();
let b = 0; 
function BillButton(){
    let button = document.querySelector('.b');
    button.addEventListener('click',()=>{
        b++;
        let nod = document.querySelector('.Bill .container .input_box');
        
        if(b%2==0){
            nod.style.display = 'none';
            
        }
        else{
            nod.style.display = 'flex'; 
            
        }
        
        console.log(b);

    })

}
BillButton();

function add_or_remove() {
    let but1 = document.querySelector('#button1');
    let but2 = document.querySelector('#button2');
    let but3 = document.querySelector('#button3');
    let addit = document.querySelector('.Additem');
    let remit = document.querySelector('.Remitem');
    let edit = document.querySelector('.editem');
    but1.addEventListener('click', () => {
        addit.style.display = 'flex';
        remit.style.display = 'none';
        edit.style.display = 'none';
        but1.style.background = 'black';
        but2.style.background = '#ff6600';
        but3.style.background = '#ff6600';

    })
    but2.addEventListener('click', () => {
        remit.style.display = 'flex';
        addit.style.display = 'none';
        edit.style.display = 'none';
        but2.style.background = 'black';
        but1.style.background = '#ff6600';
        but3.style.background = '#ff6600';
    })
    but3.addEventListener('click',()=>{
        edit.style.display = 'flex';
        remit.style.display = 'none';
        addit.style.display = 'none';
        but3.style.background = 'black';
        but1.style.background = '#ff6600';
        but2.style.background = '#ff6600';
        document.querySelector('.section2').style.display = 'none'; 
        document.querySelector('.section1').style.display = 'flex'; 
    })
}
add_or_remove();
function add_item() {
    let newest = document.querySelector('#add');
    newest.addEventListener('click', () => {
        let fname = document.querySelector('#fp1');
        let newp = document.querySelector('#fp2');
        let ucode = Object.keys(menu).length + 1;
        if((fname.value.trim()=='')||(isNaN(newp.value))||(newp.value.trim=="")){
            alert("Enter Valid Fooditems or price");
            fname.value = '';
            newp.value = '';
        }
        else{
            menu[ucode] = { name: fname.value, price: newp.value, count: 0 };
        alert(`${fname.value} added Successfully`);
        localStorage.setItem(1,JSON.stringify(menu));   
        
        document.querySelector(".item_container .container").innerHTML += `<div class="itembox" id="itembox${ucode}">
            <span class="code" id="code${ucode}">${ucode}. ${menu[ucode]['name']}</span>
            <br>
            <span class="price" id="price${ucode}">₹ ${menu[ucode]['price']}</span>
            <br>
            <span class="quantity" style="display:none;" id="quantity${ucode}">
                <span class="plus" id="plus${ucode}">+</span>
                <span class="quan" id="quan${ucode}">${menu[ucode]['count']}</span>
                <span class="minus" id="minus${ucode}">-</span>
            </span>
        </div>`;
        fname.value = '';
        newp.value = '';
       
        
        updateQuantity();

        }
        

    })


}
add_item();
function Edit_item(){
    let e_code = document.querySelector('#edm');
    e_code.addEventListener('click',()=>{
        let ec = document.querySelector('#efp1');
        document.querySelector('.section1').style.display = 'flex';
        document.querySelector('.section2').style.display = 'none'; 
        if((isNaN(ec.value))||!(menu.hasOwnProperty(ec.value))){
            alert("Enter the code present in Menu");
        
            ec.value = '';
        }
        else{
            let change = document.querySelector('#Change');
            document.querySelector('.section2').style.display = 'flex';
            document.querySelector('.section1').style.display = 'none';
            let i1 = document.querySelector('#fp3');
            let i2 = document.querySelector('#fp4');
            let temp = ec.value;
            i1.value = menu[temp]['name'];
            i2.value = menu[temp]['price']; 
            change.addEventListener('click',()=>{
            
            
            // if((i1.value.trim()=='')&&((isNaN(i2.value))||(i2.value.trim()==""))){
            //     console.log('first');
            //     menu[temp]['name'] = menu[temp]['name'];
            //     menu[temp]['price'] = menu[temp]['price'];
            //     console.log(menu);
            // }
            if((i1.value.trim()=='')){
                // menu[temp]['name'] = menu[temp]['name'];
                console.log('second');
                menu[temp]['price'] = Number(i2.value);
                console.log(menu);

            }
            else if(((isNaN(i2.value))||(i2.value.trim()==""))){
                console.log('third')
                menu[temp]['name'] = i1.value;
                // menu[temp]['price'] = menu[temp]['price'];
                console.log(menu);

            }
            else{
                console.log('fourth')
                menu[temp]['name'] = i1.value;
                menu[temp]['price'] = Number(i2.value);
                console.log(menu);
                
            }
             
            i1.value = '';
            i2.value = '';
            ec.value = '';
            

            document.querySelector(".item_container .container").innerHTML = '';
            display_item();
            for(const i in menu){
                let q = document.querySelector(`.itembox #quantity${i}`)
                q.style.display = "none";
                let ite = document.querySelector(`#itembox${i}`);
                ite.style.justifyContent = "between";
                menu[i]['count'] = 0;
            }
            localStorage.setItem(1,JSON.stringify(menu));
            alert("Menu just got updated!")
            // display_item();
            updateQuantity();
            document.querySelector('.section1').style.display = 'flex';
            document.querySelector('.section2').style.display = 'none'; 
            })
            
           
        }
    })

}
Edit_item();
function remove_item() {

    let r_code = document.querySelector('#rem');
    r_code.addEventListener('click', () => {
       
        let rc = document.querySelector('#rfp1');
        if((isNaN(rc.value))||!(menu.hasOwnProperty(rc.value))){
            alert("Enter the code present in Menu");
        
            rc.value = '';
        } 
        else{
            alert(`${menu[rc.value]['name']} got deleted`);
            delete menu[rc.value];
            rc.value = '';
            
           let umenu = {};
            Object.keys(menu).forEach((k,index)=>{
                umenu[index+1]=menu[k];
            })
            menu = umenu;
            localStorage.setItem(1,JSON.stringify(menu));
            document.querySelector(".item_container .container").innerHTML = '';
            display_item();
            for(const i in menu){
                let q = document.querySelector(`.itembox #quantity${i}`)
                q.style.display = "none";
                let ite = document.querySelector(`#itembox${i}`);
                ite.style.justifyContent = "between";
            }
            
            updateQuantity();
        }
        
    })

}
remove_item();





