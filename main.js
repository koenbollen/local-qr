
function updateQR() {
  qrcode.clear();
  qrcode.makeCode(document.getElementById( "in" ).value);
}

var qrcode;
window.onload = function() {
  qrcode = new QRCode("qr", {
       text : "",
       width : 256,
       height : 256,
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

  var optionsButton = document.getElementById("options-button");

  optionsButton.onclick = function() {
    var o = document.getElementById("options");

    if(o.className === "active") {
      optionsButton.setAttribute("class", "");
      o.setAttribute("class", "");
    } else {
      optionsButton.setAttribute("class", "active");
      o.setAttribute("class", "active");

      input.focus();
      input.select();
    }
  };

  var lis = document.querySelectorAll('ul.slider li');
  [].forEach.call(lis,function(li) {
    li.onclick = function(e) {
      if( !this.classList.contains('active') ) {
        [].forEach.call(lis, function(li) { li.classList.remove('active'); } );
        this.classList.add('active');

        var i = 0;
        var child = this;
        while( (child = child.previousSibling) != null )
          if (child.nodeType === 1)
            i++;

        if(i == 0 ) {
          qrcode._htOption.correctLevel = QRCode.CorrectLevel.M;
        } else if(i == 1 ) {
          qrcode._htOption.correctLevel = QRCode.CorrectLevel.Q;
        } else if(i == 2 ) {
          qrcode._htOption.correctLevel = QRCode.CorrectLevel.H;
        }
        updateQR();
      }
    }
  });
};