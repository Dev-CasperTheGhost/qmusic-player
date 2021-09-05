import * as React from "react";
import { getLocalVolume, setLocalVolume } from "lib/volume";
import { Channel } from "types/Channel";
import styles from "./volume.module.scss";

interface Props {
  channel: Channel | null;
  setVolume: (volume: number) => void;
}

export const VolumeSlider = ({ channel, setVolume }: Props) => {
  const [vol, setVol] = React.useState(0);

  React.useEffect(() => {
    const vol = getLocalVolume();
    setVol(vol);
    setVolume(vol / 100);
  }, [setVolume]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.valueAsNumber;
    const newVol = value / 100;

    setVol(value);
    setLocalVolume(value);
    setVolume(newVol);
  }

  return (
    <>
      {channel?.color ? (
        <style jsx>
          {`
            ::-webkit-slider-thumb {
              background: ${channel?.color?.background} !important;
            }
            ::-moz-range-thumb {
              background: ${channel?.color?.background} !important;
            }
          `}
        </style>
      ) : null}
      <input
        disabled={!channel}
        title={`Volume: ${vol}%`}
        type="range"
        value={vol}
        onChange={onChange}
        className={styles.volumeSlider}
      />
    </>
  );
};
