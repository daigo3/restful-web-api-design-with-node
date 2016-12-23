const fs = require('fs');
const path = require('path');

function readJsonFile() {
  const file = path.join(__dirname, '/../data/contacts.json');
  return fs.readFileSync(file);
}

exports.list = function() {
  return JSON.parse(readJsonFile());
};

exports.query = function(number) {
  const { result } = this.list();

  return result.filter((contact) => {
    return contact.primarycontactnumber === number;
  });
};

exports.queryByArg = function(arg, value) {
  const { result } = this.list();

  return result.filter((contact) => {
    console.log(arg, contact.hasOwnProperty(arg));
    return contact.hasOwnProperty(arg) && contact[arg] === value;
  });
};

exports.listGroups = function() {
  const { result } = this.list();
  let ret = [];

  for(let i = 0; i < result.length; i++) {
    const { groups } = result[i];
    for(let j = 0; j < groups.length; j++) {
      if(ret.indexOf(groups[j]) == -1) {
        ret.push(groups[j]);
      }
    }
  }

  return ret;
};

exports.getMembers = function(groupName) {
  const { result } = this.list();

  return result.filter((contact) => {
    const { groups } = contact;
    if(groups.indexOf(groupName) > -1) {
      return contact;
    }
  });
};
