function send(message){
  // Send the message
  $("messages").append($("<div class='message'>"+message+"</div>"));
  $("#input").attr("value", "");
}
$("#input").keydown(
  function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      send($("#input").attr("value"));
    }
  }
);
