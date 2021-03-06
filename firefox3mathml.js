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
  for (var i=0; i<mmlnode.length; i++) {
   var str=mmlnode[i].innerHTML;

   str = str.replace(/<\/(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)[^<>]*>/ig,'');
   str = str.replace(/<(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)([^<>]*)>/ig,'<$1$2></$1>');
   str = str.replace(/<(mtd)([^<>]*)>(?=\s*<mtd)/ig,'<$1$2></$1>');
   str = str.replace(/(<\/mtd>)+<\/mtr>/ig,'</mtd></mtr>');
   str = str.replace(/<(mtr)([^<>]*)>/ig,'</mtr><$1$2>');
   str = str.replace(/(<mtable[*<>]*>)\s*<\/mtr>/ig,'$1');
   str = str.replace(/<\/mtr>(\s*<\/mt[dr]>)+<(\/mtable|mtr)>/ig,'</mtr><$2>');

   mmlnode[i].innerHTML=str;


   mmlnode[i].parentNode.replaceChild(convertff(mmlnode[i]),mmlnode[i]);
}
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

