import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRef, useState  } from 'react';
import useLocalStorage from 'react-localstorage-hook';
import Data from './cs-2019.json';
import GPATable from './GPATable';

function App() {

  const yearRef = useRef();
  const termRef = useRef();
  const subRef = useRef();
  const gradeRef = useRef();

  
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  
  var subData = []

  
  var x = []
  const subjects = Data.curriculum.subjects.map((v, i) => {
    x = [] 
    
    v.subjects.forEach((e, j) => {
      
      x.push(<option key={j} value={e.name}>{e.code} {e.name}</option>)
      
      subData.push([e.name, e.code, e.credits])
    })
    
    return x
  })

  
  const addItem = () => {

    
    var itemObj = {
      year: yearRef.current.value,
      term: termRef.current.value,
      sub: subRef.current.value,
      grade: gradeRef.current.value
    }

    
    console.log('before', dataItems)
    dataItems.push(itemObj)
    
    setDataItems([...dataItems])
    console.log('after', dataItems)
  }

  return (
    <Container>

      <Row>
        <Col xs={5} style={{backgroundColor: '#1EBBD7'}}>
          <br/><h2>GPA Calculator</h2><br/>
          <Form>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formTerm">
                <Form.Label>Term</Form.Label>
                <Form.Select aria-label="Select Term" ref={termRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
                
              </Form.Group>    
              <Form.Group as={Col} className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Select aria-label="Select Year" ref={yearRef}>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Form.Select>
              </Form.Group> 
            </Row>  

            <Form.Group as={Col} className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Select aria-label="Select Subjects" ref={subRef}>
                {subjects}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Select aria-label="Select Grade" ref={gradeRef}>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="-">W, I, S, U, R, TR</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" onClick={addItem}>
              Calculate
            </Button>

          </Form>
        </Col>

        <Col>
          <GPATable data={dataItems} setDataItems={setDataItems} subData={subData}/>
        </Col>

      </Row>

    </Container>
  );
}

export default App;
