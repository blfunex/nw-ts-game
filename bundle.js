var a,r;globalThis.process,a="undefined"!=typeof Float32Array?Float32Array:Array,Math.hypot||(Math.hypot=function(){for(var a=0,r=arguments.length;r--;)a+=arguments[r]*arguments[r];return Math.sqrt(a)}),r=new a(2),a!=Float32Array&&(r[0]=0,r[1]=0);const t=document.querySelector("canvas"),n=t.getContext("2d");n.fillStyle="magenta",n.fillRect(0,0,t.width,t.height);