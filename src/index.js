import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

//Audio clips:
const audioClips1 = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const audioClips2 = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

//Pad component
const Pad = ({ keyTrigger, url, id, volume, keyCode }) => {
  const activatePad = () => {
    const element = document.getElementById(id);
    element.classList.add("active");

    setTimeout(function () {
      element.classList.remove("active");
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      playSound();
      activatePad();
    }
  };
  document.addEventListener("keydown", handleKeyPress);

  const playSound = () => {
    const sound = document.getElementById(keyTrigger);
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  };

  const showOnDisplay = () => {
    const display = document.getElementById("display");
    display.innerText = id;
  };

  return (
    <div
      className="drum-pad"
      id={id}
      onClick={(e) => {
        playSound();
        showOnDisplay();
        activatePad();
      }}
    >
      <audio id={keyTrigger} className="clip" src={url} type="audio/mp3" />
      {keyTrigger}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPowerOn: true,
      currentAudioClip: audioClips1,
      volume: 0.7
    };
  }

  checkSwitch = () => {
    const display = document.getElementById("display");
    const modeCheckbox = document.getElementById("modeCheckbox");
    if (modeCheckbox.checked) {
      this.setState({ currentAudioClip: audioClips2 });
      display.innerText = "Smooth Piano Kit";
    } else {
      this.setState({ currentAudioClip: audioClips1 });
      display.innerText = "Heater Kit";
    }
  };

  render() {
    return (
      <div className="app" id="drum-machine">
        <div className="pads-container">
          {this.state.currentAudioClip.map((clip) => (
            <Pad
              key={clip.id}
              url={clip.url}
              keyTrigger={clip.keyTrigger}
              id={clip.id}
              volume={this.state.volume}
              keyCode={clip.keyCode}
            />
          ))}
        </div>

        <div className="setting">
          <div className="volume-container">
            <p>Volume</p>
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="0.01"
              value={this.state.volume}
              onChange={(e) => {
                this.setState({ volume: e.target.value });
                document.getElementById("display").innerText =
                  "Volume " + Math.floor(this.state.volume * 100);
              }}
            />
          </div>

          <div id="display"></div>

          <div className="switch-container">
            <p>Mode</p>
            <label className="switch">
              <input
                id="modeCheckbox"
                type="checkbox"
                onClick={this.checkSwitch}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div id="speaker" className="speaker">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
