'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();
var opiniones;
var lista;

function init() {
    lista = context.get_web().get_lists().getByTitle("Opiniones");
    //var opiniones = lista.getItems(new SP.CamlQuery());
    //context.load(opiniones);
    //context.executeQueryAsync(function () { }, function (sender, args) {

    //    alert(args.get_message());
    //});
}

function crearOpinion() {

    //var lista = context.get_web().get_lists().getByTitle("Opiniones");
    var ici = SP.ListItemCreationInformation();
    var item = lista.addItem(ici);
    item.set_item("Subject", $("#txtAsunto").val());
    item.set_item("Opinion", $("#txtOpinion").val());

    item.update();
    context.load(item);
    context.executeQueryAsync(function() {
        alert("Opinion creada con exito");
            listadoOpiniones();
        },
        function(sender, args) {
            alert(args.get_message());
    }

   );

}

function listadoOpiniones() {
    //var lista = context.get_web().get_lists().getByTitle("Opiniones");
    opiniones = lista.getItems(new SP.CamlQuery());
    context.load(opiniones);
    context.executeQueryAsync(function() {
        var html = "<ul>";

        var enumeracion = opiniones.getEnumerator();
        while (enumeracion.moveNext()) {
            var item = enumeracion.get_current();
            html += "<li><a href='#' onclick='cargar(" + item.get_item("ID") + ")'>" +
                item.get_item("Subject") +
                "</a></li>";
        }

        html += "</ul>";
        $("#listado").html(html);

    },function(sender, args) {
         alert(args.get_message());
    });

}

function cargar(id) {
    //var lista = context.get_web().get_lists().getByTitle("Opiniones");
    //var opiniones = lista.getItems(new SP.CamlQuery());
    //context.load(opiniones);
    

    //var item = opiniones.getItemById(id);
    //context.load(item);
    //context.executeQueryAsync(function () {

    var enumeracion = opiniones.getEnumerator();
    while (enumeracion.moveNext()) {
        var item = enumeracion.get_current();
        if(item.get_item("ID") == id){

        $("#Asunto").html(item.get_item("Subject"));
        $("#texto").html(item.get_item("Opinion"));
            break;
        }
    }
    //}, function(sender, args) {
    //    alert(args.get_message());
    //});
}

$(document).ready(function() {
    $("#btnAddOpinion").click(function() {
        crearOpinion();
    });
    init();
    listadoOpiniones();

});