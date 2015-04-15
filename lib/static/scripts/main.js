function send(message){
  // Send the message
  $("messages").append($("<div class='message'>"+message+"</div>"));
}

$("#input").keyup(
  function(e){
    console.log(e);
  }
);
