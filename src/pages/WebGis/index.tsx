import { PageContainer } from '@ant-design/pro-components';
import ol, { Map, View } from 'ol';
import { defaults } from 'ol/control/defaults';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef, useState } from 'react';

const WebGisPage: React.FC = () => {
  const mapContainer = useRef(null);

  const [olMap, setOlMap] = useState<ol.Map | null>(null);

  const initMap = () => {
    const layer = new TileLayer({
      source: new XYZ({
        url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      }),
    });

    const map = new Map({
      layers: [layer],
      view: new View({
        center: fromLonLat([104.030023, 30.554142]),
        zoom: 15,
        minZoom: 0,
        maxZoom: 18,
        constrainResolution: true,
      }),
      target: mapContainer.current || '',
      controls: defaults({
        zoom: false,
        rotate: false,
      }),
    });

    // const olControl = new Control({
    //   element: mapZoomControl.current || undefined,
    // });

    // map.addControl(olControl);

    setOlMap(map);
  };

  useEffect(() => {
    console.log('mapContainer', mapContainer.current);
    console.log('olMap', olMap);
    if (!olMap) initMap();
  });

  return (
    <PageContainer className="h-full">
      <div className="w-full h-full flex flex-col">
        <div></div>
        {/* <div ref={mapZoomControl} className="inline-flex font-bold p-2 bg-black bg-opacity-20">
          <div className="cursor-pointer">放大</div>
          <div className="cursor-pointer ml-2">缩小</div>
        </div> */}
        <div className="flex-1" ref={mapContainer}></div>
      </div>
    </PageContainer>
  );
};

export default WebGisPage;
