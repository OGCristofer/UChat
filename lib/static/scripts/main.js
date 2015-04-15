function send(message){
  // Send the message
  $("messages").append($("<div class='message'>"+message+"</div>"));
}

alert("Welcome to uChat, noobs!");
$("#input").keydown(
  function(e){
    console.log(e);
  }
);
