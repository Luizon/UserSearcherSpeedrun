let salir = false;
let hUsers = [];
let start;
let end;
// function encodeSearch64(searchText) {
//     let rawJson = `{"query":"${searchText}","limit":500,"includeGames":false,"includeNews":false,"includePages":false,"includeSeries":false,"includeUsers":true}`;
//     let output = btoa(rawJson);
//     output = output.replace(/=/g, "");
//     return output;
// }
// async function testBorrarV2() {
//     // 97612 con a
//     start = new Date();
//     hUsers = [];
//     character = $("input").val();
//     abcd = "|+-_.0123456789@abcdefghijklmnopqrstuvwxyz";
//     $("#loading").html("Cargando...");
//     $("#time").html("hora inicio: " + start);
//     $("#users").html("<h1>Lista de usuarios</h1>");
//     salir = false;
//     let offset = 0;
//     let porcentaje = 0;
//     await $.get(`https://www.speedrun.com/api/v2/GetSearch?_r=${encodeSearch64(character)}`)
//         .done(answer => {
//             console.log(answer.userList)
//             tiempoTranscurrido();
//             answer.userList.forEach( user => {
//                 console.log(user)
//                 if(user.areaId.length > 1)
//                     if(!abcd.includes(user.areaId.charAt(1).toLowerCase()))
//                         console.log(user.areaId);
//                 if(user.areaId != null) {
//                     if(user.areaId == undefined)
//                         return;
//                     if($("#comboCountry").val() == user.areaId) {
//                         $("#users").html($("#users").html() + "<br>" + user.name);
//                         hUsers.push(user.name);
//                     }
//                 }
//             });
//         })
//         .fail(error => {
//             console.log(error);
//             $("#loading").html("Terminó con error");
//         })
//     $("#loading").html("Terminó proceso de busqueda con " + hUsers.length + " usuarios encontrados.");
//     tiempoTranscurrido();
//     console.log(hUsers);
// }
async function testBorrar() {
    // 97612 con a
    start = new Date();
    hUsers = [];
    character = $("input").val();
    abcd = "|+-_.0123456789@abcdefghijklmnopqrstuvwxyz";
    $("#loading").html("0% cargando...");
    $("#time").html("hora inicio: " + start);
    $("#users").html("<h1>Lista de usuarios</h1>");
    // for( let i = 0 ; i < abcd.length ; i++ ) {
        salir = false;
        let offset = 0;
        let porcentaje = 0;
        while(!salir)
            await $.get(`https://www.speedrun.com/api/v1/users?name=${character}&max=200&size=200&offset=${offset}`)
            // await $.get(`https://www.speedrun.com/api/v1/users?name=${abcd.charAt(i)}&max=200&size=200&offset=${offset}`)
                .done(answer => {
                    console.log(answer)
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
                    if(error.responseJSON.message.toLowerCase().includes("3 characters"))
                        $("#users").html("<b>Necesitas usar al menos 3 caracteres para hacer una búsqueda</b>");
                })
        // }    
    $("#loading").html("Terminó proceso de busqueda con " + hUsers.length + " usuarios encontrados.");
    tiempoTranscurrido();
    console.log(hUsers);
}

function tiempoTranscurrido() {
    end = new Date();
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