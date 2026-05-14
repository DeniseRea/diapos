const fs = require('fs');
const filePath = 'C:/Users/mesia/Desktop/Universidad/Calidad/1P/Proyecto/presentacion-defensa-devsecops/src/main.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const slideComponents = [
  ['cover', 'CoverSlide'],
  ['intro', 'IntroSlide'],
  ['architecture', 'ArchitectureSlide'],
  ['logic', 'LogicSlide'],
  ['ci-security', 'CISecuritySlide'],
  ['incident', 'IncidentSlide'],
  ['cd', 'CDSlide'],
  ['dashboard', 'DashboardSlide'],
  ['cu01', 'CU01Slide'],
  ['cu02', 'CU02Slide'],
  ['cu03', 'CU03Slide'],
  ['cu04', 'CU04Slide'],
  ['cu05', 'CU05Slide'],
  ['ia', 'IASlide'],
  ['defense', 'DefenseSlide']
];

slideComponents.forEach(([id, component]) => {
  const regex = new RegExp('id: "' + id + '"[\\s\\S]*?render: \\(props\\) => < \\{\\.\\.\\.props\\} />', 'g');
  content = content.replace(regex, (match) => {
    return match.replace('render: (props) => < {...props} />', 'render: (props) => <' + component + ' {...props} />');
  });
});

fs.writeFileSync(filePath, content);
console.log('Fixed broken render tags.');