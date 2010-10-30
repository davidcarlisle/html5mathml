// operamathml.js
// d.p.carlisle@gmail.com
// may be used under MIT license
// http://www.opensource.org/licenses/mit-license.php

function operamathml() {
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
   str = str.replace(/(<mspace[^<>]*)width=.([0-9][^"]*)"/g,'$1style="margin-left:$2"');
   str = str.replace(/<(mfrac|msub|msup)([^<>\/]*)>/g,'<mrow><$1$2>');
   str = str.replace(/<\/(mfrac|msub|msup)>/g,'</$1></mrow>');
   mmlnode[i].innerHTML=str;
   var mm = mmlnode[i].getElementsByTagName("mmultiscripts");
   


  }


}



if ( navigator.userAgent.match(/Presto\/2\.6/)) {
  document.write("<link rel=\"stylesheet\" href=\"operamathml.css\" type=\"text/css\">");
  window.addEventListener("load", operamathml, false);
    }

