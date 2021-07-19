# DelCache

DelCache is a tool written in Node.js which helps to identify
Web applications using Varnish caching reverse proxy and are vulnerable to
Unauthenticated cache purge requests.

#setup

```
 npm install
```
#usage


1.list all available commands
```
node index.js -h
```

2.test a single target
```
node index.js -t target.com
```

3.test a list of domains
```
node index.js -f list-of-url.txt
```
4.save output to a directory

```
node index.js -f list-of-urls.txt -o output.txt

```
References:

https://hackerone.com/reports/154278
