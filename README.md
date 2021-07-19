# DelCache

DelCache is a tool written in Node.js which helps to identify
Web applications using Varnish caching reverse proxy which are vulnerable to
Unauthenticated cache purge requests.

#setup

```
 npm install
```
#usage

```
node index.js -h //list available commands

test a single target
node index.js -t target.com

test a list of domains

node index.js -f domain_list.txt

save output to a directory

node index.js -f domain_list.txt -o output.txt

```
