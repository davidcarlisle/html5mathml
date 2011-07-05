// iemathml.js
// d.p.carlisle@gmail.com
// may be used under MIT license
// http://www.opensource.org/licenses/mit-license.php


function getmathnode() {
    var mmlnodea = document.getElementsByTagName("math");
    var mmlnode = [];
    for( var i = 0; i < mmlnodea.length; i++ ) {
	mmlnode[mmlnode.length] = mmlnodea[i];
    }
    return mmlnode;
}

function fixempties (str) {
    str = str.replace(/<\/(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)[^<>]*>/ig,'');
    str = str.replace(/<(none|mprescripts|mglyph|mspace|msline|maligngroup|malignmark)([^<>]*)>/ig,'<$1$2></$1>');
    str = str.replace(/<(mtd)([^<>]*)>(?=\s*<mtd)/ig,'<$1$2></$1>');
    str = str.replace(/(<\/mtd>)+<\/mtr>/ig,'</mtd></mtr>');
    return str;
}

function domath() {
    var mmlnode = getmathnode();
    for (var i=0; i<mmlnode.length; i++) {
	var parent = mmlnode[i].parentNode;
	if(parent!=null){
	    var str=parent.innerHTML;
	    str = str.replace(/xmlns=.http:\/\/www.w3.org\/1998\/Math\/MathML./ig,'');
	    str = str.replace(/<\?XML:NAMESPACE[^<>]*>/ig,'');
	    str = fixempties(str);
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
    var mmlnode = getmathnode();
    for (var i=0; i<mmlnode.length; i++) {	
	mmlnode[i].parentNode.replaceChild(convertie(mmlnode[i]),mmlnode[i]);
    }
}






function webkitmathml() {

 var mtest = document.createElement("span");
 mtest.innerHTML="<math><mspace width='2px'/><mspace/></math>";

document.getElementsByTagName("body")[0].appendChild(mtest);

  var mmlnode = getmathnode();

var understandsempty = (mtest.childNodes[0].childNodes.length == 2);
var mathhasinnerhtml = (mtest.childNodes[0].innerHTML != null);
var mathmlrendered =  (mmlnode[mmlnode.length - 1].clientWidth > 0);

if (!mathmlrendered) {
  var head = document.getElementsByTagName("head")[0];
  head.innerHTML = head.innerHTML + "<link rel=\"stylesheet\" href=\"webkitmathml.css\" type=\"text/css\">";
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
      str = fixempties(str);
    }
   str = str.replace(/<mspace([^<>]*)width=.([0-9][^"]*)"([^<>]*)/ig,'<mtext $1$3><span style="margin-left:$2"');
   str = str.replace(/<\/mspace>/ig,'&#x200c;</span></mtext>');
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
     mtest.innerHTML=str;
     thisnode=mtest.childNodes[0];
     mmlnode[i].parentNode.replaceChild(mtest.childNodes[0], mmlnode[i]);
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
}




function domathff() {
  var mmlnode = getmathnode();
  for (var i=0; i<mmlnode.length; i++) {
   var str=mmlnode[i].innerHTML;

   str = fixempties(str);
//   str = str.replace(/<(mtr)([^<>]*)>/ig,'</mtr><$1$2>');
//   str = str.replace(/(<mtable[*<>]*>)\s*<\/mtr>/ig,'$1');
//   str = str.replace(/<\/mtr>(\s*<\/mt[dr]>)+<(\/mtable|mtr)>/ig,'</mtr><$2>');

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


if (navigator.userAgent.match(/MSIE [6-9]/)) {
    document.write("<object id=\"mmlFactory\" classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object><?import namespace=\"m\" implementation=\"#mmlFactory\"?>");
    window.attachEvent("onload", domath);
} else if (navigator.userAgent.match(/MSIE 1[0-9]/)) {
    window.attachEvent("onload", domath10);
} else if ( navigator.userAgent.match(/WebKit|Presto/)) {
  window.addEventListener("load", webkitmathml, false);
} else if ( navigator.userAgent.match(/Gecko/) && (! navigator.userAgent.match(/Firefox [4-9]/))) {
  window.addEventListener('load', domathff, false);
}


