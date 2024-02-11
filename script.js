/* TO DO
    1. /pauza/odpauza
    2. css i wyglad
    3. kolejne poziomy
    4. klasa surowiec
    5. /paski dla kazdego budynku
    6. ?moze wrzuc funkcje w metody klasy
    7. Ekran startu i ekran zwyciestwa
    8. +/- NOWE ZARABIANIE!!!!!!!!!!!!!
    *9. Power upy
    10. /UPDATE NAPRAWWWW
    */
    surowiec =
    {
        nazwa: 'Drewno',
        mnoznik: 1,
        zdjecie: 'files/drewno.png'
    }

    gracz = 
    {
        zarobki: 0,
        budynki: 0,
        poziom: 1,
        ulepszenia: 0,
        budynek: [],
    }

    function Cbudynek(nazwa, zarobki=1, zdjecie,koszt=0,pasekczas=500) 
    {
        this.nazwa = nazwa;
        this.zarobki = zarobki;
        this.zdjecie = zdjecie;
        this.koszt = koszt;
        this.pasekczas = pasekczas;
        this.pasek;
        this.counter = 0;
        this.interval;
    }

    var budynek1 = new Cbudynek('budynek1',0,'files/budynek1.png');
    var budynek2 = new Cbudynek('budynek2',0,'files/budynek2.png');
    var budynek3 = new Cbudynek('budynek3',0,'files/budynek3.png');
    var budynek4 = new Cbudynek('budynek4',0,'files/budynek4.png');
    var budynek5 = new Cbudynek('budynek5',0,'files/budynek5.png');
    var budynek6 = new Cbudynek('budynek6',0,'files/budynek6.png');
    var budynek7 = new Cbudynek('budynek7',0,'files/budynek7.png');
    var budynek8 = new Cbudynek('budynek8',0,'files/budynek8.png');
    var budynek9 = new Cbudynek('budynek9',0,'files/budynek9.png');
    var blokada = true;
    var cena = 0;
    var zarobki = 1;
    var cenaupdate = 0;
    var pauza4;
    var dzwiek = true;
    gracz.budynek = [budynek1,budynek2,budynek3,budynek4,budynek5,budynek6,budynek7,budynek8,budynek9];

    function pasek(budynek)
    {
        var elem2 = document.getElementById(budynek.pasek);
        budynek.counter++;
        // console.log(budynek.counter);
        if (budynek.counter > 5) 
        {
            gracz.zarobki += budynek.zarobki;
            budynek.counter = 1;
            elem2.style.width = budynek.counter*20 + "%";
            if(dzwiek == true)
            {
                document.getElementById('wyplata').play();
            }
            updateGame();
        } 
        else 
        {
            elem2.style.width = budynek.counter*20 + "%";
        }
    }

    function wybudujBudynek(budynek,id) {
        if(gracz.zarobki >= cena)
        {   
            if(dzwiek == true)
            {
                document.getElementById('cash').play();
            }
            gracz.zarobki = gracz.zarobki - cena;
            var przycisk = document.getElementById(id);
            budynek.zarobki = zarobki*surowiec.mnoznik;
            zarobki = zarobki *100;
            var nowy = document.createElement('input');
            nowy.src = budynek.zdjecie; 
            nowy.value = budynek.nazwa;
            nowy.type = 'image';
            for(var i = 1;i<=9;i++)
            {
                if(budynek.nazwa == 'budynek'+i)
                {
                    nowy.setAttribute("onclick",'budynekwypisz(budynek'+i+')');
                    nowy.id='budynek'+i;
                    budynek.pasek = "bar"+i;
                    document.getElementById('bar'+i).style.display = "block";
                    document.getElementById('progress'+i).style.border = "solid";
                    if(i<9)
                    {
                        document.getElementById(i+1).style.display = "block";
                    }
                }
            }
            przycisk.parentNode.replaceChild(nowy, przycisk);
            gracz.budynki += 1;
            if(gracz.budynki < 9)
            {
                cena = budynek.zarobki * 10;  
            }
            else
            {
                cena = 'Nowy poziom!';
            }
            cenaupdate = budynek.zarobki * 10; 
            budynek.interval = setInterval(() => pasek(budynek), budynek.pasekczas);            
            updateGame();
        }
        
    } 
    function budynekwypisz(budynek)
    {
        document.getElementById('info').innerHTML = budynek.nazwa+" $: "+skracanie(budynek.zarobki);
        document.getElementById('infoupdate').innerHTML = "Cena ulepszenia: "+skracanie(cenaupdate);
        /*var rodzic = document.getElementById('update');
        var update = document.createElement('input');
        update.type = 'button';
        update.value = "Ulepsz";
        update.id = 'update';
        for(var i = 1;i<=9;i++)
        {
            if(budynek.nazwa == 'budynek'+i)
                update.setAttribute("onclick",'budynekupdejt(budynek'+i+')');
        }
        rodzic.parentNode.replaceChild(update,rodzic);*/
    }
    /*function budynekupdejt(budynek) finalnie zrezygnowalem z tej funkcji
    { 
        console.log(budynek.nazwa,"updejt");
        //if(gracz.zarobki>=cenaupdate)
        {
            gracz.zarobki = gracz.zarobki - budynek.zarobki*10;
            budynek.zarobki = budynek.zarobki*5;
            budynek.pasekczas -= 250;
            gracz.ulepszenia +=1;
            clearInterval(budynek.interval);
            budynek.interval = setInterval(() => pasek(budynek), budynek.pasekczas);
        }*/

    function skracanie(zarobki)
    {
        if(zarobki>=1000000000000000000000)
        {
            zarobki = Math.round(zarobki/1000000000000000000000) + 'g';
        }
        else if(zarobki>=1000000000000000000)
        {
            zarobki = Math.round(zarobki/1000000000000000000) + 'f';
        }
        else if(zarobki>=1000000000000000)
        {
            zarobki = Math.round(zarobki/1000000000000000) + 'e';
        }
        else if(zarobki>=1000000000000)
        {
            zarobki = Math.round(zarobki/1000000000000) + 'd';
        }
        else if(zarobki>=1000000000)
        {
            zarobki = Math.round(zarobki/1000000000) + 'c';
        }
        else if(zarobki>=1000000)
        {
            zarobki = Math.round(zarobki/1000000) + 'b';
        }
        else if(zarobki>=1000)
        {
            zarobki = Math.round(zarobki/1000) + 'a';
        }
        return zarobki;
    }

    function frame()
    {
        var elem = document.getElementById("myBar");
        if(gracz.budynki >= 9)
        {
            elem.style.width = gracz.budynki*11.1 + "%";
            document.getElementById('nowylvl').src = 'files/poziom.png';
            blokada = false
        }
        else 
        {
            elem.style.width = gracz.budynki*11.1 + "%";
        }
    }

    function updateGame() 
    {
        document.getElementById('zarobki').innerHTML = skracanie(gracz.zarobki);
        document.getElementById('cena').innerHTML = skracanie(cena);
        document.getElementById('surowiec').innerHTML = surowiec.nazwa;
        document.getElementById('surowieczdj').src = surowiec.zdjecie;
        document.getElementById('poziom').innerHTML = "Poziom "+gracz.poziom;
        var id = setInterval(frame, 10);
    }

    function start()
    {
        for(var i=1;i<=9;i++)
        {
            // console.log('bar'+i);
            document.getElementById('bar'+i).style.display = "none";
            document.getElementById('bar'+i).style.border = "none";
            document.getElementById('progress'+i).style.border = "none";
            if(i>=2)
            {
                document.getElementById(i).style.display = "none";
            }    
        }
        updateGame();
    }
    
    function pauza2()
    {    
        if(gracz.budynki>0)  
        {
            if(pauza4 == true)
            {
                pauza4 = false;
                odpauza();
                document.getElementById('pauza2').src = 'files/pauza.png';
            }
            else 
            {
                pauza4 = true;
                pauza();
                
                document.getElementById('pauza2').src = 'files/odpauza.png';
            }    
            if(dzwiek == true)
            {
                document.getElementById('click').play();
            }
        }
       
    }

    function tempo1()
    {
        pauza();
        for(var i = 0;i<9;i++)
        {
            gracz.budynek[i]['pasekczas'] = 1000;
            // console.log(gracz.budynek[i]['pasekczas']);
            document.getElementById('bar'+(i+1)).style.backgroundColor = 'yellow';
        }
        if(dzwiek == true)
        {
            document.getElementById('click').play();
        }
        odpauza();
    }
    function tempo2()
    {
        pauza();
        for(var i = 0;i<9;i++)
        {
            gracz.budynek[i]['pasekczas'] = 500;
            // console.log(gracz.budynek[i]['pasekczas']);
            document.getElementById('bar'+(i+1)).style.backgroundColor = 'yellowgreen';
        }
        if(dzwiek == true)
        {
            document.getElementById('click').play();
        }
        odpauza();
    }

    function tempo3()
    {
        pauza();
        for(var i = 0;i<9;i++)
        {
            gracz.budynek[i]['pasekczas'] = 100;
            // console.log(gracz.budynek[i]['pasekczas']);
            document.getElementById('bar'+(i+1)).style.backgroundColor = 'lime';
        }
        if(dzwiek == true)
        {
            document.getElementById('click').play();
        }
        odpauza();
    }

    function wycisz()
    {
        if(dzwiek == true)
        {
            dzwiek = false;
            document.getElementById('wycisz').src = "files/muzykaoff.png";
            
        }
        else
        {
            dzwiek = true;
            document.getElementById('click').play();
            document.getElementById('wycisz').src = "files/muzykaon.png";
           
        }
        
    }

    function wybudujprzycisk()
    {
        for(var i = 1;i<=9;i++)
        {
            var przycisk = document.getElementById('budynek'+i);
            var nowy = document.createElement('input');
            nowy.value = '+';
            nowy.type = 'image';
            nowy.src = 'files/plus.png'
            nowy.id=i;
            nowy.setAttribute("onclick",'wybudujBudynek(budynek'+i+',this.id)');
            przycisk.parentNode.replaceChild(nowy, przycisk);
        }
            
    }
    function nowylvl()
    {
        if(blokada == false)
        {
            clearInterval(budynek1.interval);
            clearInterval(budynek2.interval);
            clearInterval(budynek3.interval);
            clearInterval(budynek4.interval);
            clearInterval(budynek5.interval);
            clearInterval(budynek6.interval);
            clearInterval(budynek7.interval);
            clearInterval(budynek8.interval);
            clearInterval(budynek9.interval);
            document.getElementById(budynek2.pasek).style.width = 1 +'%';
            document.getElementById(budynek3.pasek).style.width = 1 +'%';
            document.getElementById(budynek4.pasek).style.width = 1 +'%';
            document.getElementById(budynek5.pasek).style.width = 1 +'%';
            document.getElementById(budynek6.pasek).style.width = 1 +'%';
            document.getElementById(budynek7.pasek).style.width = 1 +'%';
            document.getElementById(budynek8.pasek).style.width = 1 +'%';
            document.getElementById(budynek9.pasek).style.width = 1 +'%';
            budynek1.counter = 0;
            budynek2.counter = 0;
            budynek3.counter = 0;
            budynek4.counter = 0;
            budynek5.counter = 0;
            budynek6.counter = 0;
            budynek7.counter = 0;
            budynek8.counter = 0;
            budynek9.counter = 0;
            gracz.budynki = 0;
            gracz.zarobki = 0;
            zarobki = 1;
            cena = 0;
            document.getElementById("myBar").style.width = '1%';
            document.getElementById('nowylvl').src = 'files/klodka.png';
            if(gracz.poziom == 1)
            {
                surowiec.nazwa = 'Kamien';
                surowiec.mnoznik = 5;
                budynek1.zdjecie = 'files/kopalniak1.png';
                budynek2.zdjecie = 'files/kopalniak2.png'; 
                budynek3.zdjecie = 'files/kopalniak3.png';
                budynek4.zdjecie = 'files/kopalniak4.png';
                budynek5.zdjecie = 'files/kopalniak5.png';
                budynek6.zdjecie = 'files/kopalniak6.png';
                budynek7.zdjecie = 'files/kopalniak7.png';
                budynek8.zdjecie = 'files/kopalniak8.png';
                budynek9.zdjecie = 'files/kopalniak9.png';
                surowiec.zdjecie = 'files/kamien.png';
                gracz.poziom +=1;
            }
            else if(gracz.poziom == 2)
            {
                surowiec.nazwa = 'Zelazo'
                surowiec.mnoznik = 10;
                budynek1.zdjecie = 'files/kopalnia1.png';
                budynek2.zdjecie = 'files/kopalnia2.png'; 
                budynek3.zdjecie = 'files/kopalnia3.png';
                budynek4.zdjecie = 'files/kopalnia4.png';
                budynek5.zdjecie = 'files/kopalnia5.png';
                budynek6.zdjecie = 'files/kopalnia6.png';
                budynek7.zdjecie = 'files/kopalnia7.png';
                budynek8.zdjecie = 'files/kopalnia8.png';
                budynek9.zdjecie = 'files/kopalnia9.png';
                surowiec.zdjecie = 'files/zelazo.png';
                gracz.poziom +=1;

            }
            else if(gracz.poziom == 3)
            {
                surowiec.nazwa = 'Zloto'
                surowiec.mnoznik = 10;
                budynek1.zdjecie = 'files/kopalniaz1.png';
                budynek2.zdjecie = 'files/kopalniaz2.png'; 
                budynek3.zdjecie = 'files/kopalniaz3.png';
                budynek4.zdjecie = 'files/kopalniaz4.png';
                budynek5.zdjecie = 'files/kopalniaz5.png';
                budynek6.zdjecie = 'files/kopalniaz6.png';
                budynek7.zdjecie = 'files/kopalniaz7.png';
                budynek8.zdjecie = 'files/kopalniaz8.png';
                budynek9.zdjecie = 'files/kopalniaz9.png';
                surowiec.zdjecie = 'files/zloto.png';
                gracz.poziom +=1;

            }
            else if(gracz.poziom == 4)
            {
                surowiec.nazwa = 'Diament'
                surowiec.mnoznik = 10;
                budynek1.zdjecie = 'files/kopalniad1.png';
                budynek2.zdjecie = 'files/kopalniad2.png'; 
                budynek3.zdjecie = 'files/kopalniad3.png';
                budynek4.zdjecie = 'files/kopalniad4.png';
                budynek5.zdjecie = 'files/kopalniad5.png';
                budynek6.zdjecie = 'files/kopalniad6.png';
                budynek7.zdjecie = 'files/kopalniad7.png';
                budynek8.zdjecie = 'files/kopalniad8.png';
                budynek9.zdjecie = 'files/kopalniad9.png';
                surowiec.zdjecie = 'files/diament.png';
                gracz.poziom +=1;

            }
            else if(gracz.poziom == 5)
            {
                surowiec.nazwa = 'wygrana';
                gracz.zarobki = 'wygrana';
                gracz.poziom = 'wygrana';
                window.alert("WYGRAŁEŚ!!!!");
                surowiec.mnoznik = 0;

            }
            blokada = true;
            if(dzwiek == true)
            {
                document.getElementById('lvlaudio').play();
            }
            wybudujprzycisk();
            start();
        }
    }

    function pauza() 
    {
        if(gracz.budynki >= 1)
        {
            clearInterval(budynek1.interval)
        }
        if(gracz.budynki >= 2)
        {
            clearInterval(budynek2.interval)
        }
        if(gracz.budynki >= 3)
        {
            clearInterval(budynek3.interval)
        }
        if(gracz.budynki >= 4)
        {
            clearInterval(budynek4.interval)
        }
        if(gracz.budynki >= 5)
        {
            clearInterval(budynek5.interval)
        }
        if(gracz.budynki >= 6)
        {
            clearInterval(budynek6.interval)
        }
        if(gracz.budynki >= 7)
        {
            clearInterval(budynek7.interval)
        }
        if(gracz.budynki >= 8)
        {
            clearInterval(budynek8.interval)
        }
        if(gracz.budynki == 9)
        {
            clearInterval(budynek9.interval)
        }               
    }

    function odpauza()
    {
        if(gracz.budynki >= 1)
            {
                budynek1.interval = setInterval(() => pasek(budynek1), budynek1.pasekczas);
            }
            if(gracz.budynki >= 2)
            {
                budynek2.interval = setInterval(() => pasek(budynek2), budynek2.pasekczas);
            }
            if(gracz.budynki >= 3)
            {
                budynek3.interval = setInterval(() => pasek(budynek3), budynek3.pasekczas);
            }
            if(gracz.budynki >= 4)
            {
                budynek4.interval = setInterval(() => pasek(budynek4), budynek4.pasekczas);
            }
            if(gracz.budynki >= 5)
            {
                budynek5.interval = setInterval(() => pasek(budynek5), budynek5.pasekczas);
            }
            if(gracz.budynki >= 6)
            {
                budynek6.interval = setInterval(() => pasek(budynek6), budynek6.pasekczas);
            }
            if(gracz.budynki >= 7)
            {
                budynek7.interval = setInterval(() => pasek(budynek7), budynek7.pasekczas);
            }
            if(gracz.budynki >= 8)
            {
                budynek8.interval = setInterval(() => pasek(budynek8), budynek8.pasekczas);
            }
            if(gracz.budynki == 9)
            {
                budynek9.interval = setInterval(() => pasek(budynek9), budynek9.pasekczas);
            }  
        } 

    function pauzaekran()
    {
        if(document.hidden) 
        {
            pauza();
        } 
        else 
        {
            odpauza();
        }  
    }
    document.addEventListener('visibilitychange', pauzaekran);
    start();