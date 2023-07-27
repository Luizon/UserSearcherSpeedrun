let salir = false;
let hUsers = [];
let start;
let end;

async function testBorrar() {
    // 97612 con a
    let offset = 0;
    start = new Date();
    hUsers = [];
    // letter = "a"
    abcd = "abcdefghijklmnopqrstuvwxyz";
    $("#loading").html("0% cargando...");
    $("#time").html(start);
    $("#users").html("<h1>Lista de usuarios</h1>");
    for( let i = 0 ; i < abcd.length ; i++ ) {
        salir = false;
        while(!salir)
            await $.get(`https://www.speedrun.com/api/v1/users?name=${abcd.charAt(i)}&max=200&size=200&offset=${offset}`)
                .done(answer => {
                    $("#loading").html(Math.floor((i*100)/abcd.length) + "% cargando...");
                    if(answer.data.length == 0) {
                        salir = true;
                        return;
                    }
                    offset+= answer.data.length;
                    console.log("Van " + offset + ". Son " + hUsers.length + " de costa rica");
                    answer.data.forEach( user => {
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
        }
    $("#loading").html("Terminó proceso de busqueda con " + hUsers.length + " usuarios encontrados.");
    end = new Date();
    $("#loading").html("Terminó proceso de busqueda con " + hUsers.length + " usuarios encontrados.");
    console.log("Quedaron " + offset + " al final");
    console.log(hUsers);
}