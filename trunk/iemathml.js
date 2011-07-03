// iemathml.js
// d.p.carlisle@gmail.com
// may be used under MIT license
// http://www.opensource.org/licenses/mit-license.php


function domath() {
 var mmlnodea = document.getElementsByTagName("math");
 var mmlnode = [];
  for( var i = 0; i < mmlnodea.length; i++ ) {
    mmlnode[mmlnode.length] = mmlnodea[i];
  }
  for (var i=0; i<mmlnode.length; i++) {
  var parent = mmlnode[i].parentNode;
  if(parent!=null){
   var str=parent.innerHTML;
   str = str.replace(/xmlns=.http:\/\/www.w3.org\/1998\/Math\/MathML./ig,'');
   str = str.replace(/<\?XML:NAMESPACE[^<>]*>/ig,'');
   str = str.replace(/<\/(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)[^<>]*>/ig,'');
   str = str.replace(/<(mtd)([^<>]*)>(?=\s*<mtd)/ig,'<$1$2></$1>');
   str = str.replace(/(<\/mtd>)+<\/mtr>/ig,'</mtd></mtr>');
   str = str.replace(/<(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)([^<>]*)>/ig,'<$1$2></$1>');
   str = str.replace(/<\/?(m\w+|none)/ig,function(w){return (w.toLowerCase()).replace(/(<\/?)/,'$1m:')});
   parent.innerHTML = (str);
  }
 }
}


function convertie(node) {
  if (node.nodeType==1) {
    var newnode = 
      document.createElement("m:" + node.nodeName);
    for(var i=0; i < node.attributes.length; i++)
      newnode.setAttribute(node.attributes[i].nodeName,
                           node.attributes[i].nodeValue);
    var cnode = [];
    for( var i = 0; i <node.childNodes.length; i++ ) {
        cnode[cnode.length] = node.childNodes[i];
    }
    for (var i=0; i<cnode.length; i++) {
        newnode.appendChild(convertie(cnode[i]));
    }
    return newnode;
  }
  else return node;
}

function domath10() {
          var mp = document.createElement("object");
          mp.id = "mathplayer";
          mp.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
          document.getElementsByTagName("head")[0].appendChild(mp);
          document.namespaces.add("m","http://www.w3.org/1998/Math/MathML");
          document.namespaces.m.doImport("#mathplayer");
 var mmlnodea = document.getElementsByTagName("math");
 var mmlnode = [];
  for( var i = 0; i < mmlnodea.length; i++ ) {
    mmlnode[mmlnode.length] = mmlnodea[i];
  }
  for (var i=0; i<mmlnode.length; i++) {
   
 mmlnode[i].parentNode.replaceChild(convertie(mmlnode[i]),mmlnode[i]);

  }
}


if (navigator.userAgent.match(/MSIE [6-9]/)) {
document.write("<object id=\"mmlFactory\" classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object><?import namespace=\"m\" implementation=\"#mmlFactory\"?>");
//window.onload = domath;
window.attachEvent("onload", domath);
    }



if (navigator.userAgent.match(/MSIE 1[0-9]/)) {
    window.onload=domath10;
    }

