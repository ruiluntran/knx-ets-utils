import {parse} from 'papaparse';
import {findBestMatch} from 'string-similarity';

export function knxDatapointTypeMapper(dataPoint: string): string {
  const partial: Array<string | number> = dataPoint.split('-');

  if (partial.length === 2) {
    partial[2] = 1;
  }

  return 'DPT' + partial[1] + '.' + ('000' + partial[2]).substr(-3);
}

export function parseETSGroupAddressCSVExport(csv: any, rooms: Array<string>): object {

  if (!Array.isArray(rooms)) {
    throw Error('An array is expected for rooms. E.g. ["livingRoom"]');
  }

  try {
    const parsedData = parse(csv, {
      header: true,
      encoding: 'utf8'
    }).data;

    return parsedData
      .filter(item => (item as any).DatapointType !== '')
      .filter(item => typeof (item as any).DatapointType !== 'undefined')
      .map(item => {
        const _item: any = item;

        let room;
        if (_item.Sub) {
          const bestMatch = findBestMatch(_item.Sub, rooms);
          room = bestMatch.bestMatch.rating > 0.2 ? rooms[bestMatch.bestMatchIndex] : null;
        }

        return {
          room: room ? room : 'unknown',
          address: _item.Address,
          datapointType: this.knxDatapointTypeMapper(_item.DatapointType)
        }
      })
  } catch (e) {
    throw Error(e);
  }

}
