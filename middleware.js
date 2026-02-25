module.exports = (req, res, next) => {
  // Handle getLogHeaders with filtering
  if (req.path.startsWith('/api/getLogHeaders/')) {
    const db = require('./db.json');
    const pathParts = req.path.split('/');
    const well = pathParts[3];
    const wellbore = pathParts[4];
    
    console.log(`🔍 API Call: getLogHeaders for ${well}/${wellbore}`);
    
    const filteredHeaders = db.logHeaders.filter(header => 
      header['@uidWell'] === well && header['@uidWellbore'] === wellbore
    );
    
    console.log(`📊 Found ${filteredHeaders.length} headers for ${well}/${wellbore}`);
    res.json(filteredHeaders);
    return;
  }
  
  // Handle logData with mock data
  if (req.path.startsWith('/logData')) {
    console.log(`🔍 API Call: logData with query:`, req.query);
    
    const { uidWell, uidWellbore, uid, startIndex, endIndex } = req.query;
    const mockLogData = {
      uidWell,
      uidWellbore,
      uid,
      startIndex: {
        '@uom': 'm',
        '#text': startIndex || '0'
      },
      endIndex: {
        '@uom': 'm', 
        '#text': endIndex || '1000'
      },
      mnemonicList: 'GR,RT,NPHI,RHOB,PEF',
      unitList: 'API,ohm.m,v/v,gAPI,PE',
      data: [
        '50,10,0.2,2.5,1.5',
        '55,12,0.22,2.6,1.6',
        '60,15,0.25,2.7,1.7',
        '58,14,0.23,2.65,1.65',
        '62,16,0.26,2.8,1.8'
      ]
    };
    
    res.json([mockLogData]);
    return;
  }
  
  // Continue to next middleware for other routes
  next();
};
