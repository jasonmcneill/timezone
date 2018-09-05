Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

var getTimeZone = function() {
  var zones = [
    {
      name: "America/New_York",
      std: -5,
      dst: -4,
      abbr: "ET",
      stdAbbr: "EST",
      dstAbbr: "EDT",
      isDST: false
    },
    {
      name: "America/Chicago",
      std: -6,
      dst: -5,
      abbr: "CT",
      stdAbbr: "CST",
      dstAbbr: "CDT",
      isDST: false
    },
    {
      name: "America/Denver",
      std: -7,
      dst: -6,
      abbr: "MT",
      stdAbbr: "MST",
      dstAbbr: "MDT",
      isDST: false
    },
    {
      name: "America/Phoenix",
      std: -7,
      dst: -7,
      abbr: "MT",
      stdAbbr: "MST",
      dstAbbr: "MST",
      isDST: false
    },
    {
      name: "America/Los_Angeles",
      std: -8,
      dst: -7,
      abbr: "PT",
      stdAbbr: "PST",
      dstAbbr: "PDT",
      isDST: false
    },
    {
      name: "America/Anchorage",
      std: -9,
      dst: -8,
      abbr: "AT",
      stdAbbr: "AST",
      dstAbbr: "ADT",
      isDST: false
    },
    {
      name: "America/Adak",
      std: -10,
      dst: -9,
      abbr: "HT",
      stdAbbr: "HST",
      dstAbbr: "HDT",
      isDST: false
    },
    {
      name: "Pacific/Honolulu",
      std: -10,
      dst: -10,
      abbr: "HT",
      stdAbbr: "HST",
      dstAbbr: "HST",
      isDST: false
    }
  ];

  var timeZone = "";
  var zonesLen = zones.length;

  var getTimezoneByInternationalizationAPI = function() {
    var d = new Date();
    var i = 0;
    var isDstInEffect = false;
    try {
      zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch(e) {
      throw new Error("No Internationalization API object detected");
    }
    zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    zoneObj = "";
    if(d.isDstObserved) isDstInEffect = true;
    for(i=0; i<zonesLen; i++) {
      if(zoneName === zones[i].name) {
        zoneObj = zones[i];
        break;
      }
    }
    if(isDstInEffect) zoneObj.isDST = true;
    return zoneObj;
  };

  var getTimezoneByOffset = function() {
    var d = new Date();
    var i = 0;
    var isDstInEffect = false;
    var timeZoneOffsetMinutes = d.getTimezoneOffset();
    var timeZoneOffset = Math.abs(timeZoneOffsetMinutes / 60) * -1;
    var zoneObj = "";
    var gmtOffset = 0;
    if(d.isDstObserved) isDstInEffect = true;
    for(i=0; i<zonesLen; i++) {
      gmtOffset = zones[i].std;
      if(isDstInEffect) gmtOffset = zones[i].dst;
      if(timeZoneOffset === gmtOffset) {
        zoneObj = zones[i];
        break;
      }					
    }
    if(isDstInEffect) zoneObj.isDST = true;
    return zoneObj;
  }

  // Modern browsers use Internationalization API; older browsers use timezone offset.
  try {
    timeZone = getTimezoneByInternationalizationAPI();
  } catch(e) {
    console.log(e);
  }
  if(typeof timeZone !== "object") {
    timeZone = getTimezoneByOffset();
  }

  // Return the timezone object
  return timeZone;

};
