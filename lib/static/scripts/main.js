var input = 'var string = "Hello World!"';

function parseJavaScript(code){
  return code.replace(\(var)\g, "<span style='color: #c36'>$1</span>");
}

input = parseJavaScript(input);

$("body").append("<span>"+input+"</span>");
