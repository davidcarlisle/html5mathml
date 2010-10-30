// firefox3mathml.js
// d.p.carlisle@gmail.com
// may be used under MIT license
// http://www.opensource.org/licenses/mit-license.php

function domathff() {
  var mmlnodea = document.getElementsByTagName("math");
  var mmlnode = [];
  for( var i = 0; i < mmlnodea.length; i++ ) {
      mmlnode[mmlnode.length] = mmlnodea[i];
  }
  for (var i=0; i<mmlnode.length; i++)
      mmlnode[i].parentNode.replaceChild(convertff(mmlnode[i]),mmlnode[i]);
}

function convertff(node) {
  if (node.nodeType==1) {
    var newnode = 
      document.createElementNS("http://www.w3.org/1998/Math/MathML",
        node.nodeName.toLowerCase());
    for(var i=0; i < node.attributes.length; i++)
      newnode.setAttribute(node.attributes[i].nodeName,
                           node.attributes[i].nodeValue);
    var cnode = [];
    for( var i = 0; i <node.childNodes.length; i++ ) {
        cnode[cnode.length] = node.childNodes[i];
    }
    for (var i=0; i<cnode.length; i++) {
        newnode.appendChild(convertff(cnode[i]));
    }
    return newnode;
  }
  else return node;
}




if ( navigator.userAgent.match(/Gecko/) && (! navigator.userAgent.match(/Firefox [4-9]|WebKit/))) {
  window.addEventListener('load', domathff, false);
}

