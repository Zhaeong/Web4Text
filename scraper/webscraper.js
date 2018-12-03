const http = require('http');
const https = require('https');
module.exports = {
	getDDGPage : (scrapeTerm, callback) =>
	{
		http.get('http://api.duckduckgo.com/?q=' 
				+ scrapeTerm 
				+ '&format=json&pretty=1', 
				(resp) => 
				{
	  				let data = '';

					// A chunk of data has been recieved.
					resp.on('data', (chunk) => 
					{
						data += chunk;
					});

					// The whole response has been received. Print out the result.
					resp.on('end', () => 
					{
	    				var jsonResult = JSON.parse(data);

					    //The null, 2 makes it print to console in pretty way
					    var jsonString = JSON.stringify(jsonResult, null, 2); 
					    callback(jsonString);

					});

				}).on("error", (err) => 
				{
	  				console.log("Error: " + err.message);
				});
	}
	,
	getWikiPage : (scrapeTerm, callback) =>
	{

		https.get('https://en.wikipedia.org/w/api.php?'
				+ 'format=json' 
				+ '&action=query'
				+ '&prop=extracts'
				+ '&exintro'
				+ '&explaintext'
				+ '&redirects=1'
				+ '&titles=' + scrapeTerm, 
				(resp) => 
				{
	  				let data = '';

					// A chunk of data has been recieved.
					resp.on('data', (chunk) => 
					{
						data += chunk;
					});

					// The whole response has been received. Print out the result.
					resp.on('end', () => 
					{
						var exportString = "Error";

	    				var jsonResult = JSON.parse(data);

	    				exportString = JSON.stringify(jsonResult, null, 2); 

	    				if('query' in jsonResult)
	    				{
	    					if('pages' in jsonResult['query'])
	    					{
	    						var jsonText = jsonResult['query']['pages'];

	    						//The null, 2 makes it print to console in pretty way
	    						exportString = JSON.stringify(jsonText, null, 2); 

	    						for(var key in jsonResult['query']['pages'])
	    						{
	    							if(key == "-1")
	    							{
	    								exportString = "Page not Found"
	    							}
	    							else
	    							{
	    								exportString = jsonResult['query']['pages'][key]["extract"];
	    							}
	    						}
	    					}
						}
						
					    //strip tags
						exportString = exportString.replace(/<(?:.|\n)*?>/gm, '');
					    callback(exportString);

					});

				}).on("error", (err) => 
				{
	  				console.log("Error: " + err.message);
				});
	}

};