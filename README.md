# KNX-ETS-Utils

### Installation
``` shell
npm install knx-ets-utils
```

### Usage

``` js
import {knxDatapointTypeMapper, parseETSGroupAddressCSVExport} from 'knx-ets-utils';
```

### Current Utils 
- **knxDatapointTypeMapper:** Mapping the CSV datapoint type (e.g. DPST-1-1, DPST-19-1) to the datapoint type (DPT1.001, DPT19.001)
  ``` js
  const datapoint = knxDatapointTypeMapper('DPST-1-1');
  console.log(datapoint); // DPT1.001
  ```
- **parseETSGroupAddressCSVExport:** Convert the ETS KNX group address CSV export to json.
  ``` js
  const csv = '"Main","Middle","Sub","Address","Central","Unfiltered","Description","DatapointType","Security"; , ,"Wohnzimmer direkt","1/0/2","","","","DPST-1-1","Auto"';
  const groupAddresses = parseETSGroupAddressCSVExport(csv, ['livingRoom', 'kitchen']);
  console.log(groupAddresses); 
  /**  
  [
   {room: 'Wohnzimmer',address: '1/0/1', datapointType: 'DPT1.001' },
    ...
  ]
  **/
  ```
