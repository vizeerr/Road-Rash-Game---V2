const gameelement = document.querySelector('.backtree');
        const gameArea = document.querySelector('.gameArea');
        const navbar = document.querySelector('.navbar');
        const startbtn = document.querySelector ('.start');
        const vehiclebtn = document.querySelector('.option');
        const options = document.querySelector('.options');
        const trybtn = document.querySelector('.tryagain');
        const backbtn = document.querySelector('.backmenu');
        const vehiclemenubtn = document.querySelector('.vehiclemenu');
        const detail = document.querySelector('.info');
        const menu = document.querySelector('.main');
        const heading = document.querySelector('.heading');
        const repeat = document.querySelector('.repeat');
        const detailgiven = document.querySelector('.detail');
        const speedmeter = document.querySelector('.speedmeter');
        const coinvalue = document.querySelector('.coinvalue');
        const scorevalue = document.querySelector('.scorevalue');
        const coinvalue2 = document.querySelector('.coinvalue2');
        const next = document.querySelector('.next');
        const images = document.querySelector('.sliderimage');
        const back = document.querySelector('.back');
        const backframe = document.querySelector('.background');
        startbtn.addEventListener('click',start);
        trybtn.addEventListener('click',start);
        backbtn.addEventListener('click',menuopen);
        vehiclebtn.addEventListener('click',option);
        vehiclemenubtn.addEventListener('click',option);
        detail.addEventListener('click',details);
        next.addEventListener('click',nextslide);
        back.addEventListener('click',backslide,false);
        

        //audiocontext;
        const audioContext = new AudioContext();
        const audio = document.querySelector('.audio');
        const source = audioContext.createMediaElementSource(audio);
        source.connect(audioContext.destination);
        
        const audioContext2 = new AudioContext();
        const audio2 = document.querySelector('.audio2');
        const source2 = audioContext2.createMediaElementSource(audio2);
        source2.connect(audioContext2.destination);


        //player object;
        let obj = {speed : 3, otherspeed :4, score:0, coinscore:0, cars:3, rotate:0,light : 'on',shoot: 'true'};
        let player ={name :'',totalcoin:0, highestscore:0,cars:3}
        let vehicledata ={vehiclename: "",width: "",height :"",category : ""};
        let playervhe = [['Royal Enfiled Bullet',50,['owned',0],'bike'],['Kawasaki Ninja',65,['notowned',2000],'bike'],['Yamaha Rc100',80,['notowned',4500],'bike'],['Ducati',95,['notowned',6000],'bike'],['Acura 240X',105,['notowned',7500],'car'],['Viper 50z',125,['notowned',9000],'car'],['Lamborghini Hurracan',130,['notowned',10000],'car'],['La Ferrari',155,['notowned',13000],'car'],['Lamborghini Aventedor',172,['notowned',15500],'car'],['Ford GT Metal',180,['notowned',18200],'car'],['Ford GT Ultronic',188,['notowned',19900],'car'],['Porsche 911 GT3 R',198,['notowned',24800],'car'],['Buggati Veyron',215,['notowned',33500],'car'],['Buggati Chiron',230,['notowned',35500],'car'],['McLaren MP48',240,['notowned',40500],'car'],['Rare',266,['notowned',85000],'car'],['Epic',280,['notowned',100000],'car']];
        
        const storedcar = JSON.parse(localStorage.getItem('PlayerVehicle'));
        const storeddata = JSON.parse(localStorage.getItem('PlayerData'));
        const storedvehicle = JSON.parse(localStorage.getItem('AllVehicle'));

        if(storeddata == null){
            player.name = "";
            player.highestscore = 0;
            player.totalcoin = 0;
        }else{
            player.name = storeddata[0];
            player.highestscore = storeddata[1];
            player.totalcoin = storeddata[2];
        }

        coinvalue2.innerText = player.totalcoin;
        coinvalue.innerText = player.totalcoin;
        scorevalue.innerText= "SCORE "+ player.highestscore;
        
        if(storedcar ==null){
            localStorage.setItem('AllVehicle',JSON.stringify(playervhe));
            vehicledata.vehiclename = "Royal Enfiled Bullet";
            vehicledata.category ="bike";
        }else{
            vehicledata.vehiclename = storedcar[0];
            vehicledata.category = storedcar[1];
        }

        if(player.name == ""){
            detailgiven.style.display = 'block';
        }else{
            detailgiven.style.display = 'none';
        }

        for( var i=0; i<10; i++){
            let tree = document.createElement('div');
            tree.setAttribute('class','tree');
            tree.y = (i*70);
            tree.style.top= tree.y + "px";
            backframe.appendChild(tree);
            tree.innerHTML = "<img src ='images/tree.png'>";
            let randompos = Math.floor(Math.random()*(10));
            if(i%2==0){
                tree.style.right = randompos*35 + "px";
                tree.style.filter ="drop-shadow(-40px 20px 0px rgb(20, 20, 20))";
                tree.style.webkitFilter ="drop-shadow(-40px 20px 0px rgb(20, 20, 20))";
            }else{
                tree.style.left = randompos*35 + "px";
                tree.style.filter ="drop-shadow(40px 20px 0px rgb(20, 20, 20))";
                tree.style.webkitFilter ="drop-shadow(40px 20px 0px rgb(20, 20, 20))";
            }
        }

        function details(){
            const tarea = document.querySelector('.textarea');
            namegiven = tarea.value;
            player.name = namegiven;
            detailgiven.style.display = 'none';
        }
        
        //key initialized
        document.addEventListener('keyup',keyUp);
        document.addEventListener('keydown',keyDown);
        // document.addEventListener('keypress',keyPress);
        let keys ={ArrowUP : false,ArrowDown :false, ArrowLeft:false, ArrowRight:false};
        function keyDown(e){
            // e.preventDefault();
            //e.key = to know about which key is pressed
            keys[e.key] = true;
        }
        function keyUp(e){
            // e.preventDefault();
            keys[e.key] = false;
            // console.log(keys);
        }
        
        //audio initializer
        var promise = document.querySelector('audio').play();
        var ask = document.querySelector('.ask');
        if (promise !== undefined) {
            promise.then(_ => {
                ask.style.display="none";
          }).catch(error => {
            ask.style.display="block";
          }); 
        };
        document.querySelector('.allow').addEventListener('click', function() {
            audioContext.resume().then(() => {
                console.log('Playback resumed successfully');
                console.log(audioContext.state);
                window.location.reload();
            }); 
        });
            
        function start(){
            //for initializing animation frame
            window.requestAnimationFrame(gamePlay);
            audio.play();
            audio.loop = true;
            player.start = true;
            keys.ArrowUp = false;
            obj.score = 0;
            obj.coinscore = 0;
            menu.style.display = "none";
            repeat.style.display = "none";
            obj.otherspeed = 4;
            obj.speed=3;
            obj.rotate =0;
            gameelement.innerHTML ="";
            gameArea.innerHTML ="";
            
            //coinscore
            let navbar = document.createElement('div');
            navbar.setAttribute('class','navbar');
            gameArea.appendChild(navbar);
            navbar.innerHTML = `<div class='scoretab'>
                    <p class = 'displayscore' > SCORE : 0 </p></div>
                <div class='cointab'>
                    <img class = 'coinimg' src = images/coin.png> <p class = 'displaycoin' > 0 </p>
                </div> `;

            //lines on road
            for( var i=0; i<6; i++){
                let lines = document.createElement('div');
                lines.setAttribute('class','lines');
                lines.y = (i*150);
                lines.style.top= lines.y + "px";
                gameArea.appendChild(lines);
                
            }
            for( var i=0; i<15; i++){
                let lines = document.createElement('div');
                lines.setAttribute('class','borderline');
                lines.y = (i*60);
                lines.style.top= lines.y + "px";
                gameArea.appendChild(lines);
                lines.style.left =0;
            }
            for( var i=0; i<15; i++){
                let lines = document.createElement('div');
                lines.setAttribute('class','borderline');
                lines.y = (i*60);
                lines.style.top= lines.y + "px";
                gameArea.appendChild(lines);
                lines.style.right =0;
            }

            //tree
            for( var i=0; i<6; i++){
                let tree = document.createElement('div');
                tree.setAttribute('class','tree inner');
                tree.y = -(i*150);
                tree.style.top= tree.y + "px";
                gameelement.appendChild(tree);
                tree.innerHTML = "<img src ='images/tree.png'>";
                
                if(i%2==0){
                    tree.style.right = 0;
                    tree.style.filter ="drop-shadow(-40px 20px 0px rgb(20, 20, 20))";
                    tree.style.webkitFilter ="drop-shadow(-40px 20px 0px rgb(20, 20, 20))";
                }else{

                    tree.style.left = 0;
                    tree.style.filter ="drop-shadow(40px 20px 0px rgb(20, 20, 20))";
                    tree.style.webkitFilter ="drop-shadow(40px 20px 0px rgb(20, 20, 20))";
                }
            }
            
            for( var i=0; i<4; i++){
                let streetlight = document.createElement('div');
                streetlight.setAttribute('class','streetlight');
                streetlight.style.top= streetlight.y + "px";
                gameArea.appendChild(streetlight);
                streetlight.innerHTML = "<div class= 'hood'></div><div class = 'stick'></div>";
                if(i%2==0){
                    streetlight.style.right = 0;
                    streetlight.style.transform = "rotate(0deg)";
                    streetlight.style.filter ="drop-shadow(17px 60px 1px black)";
                    streetlight.y = -(i*190);
                }else{
                    streetlight.style.left = 0;
                    streetlight.style.transform = "rotate(180deg)";
                    streetlight.style.filter ="drop-shadow(17px -60px 1px black)";
                    streetlight.y = -(i*195);
                }
            }

            //car 
            let car = document.createElement('div');
            car.setAttribute('class','car');
            car.innerHTML = `<img class ='firstcar' src='images/${vehicledata.vehiclename}.png' alt='car1'>`;
            gameArea.appendChild(car);
            let frontlight = document.createElement('div');
            frontlight.setAttribute('class','frontlight');
            car.appendChild(frontlight);
            let backlight = document.createElement('div');
            backlight.setAttribute('class','backlight');
            car.appendChild(backlight);
            let neonlight = document.createElement('div');
            neonlight.setAttribute('class','neonlight');
            car.appendChild(neonlight);
            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            if(vehicledata.category == "bike"){
                frontlight.style.boxShadow = "rgb(255 255 255) 0px -21px 70px 24px";
                backlight.style.boxShadow = "rgb(255 0 0 / 56%) 0px 9px 14px 6px";
                neonlight.style.boxShadow = "rgb(0 166 255 / 45%) -2px 16px 7px 17px";
                car.style.width = "30px";
                car.style.height = "92px";
            }else{
                car.style.width = "40px";
                car.style.height = "100px";
                frontlight.style.boxShadow = "0px -21px 90px 34px #ffffff";
                backlight.style.boxShadow = "0px 12px 21px 15px #ff00008f";
                neonlight.style.boxShadow = "rgb(0 166 255 / 77%) -2px 0px 23px 22px";
            }

            // enemy car LANE 1

            for( var i=0; i<3; i++){
                let ecar = document.createElement('div');
                let frontlight = document.createElement('div');
                let backlight = document.createElement('div');
                const [vehicle,width,height,categ] = randomimg();
                ecar.setAttribute('class','ecar downlane');
                frontlight.setAttribute('class','frontlight');
                backlight.setAttribute('class','backlight');
                ecar.y = -(i*300);
                ecar.style.top= 150 + "px";
                ecar.style.width = width + "px";
                ecar.style.height = height + "px";
                ecar.style.transform = "rotate(180deg)";
                ecar.innerHTML = `<img class = 'allcar' src='images/${vehicle}.png' alt='car1'>`;
                // delayer = -1*i;
                // ecar.style.animationDelay = delayer + "s";
                var lef = (Math.floor(Math.random()*180));
                if(lef <20){
                    lef=20;
                    ecar.style.left = lef + "px";
                }else if(lef > 175){
                    lef=175;
                    ecar.style.left = rig + "px"; 
                }else{
                    ecar.style.left = lef + "px";
                }      
                gameArea.appendChild(ecar);
                ecar.appendChild(frontlight);
                ecar.appendChild(backlight);
            }
        
            // enemy ecar LANE 2
            for( var i=0; i<3; i++){
                let ecar = document.createElement('div');
                let frontlight = document.createElement('div');
                let backlight = document.createElement('div');
                const [vehicle,width,height,categ] = randomimg();
                ecar.setAttribute('class','ecar uplane');
                backlight.setAttribute('class','backlight');
                frontlight.setAttribute('class','frontlight');
                ecar.y = -(i*300);
                ecar.style.top= 150 + "px";
                ecar.style.width = width + "px";
                ecar.style.height = height + "px";
                ecar.innerHTML = `<img class = 'allcar' src='images/${vehicle}.png' alt='car1'>`;
                // delayer = -1*i;
                // ecar.style.animationDelay = delayer + "s";
                var rig = (Math.floor(Math.random()*180));
                
                if(rig <20){
                    rig=20;
                    ecar.style.right = rig + "px"; 
                }else if(rig > 175){
                    rig=175;
                    ecar.style.right = rig + "px"; 
                }else{
                    ecar.style.right = rig + "px"; 
                }            
                gameArea.appendChild(ecar);
                ecar.appendChild(frontlight);
                ecar.appendChild(backlight);
            }

            //coin
            for( var i=0; i<3; i++){
                let coin = document.createElement('div');
                coin.setAttribute('class','coin');
                coin.innerHTML = `<img src='images/coin.png' alt='coin'>`;
                coin.y = -(i*300);
                coin.style.top = 100 + "px";
                var cpos = (Math.floor(Math.random()*420));
                coin.style.left = cpos + "px";
                gameArea.appendChild(coin);
            }
            
        }
        
        function keyPress(e){
            const frontlight = document.querySelector('.frontlight');
            const backlight = document.querySelector('.backlight');
            // const neonlight = document.querySelector('.frontlight');
            
            if(e.key == "h" || e.key == "H"){
                if(obj.light == "on"){
                    obj.light = "off";
                    frontlight.style.display="none";
                    backlight.style.display="none";
                    // // neonlight.style.display="none";
                }else{
                    obj.light = "on";
                    frontlight.style.display="block";
                    backlight.style.display="block";
                }
                
            }
            
        }

        function option(){
            menu.style.display ="none";
            options.style.display = "block";
            slideshow();
        }

        var b =0;
        function nextslide() {
            b++;
            slideshow();
        }
        function backslide(){
            b--;
            slideshow();
        }
        
        function slideshow(){
            const selectbtn = document.querySelector('.select');
            const nametag = document.querySelector('.nametag');
            const bar = document.querySelector('.bar');
            const speeddata = document.querySelector('.speeddata');
            const close = document.querySelector('.close');
            close.addEventListener('click',menuopen);
            selectbtn.addEventListener('click',selecter);
            
            const storedvehicle = JSON.parse(localStorage.getItem('AllVehicle'))
                
            if(b > 16){
                b = 0;
            }   
            if(b == -1 ){
                b = 16;
            }
                
            vehiclename = storedvehicle[b][0];
            bar.style.width = storedvehicle[b][1] - [30]+ "px";
            speeddata.innerText = `Top Speed : ${storedvehicle[b][1] + 100} Km/h`;
            nametag.innerText = storedvehicle[b][0];
            selectbtn.style.color = "#000";
            selectbtn.style.backgroundColor = "#ffd600";
            selectbtn.style.border = "2px solid #ffd600";
            
            if(vehiclename == vehicledata.vehiclename){
                selectbtn.innerText = "EQUIPED";
            }else{ 
                if(storedvehicle[b][2][0] == "owned"){
                    selectbtn.innerText = "EQUIP";
                }else{
                    selectbtn.style.color = "#ffffff";
                    selectbtn.innerText = `BUY NOW $ ${storedvehicle[b][2][1]}`;
                    selectbtn.style.backgroundColor = "#ff000030";
                    selectbtn.style.border = "2px solid #ff0000";
                }

            }

            function selecter(){
                const storedvehicle = JSON.parse(localStorage.getItem('AllVehicle'));
                if(storedvehicle[b][2][0] == "notowned"){
                    buynow();
                    console.log("selecter " + storedvehicle[b][2][1]);
                }else{
                    vehicledata.category= storedvehicle[b][3];
                    vehicledata.vehiclename = vehiclename;
                    cardetail = [vehicledata.vehiclename,vehicledata.category];
                    menuopen();
                    localStorage.setItem('PlayerVehicle',JSON.stringify(cardetail));
                }
            }
                
            function buynow(){
                const storedvehicle = JSON.parse(localStorage.getItem('AllVehicle'));
                if(storedvehicle[b][2][0] == "notowned"){
                    if(player.totalcoin >= storedvehicle[b][2][1]){
                        console.log(storedvehicle[b][0]);
                        console.log("first coin"+ player.totalcoin);
                        var playercoin = player.totalcoin;
                        player.totalcoin = playercoin - storedvehicle[b][2][1];  
                        console.log("second coin"+ player.totalcoin);
                        storedvehicle[b][2][0] = "owned";
                        localStorage.setItem('AllVehicle',JSON.stringify(storedvehicle));
                        vehicledata.vehiclename = vehiclename;
                        cardetail = [vehicledata.vehiclename, vehicledata.height, vehicledata.width];
                        localStorage.setItem('PlayerVehicle',JSON.stringify(cardetail));
                        arr1=[player.name,player.highestscore,player.totalcoin];
                        localStorage.setItem('PlayerData',JSON.stringify(arr1));
                        showplayerdata();
                    }else{
                        console.log('not enough money ' + storedvehicle[b][0]);
                    }
                }
                    menuopen();
                } 
                images.src = `images/${vehiclename}.png`;
            }
            
            function menuopen(){
                menu.style.display="block";
                options.style.display = "none";
                repeat.style.display = "none";
            }

            function showplayerdata(){
            const storeddata = JSON.parse(localStorage.getItem('PlayerData'))
            player.highestscore = storeddata[1];
            player.totalcoin = storeddata[2];
            scorevalue.innerHTML = "SCORE " + player.highestscore;
            coinvalue.innerHTML = player.totalcoin;
            coinvalue2.innerHTML = player.totalcoin;
        }

            bikes =["bike2","bike3","bike4","bike5"];
            trucks = ["truck1","truck2","truck3"];
            truckl =["truckl","truckl2","truckl3","truckl4"];
            cars = ["car1","car2","car3","car4","car5","car6","car7"];
            function randomimg(){
                let allvhe=["bikes","cars","truckl","trucks"];
                let randomno = Math.floor(Math.random()*(4));
                category = allvhe[randomno];
                vehicle =""; categ ="";
                var width  =0;
                var height =0;
                if(category == "bikes" ){   
                    let randombikes = Math.floor(Math.random()*(bikes.length));
                    vehicle = bikes[randombikes];
                    width = 26;
                    height = 100;
                    categ = "bikes";
                }else if(category == "trucks"){
                    let randomtrucks = Math.floor(Math.random()*(trucks.length));
                    vehicle = trucks[randomtrucks];
                    categ = "trucks";
                    width = 44;
                    height = 175;
                }else if(category == "cars"){
                    let randomcars = Math.floor(Math.random()*(cars.length));
                    vehicle = cars[randomcars];
                    width = 40;
                    height = 110;
                    categ = "cars";
                }else if(category == "truckl"){
                    let randomtruckl = Math.floor(Math.random()*(truckl.length));
                    vehicle = truckl[randomtruckl];
                    width = 40;
                    height = 112;
                    categ = "truckl";
                }
            return [vehicle,width,height,categ];
        }
        

        function collison(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();
            // console.log(aRect);
            if((aRect.top > bRect.bottom ) || (aRect.bottom  < bRect.top ) || (aRect.right  < bRect.left ) 
            || (aRect.left> bRect.right )){ 
                return true;
            }
        }

        function collectcoin(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();
            // console.log(aRect);
            if((aRect.top > bRect.bottom ) || (aRect.bottom  < bRect.top ) || (aRect.right  < bRect.left ) 
            || (aRect.left> bRect.right )){ 
                return true;
            }
        }

        function movelines(){
            let lines = document.querySelectorAll('.lines');
            lines.forEach(function(item){

                if(item.y > 700){
                    item.y-= 750;
                }
                item.y += obj.otherspeed;
                item.style.top= item.y + "px";

            })
        }

        function movetree(){
            let tree = document.querySelectorAll('.inner');     
            tree.forEach(function(item){
                if(item.y > 750){
                    item.y-= 900;
                }
                item.y += obj.otherspeed;
                item.style.top= item.y + "px";
            })
        }

        function movelight(){
            let streetlight = document.querySelectorAll('.streetlight');
            streetlight.forEach(function(item){
                if(item.y > 850){
                    item.y-=900;
                }
                item.y += obj.otherspeed;
                item.style.top= item.y + "px";
            })
        } 
        
        function moveborder(){
            let lines = document.querySelectorAll('.borderline');
            lines.forEach(function(item){
                if(item.y > 800){
                    item.y-= 900;
                }
                item.y += obj.otherspeed;
                item.style.top= item.y + "px";
            })
        }   

        var scored = 0;
        function movecoin(car){
            let coin = document.querySelectorAll('.coin');
            const coinscr = document.querySelector('.displaycoin');
            coin.forEach(function(item){
                if(!(collectcoin(car,item))){
                    scored += 10;
                    obj.coinscore = Math.floor(scored);
                    coinscr.innerText = obj.coinscore;
                    item.style.display = "none";
                }

                if(item.y > 800){
                    item.y-= 800;
                    item.style.left = Math.floor(Math.random()*420) + "px"; 
                    item.style.display = "block";
                }
                item.y += obj.otherspeed;
                item.style.top= item.y + "px";
            })
        }

        function moveecar(c){
            let ecar = document.querySelectorAll('.ecar');
            // let ecarmg = document.querySelectorAll('.allcar');
            ecar.forEach(function(item,value){
                if(!(collison(c,item))){

                    heading.innerText = "GAME OVER Your score is "+ obj.score ;
                    var arr = [];
                    // arr= [player.name,obj.score,obj.coinscore + storedcoin];
                    console.log("s" + obj.score);
                    console.log("cs" +obj.coinscore);
                    console.log("tc" +player.totalcoin);
                    console.log("hs" +player.highestscore);
                    if(player.highestscore < obj.score){
                        arr= [player.name,obj.score,obj.coinscore + player.totalcoin];
                    }else{
                        arr=[player.name,player.highestscore,obj.coinscore + player.totalcoin]
                    }
                    localStorage.setItem('PlayerData',JSON.stringify(arr));
                    showplayerdata();
                    endgame();
                    audio2.play(); 
                    audio.pause();
                    // item.style.animation = "none";
                }
            
            })

            let downlane = document.querySelectorAll('.downlane');
            downlane.forEach(function(lane1,value){
                if(lane1.y > 750){
                    lane1.y= -200;
                    [vehicle,width,height] = randomimg();
                    lane1.innerHTML = `<img class = 'allcar' src='images/${vehicle}.png' alt='car1'> <div class = 'frontlight'></div><div class = 'backlight'></div> `;
                    lane1.style.width = width + "px";
                    lane1.style.height = height + "px";
                    lef = Math.floor(Math.random()*180); 
                    if(lef <20){
                        lef=20;
                        lane1.style.left = lef + "px";
                    }else if(lef > 175){
                        lef=175;
                        lane1.style.left = lef + "px"; 
                    }else{
                        lane1.style.left = lef + "px";
                    } 
                }
                lane1.y += obj.otherspeed +0.5;
                lane1.style.top= lane1.y + "px";
            })
            
            let uplane = document.querySelectorAll('.uplane');
            uplane.forEach(function(lane2,value){
                if(lane2.y > 750){
                    lane2.y= -200;
                    [vehicle,width,height] = randomimg();
                    lane2.innerHTML = `<img class = 'allcar' src='images/${vehicle}.png' alt='car1'> <div class = 'frontlight'></div><div class = 'backlight'></div>  `;
                    lane2.style.width = width + "px";
                    lane2.style.height = height + "px";
                    rig = Math.floor(Math.random()*180); 
                    if(rig <20){
                        rig=20;
                        lane2.style.right = rig + "px";
                    }else if(rig > 175){
                        rig=175;
                        lane2.style.right = rig + "px"; 
                    }else{
                        lane2.style.right = rig + "px";
                    } 
                }
                lane2.y += obj.otherspeed -0.5;
                lane2.style.top= lane2.y + "px";
            })
        } 

        function gamePlay(){
            let road = gameArea.getBoundingClientRect();
            let car = document.querySelector('.car');
            let carmg =document.querySelector('.firstcar');
            let displayscore = document.querySelector('.displayscore');
            if (player.start == true){
                movelines();
                moveborder();
                movetree();
                moveecar(car);
                movecoin(car);
                movelight();

                //adding fn for keypress and key down
                if(keys.ArrowUp && player.y > (road.top +250)){
                    player.y -= obj.speed;
                    // player.speed +=player.ownspeed/15;
                }if(keys.ArrowDown && player.y <(road.bottom - 200)){
                    player.y += obj.speed;
                }if(keys.ArrowLeft && player.x > (18)){
                    player.x -= obj.speed;
                    obj.rotate -= obj.speed/5;
                }if(keys.ArrowRight && player.x < (road.width - 50)){
                    player.x += obj.speed;
                    obj.rotate += obj.speed/5;
                }

                if(keys.ArrowUp == false && keys.ArrowLeft == false && keys.ArrowRight == false &&  keys.ArrowDown == false){
                    obj.rotate = 0;
                    car.style.transition = "0.5s"; 
                }else{
                    car.style.transition = "0s";  
                }

                if(obj.rotate > 12){
                    obj.rotate = 12;
                }
                if( obj.rotate < -12 ){
                    obj.rotate = -12;
                }
                car.style.transform = "rotate(" + obj.rotate + "deg)";
                car.style.top = player.y + "px";
                car.style.left = player.x + "px";
                
                //for continous animation frame
                window.requestAnimationFrame(gamePlay);
                obj.score++;
                displayscore.innerText = "SCORE : " + obj.score;

                // if(keys.ArrowUp == true){
                //     player.speed += 0.0008;
                //     player.otherspeed += 0.005;
                //     if(player.otherspeed >=8){
                //         player.otherspeed = 8;
                //         player.speed =3.5;
                //     }
                // }
                // else{
                //     player.speed -= 0.01;
                //     player.otherspeed -= 0.02;
                //     if (player.otherspeed <=4) {
                //         player.speed = 3;
                //         player.otherspeed = 4;
    
                //     }
                // }
                
                // speedmeter.innerText = player.otherspeed;


                if(obj.score>500){ 
                    obj.otherspeed = 3.5;
                }
                if(obj.score>800){
                    obj.otherspeed= 4;
                    obj.speed = 2.4;
                }
                if(obj.score>1200){
                    obj.otherspeed= 4.5;
                    obj.speed = 2.9;
                }
                if(obj.score>1500){
                    obj.otherspeed= 5;
                    obj.speed = 3;
                }
                if(obj.score>2000){
                    obj.otherspeed= 5.5;
                    obj.speed = 3.5;
                }
                if(obj.score>2500){
                    obj.otherspeed= 6;
                    obj.speed = 3.7;
                }
                if(obj.score>3000){
                    obj.otherspeed= 6.5;
                    obj.speed = 3.8;
                }
                if(obj.score>3500){
                    obj.otherspeed= 7;
                    obj.speed = 3.9;
                    
                }
                if(obj.score>4000){
                    obj.otherspeed= 7.5;
                    obj.speed = 4;
                    
                }
                if(obj.score>4500){
                    obj.otherspeed= 8;
                    obj.speed = 4.5;
                    
                }
                if(obj.score>5000){
                    obj.otherspeed= 8.2;
                    obj.speed = 5;

                }
                if(obj.score>5500){
                    obj.otherspeed= 8.4;
                    obj.speed = 5.2;
                    
                }
                if(obj.score>6000){
                    obj.otherspeed= 8.6;
                    obj.speed = 5.4;
                    
                }
                if(obj.score>6500){
                    obj.otherspeed= 8.8;
                    obj.speed = 5.6;
                    
                }
                if(obj.score>7000){
                    obj.otherspeed= 8.9;
                    obj.speed = 5.8;
                    
                }
                if(obj.score>8000){
                    obj.otherspeed= 9;
                    obj.speed = 6;
                    
                }

                
            }
        }

        function endgame(){
            const newscore = document.querySelector('.newscore');
            const newcoin = document.querySelector('.newcoin');
            const navbar  = document.querySelector('.navbar')
            player.start = false;
            scored = 0;
            repeat.style.display = "block";
            navbar.style.display="none";
            if(obj.score == player.highestscore){
                newscore.innerHTML = "HIGHEST SCORE : " + obj.score;
            }else{
                newscore.innerHTML = "SCORE : " + obj.score;
            }
            newcoin.innerHTML = obj.coinscore;
        }

//         document.addEventListener("contextmenu", function (e){
//     e.preventDefault();
// }, false);