const Parser = require('ts-simple-ast').default;
const editJsonFile = require('edit-json-file');

const { Directory } = require('ts-simple-ast');

const astFiles = async (path, textReplace, textInsert) => {
  const tsParser = new Parser();
  tsParser.addExistingSourceFile(path);
  const file = tsParser.getSourceFile(path);
  const regex = new RegExp(textReplace, 'g');
  const newText = file.getText().replace(regex, `${textInsert}`);
  file.removeText(file.getPos(), file.getEnd());
  file.insertText(0, newText);
  file.saveSync();
};

const replaceText = (path, textInsert) => {
  try {
    const tsParser = new Parser();
    tsParser.addExistingSourceFileIfExists(path);
    const file = tsParser.getSourceFile(path);
    const textFromTheFile = file.getText();
    let newText = textFromTheFile.replace(textFromTheFile, `${textInsert}`);
    file.removeText(file.getPos(), file.getEnd());
    file.insertText(0, newText);
    file.saveSync();
  } catch (error) {
    console.log('error: ', error);
  }
};

const moveFiles = async (path, destintionPath) => {
  try {
    const directory = new Directory();
    await directory.copyImmediately(path);
    await directory.moveImmediately(destintionPath);
    await directory.saveSync();
  } catch (error) {
    console.log('error: ', error);
  }
};

const editJSONFile = (filePath, property, newValue) => {
  try {
    let file = editJsonFile(filePath);
    file.set(property, newValue);
    file.save();
  } catch (error) {
    console.log('error: ', error);
  }
};

exports.astFunctions = {
  astFiles,
  replaceText,
  moveFiles,
  editJSONFile
};
