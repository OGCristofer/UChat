function send(message){
  // Send the message
  $("messages").append($("<div class='message'>"+message+"</div>"));
}

$("#input").keydown(
  function(e){
    console.log(e);
  }
);
