
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
  
  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById( "in" ).value = tab.url;
    updateQR();
  });

  window.onclick = function() {
    document.getElementById( "options" ).style.display = "block";
  };

};