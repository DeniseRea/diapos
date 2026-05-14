const fs = require('fs');
const filePath = 'C:/Users/mesia/Desktop/Universidad/Calidad/1P/Proyecto/presentacion-defensa-devsecops/src/main.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  ['<div onClick={() => onImageClick("/evidencias/image2.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image2.png"  alt="npm install lodash" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image2.png" alt="npm install lodash" onClick={() => onImageClick("/evidencias/image2.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image3.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image3.png"  alt="Dashboard de monitoreo DevSecOps" /></div>', '<img src="/evidencias/image3.png" alt="Dashboard de monitoreo DevSecOps" onClick={() => onImageClick("/evidencias/image3.png")} style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: "50vh", cursor: "pointer" }} />'],
  ['<div onClick={() => onImageClick("/evidencias/image4.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image4.png"  alt="Diagrama CU-01" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image4.png" alt="Diagrama CU-01" onClick={() => onImageClick("/evidencias/image4.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image5.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image5.png"  alt="Flujo alternativo CU-01" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image5.png" alt="Flujo alternativo CU-01" onClick={() => onImageClick("/evidencias/image5.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image6.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image6.png"  alt="Diagrama CU-02" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image6.png" alt="Diagrama CU-02" onClick={() => onImageClick("/evidencias/image6.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image7.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image7.png"  alt="Diagrama CU-03" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image7.png" alt="Diagrama CU-03" onClick={() => onImageClick("/evidencias/image7.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image8.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image8.png"  alt="Workflow DevSecOps exitoso" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image8.png" alt="Workflow DevSecOps exitoso" onClick={() => onImageClick("/evidencias/image8.png")} />'],
  ['<div onClick={() => onImageClick("/evidencias/image9.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image9.png"  alt="Dashboard DevSecOps evidencia" style={{ width: "100%", display: "block" }} /></div>', '<img src="/evidencias/image9.png" alt="Dashboard DevSecOps evidencia" onClick={() => onImageClick("/evidencias/image9.png")} />']
];

let replaced = 0;
for (const [oldStr, newStr] of replacements) {
  if (content.includes(oldStr)) {
    content = content.replaceAll(oldStr, newStr);
    replaced++;
  } else {
    console.log("Not found:", oldStr);
  }
}

fs.writeFileSync(filePath, content);
console.log('Done replacements! Total:', replaced);