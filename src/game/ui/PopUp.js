/**
 * Created by maxpaint on 08.11.2014.
 */

PopupManager = (function(){

    var _dialogUI =  $( "#dialog" );


    function showAlert(message, title, object){
        console.log("DATA", _dialogUI.attr("title"));
        _dialogUI.empty();
        console.log("DATA", _dialogUI.attr("title"));
        _dialogUI.attr( "title", title );
        _dialogUI.append( "<div>"+ message +"</div>" );

        if(object == null){
            _dialogUI.dialog({
                    resizable: false,
                    height:200,
                    modal: true,
                    buttons: {
                        Ok: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                }
            );
        }else{
            _dialogUI.dialog(object);
        }
    }

    return {
        showAlert: function(message, title){
            showAlert(message, title);
        }
    };
})();


$( "#dialog-confirm" ).dialog({

    buttons: {
        "Delete all items": function() {
            $( this ).dialog( "close" );
        },
        Cancel: function() {
            $( this ).dialog( "close" );
        }
    }
});
