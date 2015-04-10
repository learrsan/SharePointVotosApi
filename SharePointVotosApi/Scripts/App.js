'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();


function crearOpinion() {

    var lista = context.get_web().get_lists().getByTitle("Opiniones");
    var ici = SP.ListItemCreationInformation();
    var item = lista.addItem(ici);
    item.set_item("Subject", $("txtAsunto").val());
    item.set_item("Opinion", $("txtOpinion").val());

    item.update();
    context.load(item);
    context.executeQueryAsync(function() {
        alert("Opinion creada con exito");
    },
        function(sender, args) {
            alert(args.get_message());
    }

   );

}

function listadoOpiniones() {
    var lista = context.get_web().get_lists().getByTitle("Opiniones");
    var opiniones = lista.getItems(new SP.CamlQuery());
    context.load(opiniones);
    context.executeQueryAsync(function() {
        

        },function(sender, args) {
         alert(args.get_message());
    });

}

$(document).ready(function() {
    $("#btnAddOpinion").click(function() {
        crearOpinion();
    });

});