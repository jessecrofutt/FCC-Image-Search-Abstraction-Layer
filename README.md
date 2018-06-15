# FCC-Image-Search-Abstraction-Layer

https://polar-fjord-image-search.herokuapp.com/


This is a project for FreeCodeCamp. It's purpose is to perform an image search when given a string in the address bar: '/api/image_search/query'. The user can place any desired search terms in the place of 'query', and the program will return a list of ten image results with page-url, image-url, and a description of the image. For example:

http://polar-fjord-image-search.herokuapp.com/api/image_search/dogs

http://polar-fjord-image-search.herokuapp.com/api/image_search/logs

Search terms can be followed by '?offset=' and a number to view additional search results. Higher numbers produce additional pages of less popular results.

http://polar-fjord-image-search.herokuapp.com/api/image_search/frogs?offset=2

A list of recent searches can be viewed by placing '/api/history' into address bar.

http://polar-fjord-image-search.herokuapp.com/api/history
