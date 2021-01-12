/* global Module */

/* Magic Mirror
 * Module: MMM-atHome
 *
 * By Stuart McNally
 * MIT Licensed.
 */

Module.register('MMM-atHome',{

	defaults: {
		units: config.units,
		animationSpeed: 1000,
		updateInterval: 1000 * 3600, //update every hour
		refreshInterval: 1000 * 60 * 10, //refresh every minute		
		timeFormat: config.timeFormat,
		lang: config.language,

		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,
    
    email: '',
    atHomeUrl: 'https://services.athomeapp.net/ServiceData/GetUserRoundJson',
    
    gardenName: 'Chargeable garden waste bin',
    foodName: 'Food recycling box',
    paperName: 'Paper and Cardboard wheeled bin',
    plasticsName: 'Plastics and Glass wheeled bin',
    wasteName: 'Waste wheeled bin'
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function() {
		return ["font-awesome.css","MMM-atHome.css"];
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
		this.loaded = false;
    this.todaysDate = moment().format('MM/DD/YYYY');
    this.todaysDay = moment().format('d');
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
		var wrapper = document.createElement("div");

    if (!this.config.email){
			wrapper.innerHTML = "Please ensure that email has been set in the config file";
			wrapper.className = "bright light small";   
			return wrapper;      
    }

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.data) {
			wrapper.innerHTML = "No data";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

    var t = this.data;
 
    var table = document.createElement("table");    
    var header = document.createElement("thead")
    var tableBody = document.createElement("tbody");
    var headerRow = document.createElement("tr");
    var headerCollection = document.createElement("th");
    var dataRow = document.createElement("tr"); 
    var rowCollection = document.createElement("td");
    
		for (var i in t.userrounds) {
      t.userrounds[i].containername = t.userrounds[i].containername.replace(/Chargeable garden waste bin/g, this.config.gardenName);
      t.userrounds[i].containername = t.userrounds[i].containername.replace(/Food recycling box/g, this.config.foodName);
      t.userrounds[i].containername = t.userrounds[i].containername.replace(/Paper and Cardboard wheeled bin/g, this.config.paperName);
      t.userrounds[i].containername = t.userrounds[i].containername.replace(/Plastics and Glass wheeled bin/g, this.config.plasticsName);
      t.userrounds[i].containername = t.userrounds[i].containername.replace(/Waste wheeled bin/g, this.config.wasteName);
        
      var nextCollectionDateString = moment(moment(t.userrounds[i].nextcollectiondates[0].datestring, 'DD MM YYYY HH:mm')).format('MM/DD/YYYY');
      var dayOfWeek = moment(moment(t.userrounds[i].nextcollectiondates[0].datestring, 'DD MM YYYY HH:mm')).format('dddd');
      var interval = moment(nextCollectionDateString).diff(this.todaysDate, 'days');

      if (interval==0){
        headerCollection.innerHTML = "Today's Collection";
        headerCollection.className = "header bright small bold light";
      
        rowCollection.innerHTML += t.userrounds[i].containername + "<br />";
        rowCollection.className = "data bright light small";
      }
      else if (interval<7){
        headerCollection.innerHTML = "Next Collection (" + dayOfWeek + ")";
        headerCollection.className = "header bright small bold light";
        rowCollection.innerHTML += t.userrounds[i].containername + "<br />";
        rowCollection.className = "data bright light small";
      }
		}  
    
    headerRow.appendChild(headerCollection);
    header.appendChild(headerRow);   
    dataRow.appendChild(rowCollection);
    tableBody.appendChild(dataRow);   
		table.appendChild(header);
		table.appendChild(tableBody);

		return table;
	},

 	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				this.updateDom();
			}
			else if (notification === "DATA") {
				this.loaded = true;       
				this.processData(JSON.parse(payload));
				this.updateDom();
        this.todayTrue = false;
    		}
	},

	processData: function(data) {

		if (!data) {
			return;
		}

		this.data = data;
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
    this.todayTrue = false;
	}

});