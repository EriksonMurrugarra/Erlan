function inject(callback) 
{
  var baseUrl = "src/";
  
  var load = window.__ace_loader__ = function(path, module, callback) 
  {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');

    s.src = baseUrl + path;
    head.appendChild(s);
    
    s.onload = function() 
    {
      window.__ace_shadowed__.require([module], callback);
    };
  };

  load('ace-bookmarklet.js', "ace/ext/textarea", function() 
  {
      var ace = window.__ace_shadowed__;
      
      ace.options.mode = "javascript";

      var Event = ace.require("ace/lib/event");
      var areas = document.getElementsByTagName("textarea");
      for (var i = 0; i < areas.length; i++) 
      {
          Event.addListener(areas[i], "click", function(e) 
          {
              if (e.detail == 3) 
              {
                  ace.transformTextarea(e.target, load);
              }
          });
      }
      callback && callback();
  }); 
}

var textAce;

inject(function () 
{
  // Transform the textarea on the page into an ace editor.
  var ace = window.__ace_shadowed__;
  var t = document.querySelector("textarea");
  textAce = ace.transformTextarea(t, window.__ace_loader__);

  setTimeout(function()
  {
    textAce.setFontSize("14px"); 
    textAce.setTheme("ace/theme/terminal");
  });

  window.textAce = textAce; 
});

