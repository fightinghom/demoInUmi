// import { mapEvent } from '@/constants/webGis';
import { mapEventEnum } from '@/constants/webGis';
import { PageContainer } from '@ant-design/pro-components';
import ol, { Map, View } from 'ol';
import { defaults } from 'ol/control/defaults';
import { easeIn } from 'ol/easing';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'antd';
import { Coordinate } from 'ol/coordinate';

const WebGisPage: React.FC = () => {
  const mapContainer = useRef(null);

  const [olMap, setOlMap] = useState<ol.Map | null>(null);
  const [olView, setOlView] = useState<ol.View | null>(null);

  const olMapRef = useRef<ol.Map | null>();
  olMapRef.current = olMap;
  const olViewRef = useRef<ol.View | null>();
  olViewRef.current = olView;

  const center = [104.030023, 30.554142];

  const setCenter = (coordinate?: Coordinate) => {
    // const size = olMapRef.current?.getSize() || [0, 0];
    olViewRef.current?.animate({
      center: coordinate,
      duration: 600,
      easing(arg0) {
        return easeIn(arg0);
      },
    });
    // olViewRef.current?.centerOn(coordinate || center, size, [size[0] / 2, size[1] / 2]);
  };

  const initMap = () => {
    const layer = new TileLayer({
      source: new XYZ({
        url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      }),
    });

    const view = new View({
      center: fromLonLat(center),
      zoom: 15,
      minZoom: 0,
      maxZoom: 18,
      constrainResolution: true,
    });

    const map = new Map({
      layers: [layer],
      view: view,
      target: mapContainer.current || '',
      controls: defaults({
        zoom: false,
        rotate: false,
      }),
    });

    // 单点移动到指定位置
    map.on(mapEventEnum.singleclick, (e: ol.MapBrowserEvent<any>) => {
      console.log('ol.MapBrowserEvent<any> ---', e);
      setCenter(e.coordinate);
    });

    setOlMap(map);
    setOlView(view);
  };

  useEffect(() => {
    if (!olMap) {
      initMap();
    }
  });

  return (
    <PageContainer className="h-full">
      <div className="w-full h-full flex flex-col">
        <div>
          <Button onClick={() => setCenter()}>回到初始点</Button>
        </div>
        {/* <div ref={mapZoomControl} className="inline-flex font-bold p-2 bg-black bg-opacity-20">
          <div className="cursor-pointer">放大</div>
          <div className="cursor-pointer ml-2">缩小</div>
        </div> */}
        <div className="flex-1 mt-2">
          <div className="h-full" ref={mapContainer}></div>
        </div>
      </div>
    </PageContainer>
  );
};

export default WebGisPage;
