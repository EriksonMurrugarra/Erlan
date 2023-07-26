function ejecuta()
{
  var e1 = new Erikson();
  e1.fnInitErikson(textAce.getValue(), true);
}

function closeTutorial()
{
  $("#Tutorial").slideUp(100); 
  $("#lighto").animate({height: '12em'});
}

function openTutorial() 
{
  $("#Tutorial").slideDown(100); 
  $("#lighto").animate({height: '17em'});
}

function changeEditorFontSize() 
{
  const fontSize = $("#fontSize").val();
  window.textAce.setFontSize(`${fontSize}px`);
  $("#console").css("font-size", `${fontSize}px`);
}

// Pizarra
function changeBlackBoardColor(color)
{
  $("#pizarra").css("background-color", color);
}

function closeBlackboard() 
{
  $("#pizarra").fadeOut(100);
}

function openBlackboard() 
{
  $("#pizarra").fadeIn(100);
}

function share() 
{
  window.open("/run.html?code=" + window.cookie, '_blank');
}