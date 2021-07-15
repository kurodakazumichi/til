# useBattery

バッテリーの状態を追跡するReactセンサーフック。

> 注意：現在のBatteryManager APIの状態は廃止されています。
> 一部のブラウザではまだ動作するかもしれませんが、いつでも削除される可能性があるため、その使用はお勧めできません。



`navigator.getBattery API`を使って、PCのバッテリー状態を取得し表示するコンポーネント。ChromeではこのAPIはサポートされていたが、イベントの登録はうまくいかなかった。



## Source

### useBattery.ts

```ts
import { useEffect, useState } from "react";
import { isNavigator, off, on } from "../../../../misc/util";
import isDeepEqual from "../../../../misc/isDeepEqual";

/**
 * Battery APIから取得できるバッテリーの状態
 */
export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

/**
 * navigator.getBattery().then((BatteryManager) => {});
 * Promiseの引数に渡されるオブジェクトのインターフェース
 */
interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange:() => void;
  onlevelchange:() => void;
}

/**
 * navigator.getBatteryは非推奨で実装が削除されている可能性がある
 */
interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

/**
 * useBatteryの状態
 */
type UseBatteryState = 
  | { isSupported: false }
  | { isSupported: true; fetched: false }
  | ( BatteryState & { isSupported: true; fetched: true });

// navigatorを取得
const nav: NavigatorWithPossibleBattery | undefined = isNavigator? navigator : undefined;

// BatteryAPIがサポートされているかどうかのフラグ
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function';

/**
 * mock
 */
function useBatteryMock(): UseBatteryState {
  return { isSupported:false }
}

/**
 * バッテリーのstateを返す。
 * マウント時にBattery APIからバッテリーの情報を取得し、コールバックを設定。
 * アンマウント時にBattery APIに設定したイベントを削除。
 * 
 */
function useBattery(): UseBatteryState 
{
  const [state, setState] = useState<UseBatteryState>({isSupported:true, fetched:false});

  useEffect(() => {
    
    let isMounted = true;
    let battery: BatteryManager | null = null;

    // バッテリーの変更を検知し、状態を更新する
    const handleChange = () => 
    {
      if (!isMounted || !battery) {
        return;
      }
      
      const newState:UseBatteryState = {
        isSupported    : true,
        fetched        : true,
        level          : battery.level,
        charging       : battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime   : battery.chargingTime
      }

      !isDeepEqual(state, newState) && setState(newState);
    }

    // Battery APIの初期化
    nav!.getBattery!().then((bat:BatteryManager) => {
      if (!isMounted) {
        return;
      }

      battery = bat;

      on(battery, 'chargingchange', handleChange);
      on(battery, 'chargingtimechange', handleChange);
      on(battery, 'dischargingtimechange', handleChange);
      on(battery, 'levelchange', handleChange);
      handleChange();
    });

    // on unmount
    return () => {
      isMounted = false;
      if (battery) {
        off(battery, 'chargingchange', handleChange);
        off(battery, 'chargingtimechange', handleChange);
        off(battery, 'dischargingtimechange', handleChange);
        off(battery, 'levelchange', handleChange);        
      }
    }

  }, []);

  return state;
}

export default isBatteryApiSupported? useBattery : useBatteryMock;
```



### component.tsx

```tsx
import useBattery from './useBattery';

export default function Battery() {

  // バッテリーの状態を取得
  const batteryState = useBattery();

  // バッテリーAPIがサポートされていない
  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>:<span>not supported</span>
      </div>
    )
  }

  // バッテリー情報を取得中
  if(!batteryState.fetched) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>supported</span><br />
        <strong>Battery state</strong>: <span>fetching</span>
      </div>
    )
  }

  // バッテリー情報を表示
  return (
    <div>
      <strong>Battery sensor</strong> <span>supported</span><br />
      <strong>Battery state</strong>  <span>fetched</span><br />
      <strong>Charge level</strong> <span>{ (batteryState.level * 100).toFixed(0) }%</span>
      <strong>Charging</strong>  <span>{ batteryState.charging? 'yes':'no'}</span><br />
      <strong>Charging time</strong>
      <span>{ batteryState.chargingTime? batteryState.chargingTime : 'finished' }</span><br />
      <strong>Discharging time</strong> <span>{ batteryState.dischargingTime }</span>
    </div>
  );
}
```

