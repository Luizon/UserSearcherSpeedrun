let salir = false;
let hUsers = [];
let start;
let end;

async function testBorrar() {
    // 97612 con a
    start = new Date();
    hUsers = [];
    letter = $("input").val();
    abcd = "|+-_.0123456789@abcdefghijklmnopqrstuvwxyz";
    $("#loading").html("0% cargando...");
    $("#time").html("hora inicio: " + start);
    $("#users").html("<h1>Lista de usuarios</h1>");
    // for( let i = 0 ; i < abcd.length ; i++ ) {
        salir = false;
        let offset = 0;
        let porcentaje = 0;
        while(!salir)
            await $.get(`https://www.speedrun.com/api/v1/users?name=${letter}&max=200&size=200&offset=${offset}`)
            // await $.get(`https://www.speedrun.com/api/v1/users?name=${abcd.charAt(i)}&max=200&size=200&offset=${offset}`)
                .done(answer => {
                    tiempoTranscurrido();
                    // porcentaje = Math.floor((i*100)/abcd.length);
                    if(answer.data.length == 0) {
                        salir = true;
                        return;
                    }
                    porcentaje = Math.ceil(abcd.indexOf(answer.data[0].names.international.charAt(1).toLowerCase()) * 100/ abcd.length);
                    $("#loading").html(porcentaje + "% cargando...");
                    offset+= answer.data.length;
                    console.log("Van " + offset + ". Son " + hUsers.length + " de costa rica");
                    answer.data.forEach( user => {
                        if(user.names.international.length > 1)
                            if(!abcd.includes(user.names.international.charAt(1).toLowerCase()))
                                console.log(user.names.international);
                        if(user.location != null) {
                            if(user.location.country == undefined || user.location.country == null)
                                return;
                            if($("#comboCountry").val() == user.location.country.code) {
                                $("#users").html($("#users").html() + "<br>" + user.names.international);
                                hUsers.push(user.names.international);
                            }
                        }
                    });
                })
                .fail(error => {
                    console.log(error);
                    $("#loading").html("Terminó con error");
                })
        // }    
    $("#loading").html("Terminó proceso de busqueda con " + hUsers.length + " usuarios encontrados.");
    end = new Date();
    tiempoTranscurrido();
    console.log(hUsers);
}

function tiempoTranscurrido() {
    let hours = Math.floor(((end - start) / 3600000) % 60);
    if(hours < 10)
        hours = "0" + hours;
    let min = Math.floor(((end - start) / 60000) % 60);
    if(min < 10)
        min = "0" + min;
    let sec = Math.floor(((end - start)/1000) % 60);
    if(sec < 10)
        sec = "0" + sec;
    $("#time").html(`${hours}:${min}:${sec}`);
}