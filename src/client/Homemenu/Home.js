import * as React from "react"
import "./Home.css"

class Home extends React.Component {
  render() {
    let study
    return (
      <div className="homeContents">
        <br />
        <h1>강의를 텍스트로 변환하여 언제든지 복습하세요!</h1>
        <h1>
          <p>
            강의를 들었을 때, 한 학생을 보았습니다. 이 학생은 강의를 듣는 것이
            어려웠습니다.
          </p>
          <p>
            강의 내용을 그와 공유하기로 결심했지만 학생에게 강의 내용을 이해하는
            것만으로는 충분하지 않았습니다.
          </p>{" "}
          <p>
            그래서 강의 공유 플랫폼을 만들었습니다. 이 프로젝트의 이름은
            'Athena'입니다.
          </p>
          <p>
            아테나는 지혜의 그리스 신입니다. 이 프로젝트의 비전은 세계의 모든
            지식을 공유하는 플랫폼으로 성장하는 것입니다.
          </p>
        </h1>
        <div>
          <img src={require("../../ATHENA_MAIN_GRAY.gif")} />
        </div>
      </div>
    )
  }
}

export default Home
