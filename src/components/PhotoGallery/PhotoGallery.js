import React from "react";
import { Motion, spring } from "react-motion";
import "./PhotoGallery.css";
import PhotoItem from "../../img/PhotoGallery/PhotoItem";

const springSettings = { stiffness: 170, damping: 26 }; // 스프링 세팅
const NEXT = "show-next";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhotos: [
        [window.innerWidth, window.innerHeight],
        [window.innerWidth, window.innerHeight],
        [window.innerWidth, window.innerHeight],
        [window.innerWidth, window.innerHeight]
      ],
      subPhotos: [[200, 100], [200, 100], [200, 100], [200, 100]],
      currPhoto: 0
    };
  }

  componentDidMount() {
    console.log("ㅔㅎ헤ㅔㅔ");
  }
  // 사진 전환 애니메이션
  handleChange = ({ target: { value } }) => {
    this.setState({ currPhoto: value });
  };

  handleClick = value => {
    this.setState({ currPhoto: value });
  };

  clickHandler = btn => {
    let photoIndex =
      btn === NEXT ? this.state.currPhoto + 1 : this.state.currPhoto - 1;

    photoIndex = photoIndex >= 0 ? photoIndex : PhotoItem.length - 1; // this.props.mainPhotos => PhotoItem
    photoIndex = photoIndex >= PhotoItem.length ? 0 : photoIndex; // this.props.mainPhotos => PhotoItem

    this.setState({
      currPhoto: photoIndex
    });
  };

  render() {
    console.log("innerWidth : ", window.innerWidth);
    console.log("screenX : ", window.screenX);
    console.log("scrollX : ", window.scrollX);
    const { mainPhotos, subPhotos, currPhoto } = this.state;
    const [mainCurrWidths, mainCurrHeight] = mainPhotos[currPhoto];
    const [subCurrWidths, subCurrHeight] = subPhotos[currPhoto];

    console.log(mainCurrHeight);
    // 각 사진 크기 정함
    const mainWidths = mainPhotos.map(
      ([origW, origH]) => (mainCurrHeight / origH) * origW
    );

    const subWidths = subPhotos.map(
      ([origW, origH]) => (subCurrHeight / origH) * origW
    );

    // reduce() 메서드는 배열의 각 요소에 대해 주어진
    // 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

    const mainLeftStartCoords = mainWidths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0);

    const subLeftStartCoords = subWidths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0);

    // mainConfigs 배열 안에 이미지 값이 들어감.
    let mainConfigs = [];
    mainPhotos.reduce((prevLeft, [origW, origH], i) => {
      mainConfigs.push({
        left: spring(prevLeft, springSettings),
        height: spring(mainCurrHeight, springSettings),
        width: spring(mainWidths[i], springSettings)
      });
      return prevLeft + mainWidths[i];
    }, mainLeftStartCoords);

    let subConfigs = [];
    subPhotos.reduce((prevLeft, [origW, origH], i) => {
      subConfigs.push({
        left: spring(prevLeft, springSettings),
        height: spring(subCurrHeight, springSettings),
        width: spring(subWidths[i], springSettings)
      });
      return prevLeft + subWidths[i];
    }, subLeftStartCoords);

    console.log(mainLeftStartCoords);
    console.log(mainConfigs);

    return (
      <div>
        {/* 서브 갤러리 */}
        <div>
          {mainConfigs.map((style, i) => (
            <div key={i} onClick={e => this.handleClick(i)}>
              {i}
            </div>
          ))}
        </div>
        <div className="subPhotos">
          <Motion
            style={{
              height: spring(subCurrHeight),
              width: spring(subCurrWidths)
            }}
          >
            {container => (
              <div className="subPhotos__inner" style={container}>
                {subConfigs.map((style, i) => (
                  <Motion key={i} style={style}>
                    {style => (
                      <img
                        className="subPhotos__photo"
                        src={PhotoItem[i].image}
                        style={style}
                        alt={`sub_${i}`}
                        onClick={e => this.handleClick(i)}
                      />
                    )}
                  </Motion>
                ))}
              </div>
            )}
          </Motion>
        </div>
        {/* 사진 이동 시키기 */}
        <div>Scroll Me</div>
        <button onClick={this.clickHandler.bind(null, "")}>Previous</button>
        <input
          type="range"
          min={0}
          max={PhotoItem.length - 1}
          value={currPhoto}
          onChange={this.handleChange}
        />
        <button onClick={this.clickHandler.bind(null, NEXT)}>Next</button>
        {/* 메인 갤러리 */}
        <div className="demo4">
          <Motion
            style={{
              height: spring(mainCurrHeight),
              width: spring(mainCurrWidths)
            }}
          >
            {container => (
              <div className="demo4-inner" style={container}>
                {mainConfigs.map((style, i) => (
                  <Motion key={i} style={style}>
                    {style => (
                      <img
                        className="demo4-photo"
                        src={PhotoItem[i].image}
                        style={style}
                        alt={`main_${i}`}
                      />
                    )}
                  </Motion>
                ))}
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}
