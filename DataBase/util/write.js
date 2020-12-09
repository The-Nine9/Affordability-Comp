const fs = require("fs");
const stream = require("stream");


// https://nodejs.org/api/stream.html#stream_event_drain
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeAnyTimes(writer, header, generator, times, encoding, callback) {
  writer.write(header, encoding);
  let i = times;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let datum = generator();
      if (i === 0) {
        writer.write(datum, encoding, callback);
      } else {
        ok = writer.write(datum, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

// function writeStrings(writer, data, encoding='utf8', callback) {
//   let i = data.length;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       let datum = data[i-1];
//       i--;
//       if (i === 0) {
//         writer.write(datum, encoding, callback);
//       } else {
//         ok = writer.write(datum, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//   }
// }

function writeStrings(writer, data, encoding='utf8', callback) {
  let i;
  write();
  function write() {
    let ok = true;
    for (i = 0; i < data.length && ok; i++) {
      let datum = data[i];
      if (i === data.length - 1) {
        writer.write(datum, encoding, callback);
      } else {
        ok = writer.write(datum, encoding);
      }
    }
    if (/*!ok*/i < data.length) {
      writer.once('drain', write);
    }
  }
}


function test() {
  var s = fs.createWriteStream("test.csv");
  writeStrings(s, ['world', 'hello '], 'utf8', () => {console.log("completed")});
}

// test();

module.exports.writeAnyTimes = writeAnyTimes;
module.exports.writeStrings = writeStrings;