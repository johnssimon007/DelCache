var argv = require('minimist')(process.argv.slice(2));
var exec = require('child_process').exec;
const readline = require("readline");
const fs = require('fs')

if (process.argv.slice(2).length == 0 || argv.h) {
  console.log("enter a flag , \r\n -t specifies a target \r\n -f specifies file consisting of targets \r\n -o specifies the file to write to")
  process.exit()
}
let options = argv.o
argv.o ? options : options = null
if (argv.t) checkCache(argv.t)
else if (argv.f) {
  const read = readline.createInterface({
    input: fs.createReadStream(argv.f),
    output: process.stdout,
    terminal: false
  });
  read.on('line', (line) => {
    return checkCache(line, options)
  }).on('error', function(e) {
    console.error(e)
  });
}

function checkCache(target, options) {
  exec(`curl -s -L -D- --max-redirs 1 --max-time 9 ${target} -o /dev/null`, (error, stdout, stderr) => {
    if (stdout) {

      let match = (/(?:via:.*varnish|x-cache-hits)/i).test(stdout)
      if (match) return invalidate_cache(options)
      else console.log("\x1b[36m%s\x1b[0m",`${target} is  not vulnerable`)
    }
    if (stderr) console.log(stderr)
    if (error) console.log(error)

  })

  //testing for unauthenticated cache purging
  function invalidate_cache(options) {
    exec(`curl -s -L --max-time 9 --max-redirs 1 -X PURGE  ${target}`, (error, stdout, stderr) => {

      if ((/(?:status.*ok)/i).test(stdout)){
         console.log("\x1b[36m%s\x1b[0m", `${target} is  probably vulnerable`)
         if (stdout && options) {
           fs.writeFile(options, `${target}`, function(err, data) {
             if (err) {
               return console.log(err);
             }
           });
         }
      }
      else console.log("\x1b[36m%s\x1b[0m", `${target} is  not vulnerable`)

      if (stderr) console.log(stderr)

    })
  }
}
