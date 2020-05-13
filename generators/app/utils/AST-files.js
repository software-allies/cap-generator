const Parser = require('ts-simple-ast').default;

exports.astFiles = async (path, textReplace, textInsert) => {
  const tsParser = new Parser();
  tsParser.addExistingSourceFile(path);
  const file = tsParser.getSourceFile(path);
  const regex = new RegExp(textReplace,"g");
  const newText = file.getText().replace(regex, `${textInsert}`);
  file.removeText(file.getPos(), file.getEnd());
  file.insertText(0, newText);
  file.saveSync();
}
