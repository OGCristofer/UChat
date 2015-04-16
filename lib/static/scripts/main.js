var replacements = [
			{regex : /\*(.+)\*/g, replacement: "<span style=\"font-weight: bold;\">$1</span>"},
			{regex : /_(.+)_/g, replacement: "<span style=\"font-style: italic;\">$1</span>"}
		],
		pairs = {
			"color": "color",
			"background-color": "color",
			"font": ["sans-serif", "monospace"]
		},
		keys = {};
function isValidHex(value){
	return /^#(?:[0-9a-f]{3}){1,2}$/i.test(value);
}
function isValidColorName(value){
	return /^aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflower|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|webgray|green|webgreen|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrod|lightgray|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|webmaroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navyblue|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|webpurple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen$/i.test(value);
}
function isValidRGB(value){
	var unspaced = value.replace(/ +/g, ""), i, n,
			values = /^(rgb)\(\s*(\d+%?),\s*(\d+%?),\s*(\d+%?)\s*\)$/.exec(unspaced);
	if(values === null || values[1] !== "rgb")return false;
	for(i = 0; i < 3; i ++){
		n = values[i+2] = parseInt(values[i]);
		if(n < 0 || n > 255)return false;
	}
	return true;
}
function isValidRule(rule){
	var possibleValues,
			property = rule[0],
			value = rule[1];
	if(!pairs.hasOwnProperty(property))return false;
	possibleValues = pairs[property];
	if(toString.call(possibleValues) === "[object Array]")
		return possibleValues.indexOf(value) !== -1;
	else if(possibleValues === "color")
		return isValidRGB(value) || isValidHex(value) || isValidColorName(value);
	return false;
}
function parseMessage(message){
	var i, j, r, regex, rules, styled, result = message;
	if(message === "")return null;
	for(i = 0; i < replacements.length; i ++){
		r = replacements[i];
		result = result.replace(r.regex, r.replacement);
	}
	regex = /\[(.*)\]{(.*)}/g;
	while((styled = regex.exec(result)) !== null){
		styled[2] = styled[2].replace("&nbsp;", " ");
		rules = styled[2].split(/;\s+/);
		for(i = 0; i < rules.length; i ++){
			rules[i] = rules[i].split(/\s*:\s*/);
			if(!isValidRule(rules[i])){
				rules.splice(i, 1);
				continue;
			}
			if(rules[i][0] === "font"){
				if(rules[i][1] === "sans-serif"){
					rules[i][0] = "font-family";
					rules[i][1] = "\"Open Sans\", sans-serif";
				}
				if(rules[i][1] === "monospace"){
					rules[i][0] = "font-family";
					rules[i][1] = "\"Droid Sans Mono\", monospace";
				}
			}
			rules[i] = rules[i].join(": ");
		}
		rules = rules.join("; ");
		if(styled[1] === "")return null;
		if(rules.length > 0)result = result.replace(styled[0], "<span style='"+rules+"'>"+styled[1]+"</span>");
		else result = result.replace(styled[0], styled[1]);
	}
	return result;
}
function sendMessage(message){
	// Send the message
	var text = message || $("#input").html(),
			parsed = "<span>"+parseMessage(text)+"</span>",
			$message,
			$arrow,
			$innerText;

	if(parsed !== null){
		$message = $("<div class='message'></div>");
		$arrow = $("<div class='arrow'></div>");
		$innerText = $(parsed);
		$message.css("backgroundColor", $innerText.css("backgroundColor"));
		$arrow.css("borderRightColor", $innerText.css("backgroundColor"));
		$message.append($innerText);
		$message.append($arrow);
		$("#messages").append($message, "<br>");
		$message.css({opacity: 0, marginTop: "0px"})
		$message.animate({opacity: 1, marginTop: "16px"}, 300);
	}
	if(text !== message)$("#input").html("");
}
$("#send").click(
	function(){
		sendMessage();
	}
);
$("#input").keydown(
	function(e){
		if(e.which === 13){
			if(keys[17]){
				$("#input").append("<br>");
			} else {
				e.preventDefault();
				sendMessage();
			}
		}
	}
);
$(document).keydown(
	function(e){ keys[e.which] = true; }
);
$(document).keyup(
	function(e){ keys[e.which] = false; }
);
sendMessage("*Welcome to _uChat!*_");
sendMessage("Besides just typing and hitting return, you can also **bold** and __italicize__ text. You can also use [[special styling]{color: rgb(204, 51, 153); font: monospace}]{color: rgb(204, 51, 153); font: monospace}. Give it a shot!");
