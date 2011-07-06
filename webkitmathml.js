// webkitmathml.js
// d.p.carlisle@gmail.com
// may be used under MIT license
// http://www.opensource.org/licenses/mit-license.php

function webkitmathml() {

// alert("start" + document.getElementsByTagName("body")[0].innerHTML);

 var mmlnodea = document.getElementsByTagName("math");
 
 var mtest = document.createElement("span");
 mtest.innerHTML="<math><mspace width='2px'/><mspace/></math>";

document.getElementsByTagName("body")[0].appendChild(mtest);



var understandsempty = (mtest.childNodes[0].childNodes.length == 2);
var mathhasinnerhtml = (mtest.childNodes[0].innerHTML != null);
var mathmlrendered =  (mmlnodea[mmlnodea.length - 1].clientWidth > 0);

if (!mathmlrendered) {
  var head = document.getElementsByTagName("head")[0];
  head.innerHTML = head.innerHTML + "<link rel=\"stylesheet\" href=\"webkitmathml.css\" type=\"text/css\">";
  }



 var mmlnode = [];
  for( var i = 0; i < mmlnodea.length; i++ ) {
    mmlnode[mmlnode.length] = mmlnodea[i];
  }

  for (var i=0; i<mmlnode.length; i++) {
  
  if(!mathmlrendered) {
  
 var str;
  if(mathhasinnerhtml) {
   str=mmlnode[i].innerHTML;
   } else {
   mtest=document.createElement("span");
   mtest.appendChild(mmlnode[i].cloneNode(true));
   str=mtest.innerHTML;

   }
  if(!understandsempty) {
   str = str.replace(/<\/(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)[^<>]*>/ig,'');
   str = str.replace(/<(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)([^<>]*)>/ig,'<$1$2></$1>');
   str = str.replace(/<(mtd)([^<>]*)>(?=\s*<mtd)/ig,'<$1$2></$1>');
   str = str.replace(/(<\/mtd>)+<\/mtr>/ig,'</mtd></mtr>');
    }
   str = str.replace(/<mspace([^<>]*)width=.([0-9][^"]*)"([^<>]*)/ig,'<mtext $1$3><span style="margin-left:$2"');
   str = str.replace(/<\/mspace>/ig,'&#x200c;</span></mtext>');
//alert(1+str);
   str = str.replace(/<(mfrac|msub|msup|mtable|msqrt)([^<>\/]*)>/ig,'<zrow$1><$1$2>');
   str = str.replace(/<\/(mfrac|msub|msup|mtable|msqrt)>/ig,'</$1></zrow$1>');
   str = str.replace(/<(mfenced)([^<>\/]*)>/ig,'<$1$2><mrow>');
   str = str.replace(/<\/(mfenced)>/ig,'</mrow></$1>');
   str = str.replace(/(<[^<>]*)mathcolor="/ig,'$1style="color:');
  var thisnode;
  if(mathhasinnerhtml) {
   mmlnode[i].innerHTML=str;
   thisnode= mmlnode[i];
   } else {
//alert(2+str);
     mtest.innerHTML=str;
//alert(3+mtest.innerHTML);
     thisnode=mtest.childNodes[0];
   if(mmlnode[i].parentNode!=null){
     mmlnode[i].parentNode.replaceChild(mtest.childNodes[0], mmlnode[i]);
    }
  }
  }
   var mma = thisnode.getElementsByTagName("mmultiscripts");
 var mm = [];
  for( var i = 0; i < mma.length; i++ ) {
    mm[mm.length] = mma[i];
  }

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
     if (cnode[i4].nodeName.toLowerCase()=="mprescripts") {
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
alert("end" + document.getElementsByTagName("body")[0].innerHTML);
}




if ( navigator.userAgent.match(/WebKit|Presto/)) {
  window.addEventListener("load", webkitmathml, false);
   }

