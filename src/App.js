import React, { useState } from 'react'
import './App.css';

function App() {

  const [questionData, setQuestionData] = useState([
    {
      id: 1,
      question: "Have you been diangnosed with this problem?",
      option: ["Not relevent", "Yes", "No",],
      type: true,
      value: ""
    },
    {
      id: 2,
      question: "Did the Problem Start after a physical trauma?",
      option: ["Not relevent", "Yes", "No",],
      type: true,
      value: ""
    },
    {
      id: 3,
      question: "Did the problem start after a mental trauma?",
      option: ["Not relevent", "Yes", "No",],
      type: true,
      value: ""
    },
    {
      id: 4,
      question: "How often do you experience the problem?",
      option: ["Not relevent", "Daily", "Several times/week", "A few times/month", "A few times/year"],
      type: true,
      value: ""
    },
    {
      id: 5,
      question: "When do you experience the problem?",
      option: ["Not relevent", "When lying down", "When sitting", "Under standing", "in walking"],
      type: false,
      value: []
    },
    {
      id: 6,
      question: "How intense is the experience of the problem on average on a 0-10 scale?",
      option: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      type: true,
      value: ""
    }
  ])

  const [type, setType] = useState(1)
  const [title, setTitle] = useState("")

  const handleChange = (e, id, value, name) => {
    let temp = [...questionData];
    if (name === "radio") {
      temp[id - 1].value = value
    }
    else if (name === "check") {
      if (temp[id - 1].value.includes(value)) {
        let tempData = temp[id - 1].value.filter((el) => el !== value && el)
        temp[id - 1].value = tempData
      } else {
        temp[id - 1].value.push(value)
      }
    }
    setQuestionData(temp)
  }


  const handle = (name) => {
    if (name === "next") {
      setType(2)
    } else if (name === "back") {
      setType(1)
    } else if (name === "clear") {
      setQuestionData(questionData.map((el) => el.type === true ? { ...el, value: "" } : { ...el, value: [] }))
      setTitle("")
    }
  }

  const plus = () => {
    let temp = [...questionData]
    temp.push(
      {
        id: questionData.length + 1,
        question: "Have you been diangnosed with this problem?",
        option: ["Not relevent", "Yes", "No",],
        type: true,
        value: ""
      },
      {
        id: questionData.length + 2,
        question: "Did the Problem Start after a physical trauma?",
        option: ["Not relevent", "Yes", "No",],
        type: true,
        value: ""
      },
      {
        id: questionData.length + 3,
        question: "Did the problem start after a mental trauma?",
        option: ["Not relevent", "Yes", "No",],
        type: true,
        value: ""
      },
      {
        id: questionData.length + 4,
        question: "How often do you experience the problem?",
        option: ["Not relevent", "Daily", "Several times/week", "A few times/month", "A few times/year"],
        type: true,
        value: ""
      },
      {
        id: questionData.length + 5,
        question: "When do you experience the problem?",
        option: ["Not relevent", "When lying down", "When sitting", "Under standing", "in walking"],
        type: false,
        value: []
      },
      {
        id: questionData.length + 6,
        question: "How intense is the experience of the problem on average on a 0-10 scale?",
        option: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        type: true,
        value: ""
      }
    )
    setQuestionData(temp)
  }

  return (
    <div className='container'>
      <div className='App'>
        <h1 style={{ color: 'rgb(11, 146, 236)' }}>Pain & Functional Description</h1>
        <p>The description of the current sitiation gives your Optimum</p>
        <p>Trainer a picture of and clues to the underlying causes of your problem</p>
        <div>
          <p>If you have problems with pain/aches, stiffness, weakness or functional problems, describe <br />this/these below. (List the symptoms in descending order with the most troublesome first)</p>
          <textarea onChange={(e) => setTitle(e.target.value)} value={title} disabled={type === 2} style={{ width: "57%" }}></textarea>
        </div>
      </div>
      {type === 1 &&
        questionData.map((val, i) =>
          <div className={val.type && `d-flex flex-wrap`} key={i} >
            <div>
              <p className="mt-3"><span className="me-2">{val.id} - </span>{val.question}</p>
            </div>
            <div className={val.type && `d-flex flex-wrap`} >
              {
                val.type ?
                  (val.option.map((value, index) => {
                    return (
                      <div className="mx-4 ans" key={index}>
                        <input type="radio" className="me-2" checked={val.value === value ? true : false} name={val.id} value={value} onChange={(e) => handleChange(e, val.id, value, "radio")} />
                        <p className="m-0">
                          {value}
                        </p>
                      </div>
                    )
                  }))
                  :
                  (val.option.map((value, index) => {
                    return (
                      <div className=''>
                        <div className=" mx-4 d-flex" key={index}>
                          <input type="checkbox" className="me-2" checked={val.value.includes(value) ? true : false} name={value} value={value} onChange={(e) => handleChange(e, val.id, value, "check")} />
                          <p className=" m-0">
                            {value}
                          </p>
                        </div>
                      </div>
                    )
                  }))
              }
            </div>
          </div>)
      }
      {
        type === 2 &&
        <table className="table mt-2">
          <thead className="thead">
            <tr>
              <th scope="col">Qno</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
            </tr>
          </thead>
          <tbody>
            {questionData.map((ele, i) => {
              if ((typeof ele.value === "string" && ele.value) || (typeof ele.value === "object" && ele.value.length > 0)) {
                return <tr key={i} >
                  <th scope="row">{i + 1}</th>
                  <td>{ele.question}</td>
                  <td>{ele.value.length > 0 ? ele.value.toString(",").replace(',', ', ') : ele.value}</td>
                </tr>
              }
            }
            )}
          </tbody>
        </table >
      }
      <div className='menu_btn mt-5 mb-3'>
        {type === 1 &&
          <div className="plus mb-2">
            <span className="me-2"></span>
            <button className="rounded-circle" onClick={() => plus()}> + </button>
            {/* <p className="plus_icon m-0" onClick={() => plus()}><i className="fa-solid fa-plus" ></i></p> */}
            <span className="ms-1"></span>
          </div>}
        {type === 2 && <button className='px-5' style={{ marginBottom: "40px", marginTop: "10px" }} onClick={() => handle("back")}>Back</button>}
        <div className='d-flex'>
          {type === 1 && <button className='px-5' style={{ marginBottom: "40px", marginTop: "20px" }} onClick={() => handle("clear")}>Clear</button>}
          {type === 1 && <button className='px-5 ms-3' style={{ marginBottom: "40px", marginTop: "20px" }} onClick={() => handle("next")}>Next</button>}
        </div>
      </div>
    </div >
  );
}

export default App;