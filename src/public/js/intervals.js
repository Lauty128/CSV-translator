export function parseIntervalData(e){let t="";e.numbers.forEach(e=>t+=` ${e} -`);let n=document.createElement("div"),a=document.createElement("div"),d=document.createElement("h4"),l=document.createElement("span"),p=document.createElement("div"),i=document.createElement("span"),s=document.createElement("span"),r=document.createElement("span"),m=document.createElement("span"),o=document.createElement("span");return n.classList.add("IntervalData"),d.textContent="Los datos utilizados son:",l.textContent=t.slice(0,-1),i.textContent=`Minimo = ${e.min}`,s.textContent=`Maximo = ${e.max}`,r.textContent=`Rango = ${e.range}`,m.textContent=`Amplitud = ${e.amplitude}`,o.textContent=`Cantidad de clases = ${e.number_of_classes}`,a.appendChild(d),a.appendChild(l),p.appendChild(i),p.appendChild(s),n.appendChild(a),n.appendChild(p),n.appendChild(r),n.appendChild(m),n.appendChild(o),n}