var fs = require('fs');
var _ = require('underscore');
module.exports = function(app){
  return{
    selectWord : function(){
      var selectedWord  = fs.readFileSync('config/words.json');
      selectedWord =  (!selectedWord)? null : _.sample(JSON.parse(selectedWord).words,1);
      return selectedWord;
    }
  }
}
