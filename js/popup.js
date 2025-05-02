addEventListener('load', async () => {
	let [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})

	let message = document.querySelector('#metaTable')

	try {
		const response = await chrome.tabs.sendMessage(activeTab.id, 'getData')
		console.log(response)
	} 
	catch (error) {
		// message.innerText = 'There was an error : \n' + error.message
	}
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	//	document.getElementById("metaTitleID").innerHTML = request.metaTitle;
	//	console.log(metaTitle)
	console.log(request)

	if (request.method == "getMetas") {
		let metaTable = document.getElementById('metaTable')

		for (var i=0; i<request?.metas?.length; i++) {
			metaTable.innerHTML += "<tr><td>"+request.metas[i][0]+"</td><td>"+request.metas[i][1]+"</td><td>"+request.metas[i][2]+"</td><td>"+request.metas[i][3]+"</td><td>"+request.metas[i][4]+"</td></tr>";
		}
	}
	
	if(request.data7) {
		document.getElementById("totalWordCountPrintOut").innerHTML = request.data7
	}
	
	if(request.data8) {
		document.getElementById("WordCountTable").innerHTML = request.data8
	}
	
	if(request.data9) {
		document.getElementById("url").innerHTML = request.data9
	}
})