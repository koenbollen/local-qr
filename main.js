
function updateQR() {
  qrcode.clear();
  qrcode.makeCode(document.getElementById( "in" ).value);
}

var qrcode;
window.onload = function() {
  qrcode = new QRCode("qr", {
       text : "",
       width : 256,
       height : 256
  });

  var prev;  
  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById( "in" ).value = prev = tab.url;
    updateQR();
  });

  var input = document.getElementById("in");

  input.onkeyup = function() {
    if(document.getElementById( "in" ).value != prev) {
      prev = document.getElementById( "in" ).value;
      updateQR();
    }
  };
  input.onfocus = function() {
    this.select();
  };
  input.onmouseup = function(e) {
    e.preventDefault(); // For the select on focus.
  };

  document.getElementById("options-button").onclick = function() {
    var o = document.getElementById("options");
    o.style.display = o.style.display == "none" ? "block" : "none";
    input.focus();
  };

};