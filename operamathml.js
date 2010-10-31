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
   str = str.replace(/(<mspace[^<>]*)width=.([0-9][^"]*)"/ig,'$1style="margin-left:$2"');
   str = str.replace(/<(mfrac|msub|msup)([^<>\/]*)>/ig,'<mrow><$1$2>');
   str = str.replace(/<\/(mfrac|msub|msup)>/ig,'</$1></mrow>');
   str = str.replace(/(<[^<>]*)mathcolor="/ig,'$1style="color:');
   mmlnode[i].innerHTML=str;
   var mm = mmlnode[i].getElementsByTagName("mmultiscripts");
   for( var i2 = 0; i2 < mm.length; i2++ ) {

   var tbl = document.createElement("mmultiscriptsx");
   var r1 = document.createElement("mtrx");
   var r2 = document.createElement("mtrx");
   var r3 = document.createElement("mtrx");
   tbl.appendChild(r1);
   tbl.appendChild(r2);
   tbl.appendChild(r3);
    var cnode = [];
    var chel = mm[i2].getElementsByTagName("*");
    for( var i3 = 0; i3 < chel.length; i3++ ) {
        cnode[cnode.length] = chel[i3];
    }
   var presc = cnode.length;
    for (var i4=0; i4<cnode.length; i4++) {
     if (cnode[i4].nodeName=="MPRESCRIPTS") {
       presc = i4;
       break;
      }
}
  var cell;
  for(i5=presc+1;i5<cnode.length;i5=i5+2) {
   cell=document.createElement("mtdx");
   cell.appendChild(cnode[i5]);
   r3.appendChild(cell);
   cell=document.createElement("mtdx");
   r2.appendChild(cell);
   cell=document.createElement("mtdx");
   cell.appendChild(cnode[i5+1]);
   r1.appendChild(cell);
  }
   cell=document.createElement("mtdx");
   r3.appendChild(cell);
   cell=document.createElement("mtdx");
   cell.appendChild(cnode[0]);
   r2.appendChild(cell);
   cell=document.createElement("mtdx");
   r1.appendChild(cell);
  for(i5=1;i5<presc;i5=i5+2) {
   var cell=document.createElement("mtdx");
   cell.appendChild(cnode[i5]);
   r3.appendChild(cell);
   cell=document.createElement("mtdx");
   r2.appendChild(cell);
   cell=document.createElement("mtdx");
   cell.appendChild(cnode[i5+1]);
   r1.appendChild(cell);
  }

  

mm[i2].parentNode.replaceChild(tbl,mm[i2]);
   
}
}
}



 if ( navigator.userAgent.match(/Presto\/2\.6/)) {
  document.write("<link rel=\"stylesheet\" href=\"operamathml.css\" type=\"text/css\">");
  window.addEventListener("load", operamathml, false);
    }

