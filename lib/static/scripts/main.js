function send(){
  // Send the message
  var message = $("#input").html();
  if(message === "")return;
  $("#messages").append($("<div class='message'>"+message+"</div>"));
  $("#input").html("");
}
$("#send").click(
    function(){
        send();
    }
);
$("#input").keydown(
  function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      send();
    }
  }
);
