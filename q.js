if (typeof XSLTProcessor !== 'undefined') {
  // Chrome, Firefox.
  function transform(xml, xsl) {
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    var resultDocument = xsltProcessor.transformToFragment(xml, document);
    return resultDocument
  }

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

  function append(elem, fragment) {
      elem.appendChild(fragment);
  }
} else {
  // IE.
  function request(path, cb) {
    var xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0"); // responseXML returns ActiveX objects.
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
}

function q() {
  request('data.xml', function (xml) {
    request("fragment.xsl", function (xsl) {
      var fragment = transform(xml, xsl);
      var elem = document.getElementById("asy");
      append(elem, fragment);
    });
  });
}