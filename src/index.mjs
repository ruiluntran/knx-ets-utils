import {parse} from 'papaparse';
import {findBestMatch} from 'string-similarity';

function knxDatapointTypeMapper(dataPoint) {
  const partial = dataPoint.split('-');

  if (partial.length === 2) {
    partial[2] = 1;
  }

  return 'DPT' + partial[1] + '.' + ('000' + partial[2]).substr(-3);
}

function parseETSGroupAddressCSVExport(csv, rooms) {

  if (!Array.isArray(rooms)) {
    throw Error('An array is expected for rooms. E.g. ["livingRoom"]');
  }

  try {
    const parsedData = parse(csv, {
      header: true,
      encoding: 'utf8'
    }).data;

    return parsedData
      .filter(item => item.DatapointType !== '')
      .filter(item => typeof item.DatapointType !== 'undefined')
      .map(item => {
        const _item = item;

        let room;
        if (_item.Sub) {
          const bestMatch = findBestMatch(_item.Sub, rooms);
          room = bestMatch.bestMatch.rating > 0.2 ? rooms[bestMatch.bestMatchIndex] : null;
        }

        return {
          room: room ? room : 'unknown',
          address: _item.Address,
          datapointType: knxDatapointTypeMapper.knxDatapointTypeMapper(_item.DatapointType)
        }
      })
  } catch (e) {
    throw Error(e);
  }


}

export {
  knxDatapointTypeMapper,
  parseETSGroupAddressCSVExport
}
