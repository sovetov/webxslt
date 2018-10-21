(function () {
  if (typeof XSLTProcessor !== 'undefined') {
    // Chrome, Firefox.
    function request(path, cb) {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState != XMLHttpRequest.DONE)
          return;
        var xml = xhr.responseXML;
        cb(xml);
      }
      xhr.open("GET", path, true);
      xhr.send();
    }

    function transform(xml, xsl) {
      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl);
      var resultDocument = xsltProcessor.transformToFragment(xml, document);
      return resultDocument
    }

    function append(elem, fragment) {
      elem.appendChild(fragment);
    }

    function fillWith(elem, fragment) {
      elem.innerHTML = "";
      elem.appendChild(fragment);
    }
  } else {
    // IE.
    function request(path, cb) {
      var xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0"); // responseXML returns ActiveX objects. 3.0 doesn't work.
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4)
          return;
        var xml = xhr.responseXML;
        cb(xml);
      }
      xhr.open("GET", path, true);
      xhr.send();
    }

    function transform(xml, xsl) {
      var raw = xml.transformNode(xsl);
      return raw;
    }

    function append(elem, fragment) {
      elem.insertAdjacentHTML("beforeend", fragment);
    }

    function fillWith(elem, fragment) {
      elem.innerHTML = fragment;
    }
  }

  request("base.xsl", function (xsl) {
    window.appendX = function (elem, uri) {
      request(uri, function (xml) {
        var fragment = transform(xml, xsl);
        append(elem, fragment);
      });
    };
    window.fillWithX = function (elem, uri) {
      request(uri, function (xml) {
        var fragment = transform(xml, xsl);
        fillWith(elem, fragment);
      });
    };
  })
})()