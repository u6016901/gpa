import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaBan } from 'react-icons/fa';


      var termGPA1 = []
      var termGPA2 = []
      var termGPA3 = []

function GPATable({ data, setDataItems, subData }) {

    const [dataRows, setDataRows] = useState();
    const [totalGPA, setTotalGPA] = useState(0);

    const styles = {
      textCenter: {textAlign: 'center'},
      textRight: {textAlign: 'right'},
      textLeft: {textAlign: 'left'}
    }

    useEffect(() => {
      let credit = 0
      let gpa = 0
      let currrentGrade = 0
      let totalCredit = 0
      

      const z = data.map((v, i) => {

        
        if (v.grade === "A") {
          currrentGrade = "4.00"
        } else if (v.grade === "A-") {
          currrentGrade = "3.75"
        } else if (v.grade === "B+") {
          currrentGrade = "3.25"
        } else if (v.grade === "B") {
          currrentGrade = "3.00"
        } else if (v.grade === "B-") {
          currrentGrade = "2.75"
        } else if (v.grade === "C+") {
          currrentGrade = "2.25"
        } else if (v.grade === "C") {
          currrentGrade = "2.00"
        } else if (v.grade === "C-") {
          currrentGrade = "1.75"
        } else if (v.grade === "D") {
          currrentGrade = "1.00"
        } else if (v.grade === "F") {
          currrentGrade = "0.00"
        } else if (v.grade === "-") {
          currrentGrade = "0.00"
        }

        
        subData.forEach((e) => {
          
          if (v.grade !== "-" && e[0] === v.sub) {
            credit = e[2]
            totalCredit += Number(credit)
          }
        })

        
        gpa += Number(currrentGrade) * Number(credit) 
        

        let sem = "" + v.term + "/" + v.year
        let existInArr = termGPA1.indexOf(sem) > -1
        let semChanged = false
        if (existInArr === false) {
          termGPA1.push(sem)
          semChanged = true
        }
        

        
        if (semChanged === true) {
          termGPA2.push([sem, 0, 0, 0, 0]) 
          termGPA3.push([sem, 0]) 
        }

        
        let currentGPA = 0
        termGPA2.forEach((s) => {
          if (s[0] === sem) {
            s[1] += Number(currrentGrade) 
            s[2] += Number(credit) 
            s[3] += Number(currrentGrade) * Number(credit)
            s[4] = s[3] / s[2] 
            currentGPA = s[4]
          }
          
        })
        

        termGPA3.forEach((sg) => {
          if (sg[0] === sem) {
            sg[1] = currentGPA
          }
        })
        
        
        return (
          <tr key={i}>
            <td><FaBan onClick={() => deleteClick(i)}/></td>
            <td style={styles.textCenter}>{v.sub}</td>
            <td style={styles.textCenter}>{v.term}{"/"}{v.year}</td>
            <td style={styles.textCenter}>{v.grade}</td>
          </tr>
        );
      });
    console.log("sum gpa, credits:", gpa, totalCredit)
    setDataRows(z);
    setTotalGPA(gpa / totalCredit)
    }, [data]);

    
    const clearData = () => {
      setDataItems([])
      setDataRows([])
      console.log('cleared items')
    }

    
    const deleteClick = (i) => {
      console.log(i, 'deleted!')
      data.splice(i,1)
      setDataItems([...data])
    }

    return (
      <Container>

        <Row>

          <Col>
            <h2>Kasidit's GPA</h2>
          </Col>

          <Col>
            <Button onClick={clearData} variant="dark">Clear</Button>
          </Col>

        </Row>

        <Table striped bordered hover>

          <thead>
            <tr>
              <th></th>
              <th>Subject</th>
              <th>Term</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {dataRows}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={2}></th>
              <th style={styles.textRight}>GPA</th>
              <th style={styles.textRight}>{(totalGPA).toFixed(2)}</th>
            </tr>
          </tfoot>

        </Table>

       

        </Container>
    )
}

export default GPATable;