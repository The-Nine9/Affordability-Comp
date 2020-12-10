const fs = require("fs");
const stream = require("stream");

// https://nodejs.org/api/stream.html#stream_event_drain
// Be attentive to back-pressure.
function writeAnyTimes(
  writer, // create a stream using fs.createWriteStream()
  header, // string, the header of the csv
  generator, // body of document, function, on each call generator returns a comma-delimited, newline-terminated
  times, // number, entries in the csv
  encoding, // just make this string 'utf8'
  callback, // i only use this callback to console log that it's done
  tail=null, // string, end of document
  ) {
  writer.write(header, encoding);
  let i = times;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let datum = generator(i, times);
      if (i === 0) {
        if (!tail) {
          writer.write(datum, encoding, callback);
        } else {
          writer.write(datum, encoding);
          writer.write(tail, encoding, callback);
        }
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