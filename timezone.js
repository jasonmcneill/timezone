var getTimeZone = function() {
  var zones = [
    {
      name: "America/New_York",
      std: -5,
      dst: -4,
      abbr: "ET",
      stdAbbr: "EST",
      dstAbbr: "EDT"
    },
    {
      name: "America/Chicago",
      std: -6,
      dst: -5,
      abbr: "CT",
      stdAbbr: "CST",
      dstAbbr: "CDT"
    },		{
      name: "America/Denver",
      std: -7,
      dst: -6,
      abbr: "MT",
      stdAbbr: "MST",
      dstAbbr: "MDT"
    },
    {
      name: "America/Phoenix",
      std: -7,
      dst: -7,
      abbr: "MT",
      stdAbbr: "MST",
      dstAbbr: "MST"
    },
    {
      name: "America/Los_Angeles",
      std: -8,
      dst: -7,
      abbr: "PT",
      stdAbbr: "PST",
      dstAbbr: "PDT"
    },
    {
      name: "America/Anchorage",
      std: -9,
      dst: -8,
      abbr: "AT",
      stdAbbr: "AST",
      dstAbbr: "ADT"
    },
    {
      name: "America/Adak",
      std: -10,
      dst: -9,
      abbr: "HT",
      stdAbbr: "HST",
      dstAbbr: "HDT"
    },
    {
      name: "Pacific/Honolulu",
      std: -10,
      dst: -10,
      abbr: "HT",
      stdAbbr: "HST",
      dstAbbr: "HST"
    }
  ];

  var timeZone = "";
  var zonesLen = zones.length;
  var getTimezoneByInternationalizationAPI = function() {
    try {
      zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch(e) {
      throw new Error("No Internationalization API object detected");
    }
    zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    zoneObj = "";
    for(var i=0; i<zonesLen; i++) {
      if(zoneName === zones[i].name) {
        zoneObj = zones[i];
        break;
      }
    }
    return zoneObj;
  };
  var getTimezoneByOffset = function() {
    var d = new Date();
    var timeZoneOffsetMinutes = d.getTimezoneOffset();
    var timeZoneOffset = Math.abs(timeZoneOffsetMinutes / 60) * -1;
    var zoneObj = "";
    for(var i=0; i<zonesLen; i++) {
      if(timeZoneOffset === zones[i].std) {
        zoneObj = zones[i];
        break;
      }
    }
    return zoneObj;
  }
  try {
    timeZone = getTimezoneByInternationalizationAPI();
  } catch(e) {
    console.log(e);
  }
  if(typeof timeZone !== "object") {
    timeZone = getTimezoneByOffset();
  }
  return timeZone;

};
