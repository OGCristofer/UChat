function send(message){
  // Send the message
  $("messages").append($("<div class='message'>"+message+"</div>"));
  $("#input").attr("value", "");
}
$("#input").keydown(
  function(e){
    if(e.keyCode === 13){
      alert("You pressed enter. Good job.");
      e.preventDefault();
      send($("#input").attr("value"));
    }
  }
);
