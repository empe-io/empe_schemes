const fs = require('fs');
const path = require('path');

const baseFolder = '.'; // Użyj kropki, aby wskazać bieżący katalog

fs.readdir(baseFolder, (err, items) => {
  if (err) {
    console.error(err);
    return;
  }

  items.forEach(item => {
    if (item === 'copy') {
      return;
    }
    const itemPath = path.join(baseFolder, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // Przetwarzanie każdego folderu
      fs.readdir(itemPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        files.forEach(file => {
          if (file.endsWith('.json') && !file.endsWith('_ld.json')) {
            const filePath = path.join(itemPath, file);
            const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            if (jsonContent.$metadata && jsonContent.$metadata.uris) {
              // Zmiana wartości jsonLdContext
              jsonContent.$metadata.uris.jsonLdContext = `https://raw.githubusercontent.com/empe-io/empe_schemes/main/${item}/${item}_ld.json`;

              // Zapisanie zmodyfikowanego pliku
              fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
              console.log(`Zaktualizowano jsonLdContext w ${filePath}`);
            }
          }
        });
      });
    }
  });
});
