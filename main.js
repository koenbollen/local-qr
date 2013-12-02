
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


  chrome.storage.sync.get("correctionlevel", function(items) {
    console.log(items);
    if( items['correctionlevel'] !== undefined ) {
      var lis = document.querySelectorAll('ul.slider li');
      lis[2].classList.remove('active');
      lis[items['correctionlevel']].classList.add('active');

      var i = items['correctionlevel'];
      if(i == 0 ) {
        qrcode._htOption.correctLevel = QRCode.CorrectLevel.M;
      } else if(i == 1 ) {
        qrcode._htOption.correctLevel = QRCode.CorrectLevel.Q;
      } else if(i == 2 ) {
        qrcode._htOption.correctLevel = QRCode.CorrectLevel.H;
      }
    }

    var prev;
    chrome.tabs.getSelected(null, function(tab) {
      document.getElementById( "in" ).value = prev = tab.url;
      updateQR();
    });
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
  var wrapper = document.querySelector(".wrapper");

  optionsButton.onclick = function() {
    var o = document.getElementById("options");

    if(o.className === "active") {
      optionsButton.setAttribute("class", "");
      o.setAttribute("class", "");
      wrapper.style.marginLeft = "0px";
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
        chrome.storage.sync.set({'correctionlevel': i});
      }
    }
  });

  document.getElementById("info").onclick = function(e) {
    wrapper.style.marginLeft = "-296px";
    var o = document.getElementById("options");

    if(o.className !== "active") {
      optionsButton.setAttribute("class", "active");
      o.setAttribute("class", "active");

      input.focus();
      input.select();
    }
  };
};