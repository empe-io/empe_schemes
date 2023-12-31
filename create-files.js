const fs = require('fs');
const path = require('path');

const baseFolder = '.'; // Zmieniona nazwa zmiennej

fs.readdir(baseFolder, (err, folders) => {
  if (err) {
    console.error(err);
    return;
  }

  folders.forEach(folder => {
    if (folder === 'copy') {
      return;
    }
    const folderPath = path.join(baseFolder, folder); // Użyj poprawionej nazwy zmiennej
    fs.stat(folderPath, (err, stats) => {
      if (stats.isDirectory()) {
        const jsonFilePath = path.join(folderPath, `${folder}.json`);
        const jsonLdFilePath = path.join(folderPath, `${folder}_ld.json`);
        fs.writeFile(jsonFilePath, JSON.stringify({}), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Plik JSON utworzony w: ${jsonFilePath}`);
          }
        });
        fs.writeFile(jsonLdFilePath, JSON.stringify({}), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Plik Ld JSON utworzony w: ${jsonLdFilePath}`);
          }
        });
      }
    });
  });
});
