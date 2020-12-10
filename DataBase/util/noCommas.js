/**
 * @param {String} input
 * @param {String} output
 */
String.prototype.noCommas = function() {
  return this.split(",").join("");
}

module.exports.noCommas = String.prototype.noCommas;
