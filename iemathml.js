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


if (navigator.userAgent.match(/MSIE [6-9]/)) {
document.write("<object id=\"mmlFactory\" classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object><?import namespace=\"m\" implementation=\"#mmlFactory\"?>");
window.onload = domath;
    }


